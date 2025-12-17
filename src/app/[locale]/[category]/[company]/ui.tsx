"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AppLocale } from "@/i18n/routing";

type Props = {
  locale: AppLocale;
  category: string;
  company: string;
};

export default function GeneratorClient({ locale, category, company }: Props) {
  const router = useRouter();
  const [facts, setFacts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [es, setEs] = useState("");
  const [native, setNative] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canGenerate = useMemo(() => facts.trim().length >= 10, [facts]);

  async function onGenerate() {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, category, company, facts }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Generate failed");

      setOrderId(json.orderId);
      setIsPaid(false);
      setEs(json.spanish_legal_text);
      setNative(json.native_user_translation);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  async function onMockPay() {
    if (!orderId) return;
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders/mock-pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Mock pay failed");
      setIsPaid(true);
      router.push(`/${locale}/checkout/result?orderId=${encodeURIComponent(orderId)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-2">
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          {locale} / {category} / {company}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Document generator</h1>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <label className="text-sm font-medium">Your facts (in your language)</label>
        <textarea
          className="mt-2 h-40 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={facts}
          onChange={(e) => setFacts(e.target.value)}
          placeholder="Describe the situation: dates, amounts, contract details, what you want to demand…"
        />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-5 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-50 dark:text-black"
            disabled={!canGenerate || isLoading}
            onClick={onGenerate}
          >
            {isLoading ? "Working…" : "Generate"}
          </button>

          <button
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 px-5 text-sm font-medium disabled:opacity-50 dark:border-zinc-800"
            disabled={!orderId || isLoading}
            onClick={onMockPay}
          >
            Unlock document (mock pay)
          </button>

          {orderId ? (
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Order: <span className="font-mono">{orderId}</span>
            </div>
          ) : null}
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        ) : null}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-3 text-sm font-medium">Spanish legal document (blurred until paid)</div>
          <div
            className={[
              "whitespace-pre-wrap text-sm leading-6",
              !es ? "opacity-60" : "",
              !isPaid && es ? "blur-sm select-none" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {es || "Generate to see preview…"}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-3 text-sm font-medium">Translation (always visible)</div>
          <div className="whitespace-pre-wrap text-sm leading-6">
            {native || "Generate to see translation…"}
          </div>
        </div>
      </section>
    </main>
  );
}

