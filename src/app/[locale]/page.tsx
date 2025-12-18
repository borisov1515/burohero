import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { Home, Wifi, ShoppingBag, Plane, Car, Briefcase, ArrowRight } from "lucide-react";
import { createCatalog } from "@/lib/catalog";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHome = await getTranslations("home");

  const languageName = (() => {
    const DisplayNames = (Intl as any)?.DisplayNames as
      | (new (locales: string[], options: { type: string }) => { of: (code: string) => string | undefined })
      | undefined;
    if (typeof DisplayNames === "function") {
      const name = new DisplayNames([locale], { type: "language" }).of(locale);
      if (name) return name;
    }
    return locale.toUpperCase();
  })();

  const categories = createCatalog({
    icons: {
      housing: Home,
      services: Wifi,
      shopping: ShoppingBag,
      travel: Plane,
      traffic: Car,
      work: Briefcase,
    },
  });

  return (
    <main className="bg-white text-[#0F172A]">
      {/* Hero */}
      <section className="border-b border-[#DCE6FF] bg-[#F5F8FF]">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DCE6FF] bg-white px-3 py-1 text-xs text-[#475569]">
              <span className="font-medium">BuroHero</span>
              <span className="text-[#94A3B8]">•</span>
              <span>{tHome("hero.badge")}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {tHome("hero.title", { language: languageName })}
            </h1>
            <p className="text-base leading-7 text-[#475569]">
              {tHome("hero.subtitle")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/${locale}/${categories[0]?.items?.[0]?.slug ?? "cancel/vodafone"}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-5 text-sm font-medium text-white hover:bg-[#1E40AF]"
              >
                {tHome("hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#catalog"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#DCE6FF] bg-white px-5 text-sm font-medium text-[#0F172A] hover:border-[#BFD2FF]"
              >
                {tHome("hero.ctaSecondary")}
              </a>
            </div>
          </div>

          {/* Visual mock: split view */}
          <div className="relative">
            <div className="rounded-2xl border border-[#DCE6FF] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#DCE6FF] px-4 py-3 text-sm">
                <div className="font-medium">{tHome("hero.mockTitle")}</div>
                <div className="text-xs text-[#475569]">{tHome("hero.mockSubtitle")}</div>
              </div>
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="border-b border-[#DCE6FF] p-4 text-sm leading-6 text-[#475569] lg:border-b-0 lg:border-r">
                  <div className="mb-2 text-xs font-medium text-[#64748B]">
                    {tHome("hero.mockLeftTitle")}
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-11/12 rounded bg-[#EEF3FF]" />
                    <div className="h-3 w-10/12 rounded bg-[#EEF3FF]" />
                    <div className="h-3 w-9/12 rounded bg-[#EEF3FF]" />
                    <div className="h-3 w-8/12 rounded bg-[#EEF3FF]" />
                    <div className="mt-4 h-3 w-10/12 rounded bg-[#EEF3FF]" />
                    <div className="h-3 w-11/12 rounded bg-[#EEF3FF]" />
                    <div className="h-3 w-9/12 rounded bg-[#EEF3FF]" />
                  </div>
                </div>
                <div className="p-4 text-sm leading-6 text-[#475569]">
                  <div className="mb-2 text-xs font-medium text-[#64748B]">
                    {tHome("hero.mockRightTitle", { language: languageName })}
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-10/12 rounded bg-[#EEF3FF]" />
                    <div className="h-3 w-11/12 rounded bg-[#EEF3FF]" />
                    <div className="h-3 w-9/12 rounded bg-[#EEF3FF]" />
                    <div className="h-3 w-8/12 rounded bg-[#EEF3FF]" />
                    <div className="mt-4 h-3 w-11/12 rounded bg-[#EEF3FF]" />
                    <div className="h-3 w-9/12 rounded bg-[#EEF3FF]" />
                    <div className="h-3 w-10/12 rounded bg-[#EEF3FF]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-6 -right-6 hidden h-24 w-24 rounded-3xl bg-[#1D4ED8]/10 blur-2xl lg:block" />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto w-full max-w-6xl px-6 py-14">
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="text-xl font-semibold tracking-tight">{tHome("steps.title")}</h2>
          <p className="text-sm text-[#475569]">{tHome("steps.subtitle")}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#DCE6FF] bg-white p-6 shadow-sm">
            <div className="text-xs font-medium text-[#64748B]">{tHome("steps.step1Label")}</div>
            <div className="mt-2 text-sm font-medium">{tHome("steps.step1Title")}</div>
            <div className="mt-2 text-sm text-[#475569]">{tHome("steps.step1Desc")}</div>
          </div>
          <div className="rounded-2xl border border-[#DCE6FF] bg-white p-6 shadow-sm">
            <div className="text-xs font-medium text-[#64748B]">{tHome("steps.step2Label")}</div>
            <div className="mt-2 text-sm font-medium">
              {tHome("steps.step2Title", { language: languageName })}
            </div>
            <div className="mt-2 text-sm text-[#475569]">{tHome("steps.step2Desc")}</div>
          </div>
          <div className="rounded-2xl border border-[#DCE6FF] bg-white p-6 shadow-sm">
            <div className="text-xs font-medium text-[#64748B]">{tHome("steps.step3Label")}</div>
            <div className="mt-2 text-sm font-medium">{tHome("steps.step3Title")}</div>
            <div className="mt-2 text-sm text-[#475569]">{tHome("steps.step3Desc")}</div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="border-t border-[#DCE6FF] bg-[#F5F8FF]">
        <div className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="mb-8 flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight">{tHome("catalog.title")}</h2>
            <p className="text-sm text-[#475569]">{tHome("catalog.subtitle")}</p>
          </div>

          <div className="grid gap-10">
            {categories.map((cat) => (
              <div key={cat.id} className="grid gap-4">
                <div className="flex items-center gap-3">
                  <cat.icon className="h-5 w-5 text-[#1D4ED8]" />
                  <h3 className="text-base font-semibold">{tHome(cat.titleKey)}</h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${locale}/${item.slug}`}
                      className="group rounded-2xl border border-[#DCE6FF] bg-white p-5 shadow-sm transition-all hover:border-[#BFD2FF]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-semibold">{tHome(item.titleKey)}</div>
                        <ArrowRight className="mt-0.5 h-4 w-4 text-[#94A3B8] transition-transform group-hover:translate-x-0.5 group-hover:text-[#1D4ED8]" />
                      </div>
                      <div className="mt-2 text-sm text-[#475569]">
                        {tHome(item.descKey)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + Footer */}
      <footer className="border-t border-[#DCE6FF] bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
          <div className="rounded-2xl border border-[#DCE6FF] bg-[#F5F8FF] p-5 text-sm text-[#475569]">
            {tHome("footer.disclaimer")}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-[#64748B]">
              © {new Date().getFullYear()} BuroHero
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link
                className="underline underline-offset-4 text-[#1D4ED8] hover:text-[#1E40AF]"
                href={`/${locale}/privacy`}
              >
                {tHome("footer.privacy")}
              </Link>
              <Link
                className="underline underline-offset-4 text-[#1D4ED8] hover:text-[#1E40AF]"
                href={`/${locale}/terms`}
              >
                {tHome("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

