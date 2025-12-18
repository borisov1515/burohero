import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHome = await getTranslations("home");

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 text-[#0F172A]">
      <h1 className="text-2xl font-semibold tracking-tight">{tHome("legal.termsTitle")}</h1>
      <p className="mt-4 text-sm leading-7 text-[#475569]">
        {tHome("legal.termsBody")}
      </p>
    </main>
  );
}

