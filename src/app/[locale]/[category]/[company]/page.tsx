import { setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import GeneratorClient from "./ui";

export default async function GeneratorPage({
  params,
}: {
  params: Promise<{ locale: AppLocale; category: string; company: string }>;
}) {
  const { locale, category, company } = await params;
  setRequestLocale(locale);

  return (
    <GeneratorClient locale={locale} category={category} company={company} />
  );
}

