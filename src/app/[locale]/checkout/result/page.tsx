import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import CheckoutDownloads from "./CheckoutDownloads";

export const dynamic = "force-dynamic";

export default async function CheckoutResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");

  const { orderId } = await searchParams;

  const isUuid =
    typeof orderId === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId);

  if (!orderId) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          {t("missingOrderId")}
        </p>
        <div className="mt-6">
          <Link className="underline underline-offset-4" href={`/${locale}`}>
            {t("backHome")}
          </Link>
        </div>
      </main>
    );
  }

  if (!isUuid) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          {t("invalidOrderId")}
        </p>
        <div className="mt-6">
          <Link className="underline underline-offset-4" href={`/${locale}`}>
            {t("backHome")}
          </Link>
        </div>
      </main>
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select("id,status,amount,content_snapshot,created_at")
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          {t("orderNotFound")}
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          {t("orderNotFound")}
        </p>
      </main>
    );
  }

  const isPaid = data.status === "paid";
  const statusLabel =
    data.status === "paid"
      ? t("statusValues.paid")
      : data.status === "pending"
        ? t("statusValues.pending")
        : data.status === "failed"
          ? t("statusValues.failed")
          : data.status;
  const snapshot = (data.content_snapshot ?? {}) as any;
  const spanishText = String(snapshot.spanish_legal_text ?? "");
  const translationText = String(snapshot.native_user_translation ?? "");

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("orderLabel")} <span className="font-mono">{data.id}</span> •{" "}
          {t("statusLabel")}:{" "}
          <span className="font-medium">{statusLabel}</span>
        </div>
      </header>

      <CheckoutDownloads
        orderId={data.id}
        isPaid={isPaid}
        spanishText={spanishText}
        translationText={translationText}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-3 text-sm font-medium">{t("spanishDocTitle")}</div>
          <div className="whitespace-pre-wrap text-sm leading-6">
            {isPaid ? spanishText : t("lockedNotPaid")}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-3 text-sm font-medium">{t("translationTitle")}</div>
          <div className="whitespace-pre-wrap text-sm leading-6">
            {translationText}
          </div>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <Link className="underline underline-offset-4" href={`/${locale}`}>
          {t("backHome")}
        </Link>
        {snapshot.category && snapshot.company ? (
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/${snapshot.category}/${snapshot.company}?orderId=${encodeURIComponent(
              data.id,
            )}`}
          >
            {t("backToGenerator")}
          </Link>
        ) : null}
      </div>
    </main>
  );
}

