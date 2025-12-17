"use client";

import { jsPDF } from "jspdf";
import { useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  orderId: string;
  isPaid: boolean;
  spanishText: string;
  translationText: string;
};

let notoFontLoaded = false;
let notoFontLoadError: string | null = null;

async function loadNotoSansIfAvailable(doc: jsPDF) {
  if (notoFontLoaded || notoFontLoadError) return;

  try {
    const res = await fetch("/fonts/NotoSans-Regular.ttf");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);

    // Convert ArrayBuffer → base64
    let binary = "";
    for (let i = 0; i < bytes.length; i += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    }
    const base64 = btoa(binary);

    doc.addFileToVFS("NotoSans-Regular.ttf", base64);
    doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal");
    notoFontLoaded = true;
  } catch (e) {
    notoFontLoadError =
      e instanceof Error ? e.message : "Failed to load font";
  }
}

function addWrappedText(doc: jsPDF, text: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 48;
  const maxWidth = pageWidth - margin * 2;
  const lineHeight = 16;

  const lines = doc.splitTextToSize(text, maxWidth);

  let y = margin;
  for (const line of lines) {
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  }
}

function safeFileName(name: string) {
  return name.replace(/[^a-z0-9._-]+/gi, "_");
}

export default function CheckoutDownloads({
  orderId,
  isPaid,
  spanishText,
  translationText,
}: Props) {
  const [isWorking, setIsWorking] = useState(false);
  const t = useTranslations("checkout");

  const missingFontHint = notoFontLoaded ? null : t("fontHint");

  async function downloadPdf(opts: {
    filename: string;
    title: string;
    body: string;
    preferNoto: boolean;
  }) {
    setIsWorking(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      doc.setFont("times", "normal");

      if (opts.preferNoto) {
        await loadNotoSansIfAvailable(doc);
        if (notoFontLoaded) {
          doc.setFont("NotoSans", "normal");
        }
      }

      doc.setFontSize(14);
      doc.text(opts.title, 48, 48);

      doc.setFontSize(11);
      addWrappedText(doc, opts.body);

      doc.save(safeFileName(opts.filename));
    } finally {
      setIsWorking(false);
    }
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-lg font-medium">{t("downloadsTitle")}</h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {t("orderLabel")} <span className="font-mono">{orderId}</span>
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-50 dark:text-black"
          disabled={!isPaid || isWorking}
          onClick={() =>
            downloadPdf({
              filename: `Legal_${orderId}.pdf`,
              title: "Documento Legal (ES)",
              body: spanishText || "",
              preferNoto: false,
            })
          }
        >
          {t("downloadSpanish")}
        </button>

        <button
          className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 px-5 text-sm font-medium disabled:opacity-50 dark:border-zinc-800"
          disabled={!translationText || isWorking}
          onClick={() =>
            downloadPdf({
              filename: `Translation_${orderId}.pdf`,
              title: "Courtesy Translation",
              body: translationText || "",
              preferNoto: true,
            })
          }
        >
          {t("downloadTranslation")}
        </button>
      </div>

      {!isPaid ? (
        <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          {t("spanishPdfLocked")}
        </div>
      ) : null}

      {missingFontHint ? (
        <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          {missingFontHint}
        </div>
      ) : null}

      {notoFontLoadError ? (
        <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          {t("fontLoad")}: {notoFontLoadError}
        </div>
      ) : null}
    </section>
  );
}

