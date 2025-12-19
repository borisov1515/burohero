import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { getPseoPaths, getEntityNameBySlug } from "@/lib/pseo";
import { getUseCaseCardKey, parsePseoCompany } from "@/lib/pseoSlug";

function groupKey(category: string, company: string) {
  if (category === "trafico" || category === "trabajo") {
    const parsed = parsePseoCompany({ category, company });
    const v = parsed.variant ?? company;
    return `${category}:${v}`;
  }
  return category;
}

function labelForPath(input: {
  tHome: (k: string) => string;
  category: string;
  company: string;
}) {
  const parsed = parsePseoCompany({ category: input.category, company: input.company });
  const cardKey = getUseCaseCardKey({ category: input.category, variant: parsed.variant });
  const title = cardKey ? input.tHome(`cards.${cardKey}.title`) : input.category;
  const entitySlug = parsed.entitySlug ?? input.company;
  const entityName = getEntityNameBySlug(entitySlug) ?? entitySlug;
  return `${title} — ${entityName}`;
}

export default async function DirectoryPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPseo = await getTranslations("pseo");
  const tHome = await getTranslations("home");

  const paths = getPseoPaths();
  const groups = new Map<string, { title: string; items: { href: string; label: string }[] }>();

  for (const p of paths) {
    const gk = groupKey(p.category, p.company);
    const parsed = parsePseoCompany({ category: p.category, company: p.company });
    const cardKey = getUseCaseCardKey({ category: p.category, variant: parsed.variant });
    const groupTitle = cardKey ? tHome(`cards.${cardKey}.title`) : p.category;

    const label = labelForPath({ tHome, category: p.category, company: p.company });
    const href = `/${locale}/${p.category}/${p.company}`;

    const existing = groups.get(gk);
    if (existing) {
      existing.items.push({ href, label });
    } else {
      groups.set(gk, { title: groupTitle, items: [{ href, label }] });
    }
  }

  const ordered = Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 text-[#0F172A]">
      <h1 className="text-3xl font-semibold tracking-tight">{tPseo("directory.title")}</h1>
      <p className="mt-3 text-sm leading-7 text-[#475569]">{tPseo("directory.intro")}</p>

      <div className="mt-10 grid gap-10">
        {ordered.map(([key, group]) => (
          <section key={key} className="grid gap-3">
            <h2 className="text-lg font-semibold">{group.title}</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="rounded-xl border border-[#DCE6FF] bg-white px-4 py-3 text-sm text-[#1D4ED8] hover:border-[#BFD2FF] hover:text-[#1E40AF]"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

