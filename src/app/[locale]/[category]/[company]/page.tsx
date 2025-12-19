import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import GeneratorClient from "./ui";
import type { Metadata } from "next";
import { locales } from "@/i18n/routing";
import { getPseoPaths, getEntityNameBySlug } from "@/lib/pseo";
import { getUseCaseCardKey, parsePseoCompany } from "@/lib/pseoSlug";

function humanizeSlug(slug: string) {
  return slug
    .split(/[-_]/g)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const paths = getPseoPaths();
  const params: { locale: AppLocale; category: string; company: string }[] = [];
  for (const locale of locales) {
    for (const path of paths) {
      params.push({ locale, ...path });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale; category: string; company: string }>;
}): Promise<Metadata> {
  const { locale, category, company } = await params;
  setRequestLocale(locale);

  const year = new Date().getFullYear();
  const tHome = await getTranslations("home");
  const tPseo = await getTranslations("pseo");

  const parsed = parsePseoCompany({ category, company });
  const cardKey = getUseCaseCardKey({ category, variant: parsed.variant });

  const useCaseTitle = cardKey ? tHome(`cards.${cardKey}.title`) : humanizeSlug(category);
  const useCaseDesc = cardKey ? tHome(`cards.${cardKey}.desc`) : "";

  const entitySlug = parsed.entitySlug ?? company;
  const entityName = getEntityNameBySlug(entitySlug) ?? humanizeSlug(entitySlug);

  const titleSuffix = tPseo("meta.titleSuffix", { year });
  const title = tPseo("meta.titleTemplate", {
    useCase: useCaseTitle,
    entity: entityName,
    year,
    titleSuffix,
  });

  const description = tPseo("meta.descriptionTemplate", {
    useCase: useCaseTitle,
    entity: entityName,
    year,
    useCaseDesc,
  });

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/${category}/${company}`,
    },
  };
}

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

