import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import { locales, type AppLocale } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function isLocale(value: string): value is AppLocale {
  return (locales as readonly string[]).includes(value);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: AppLocale = isLocale(locale) ? locale : locales[0];

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen bg-white text-[#0F172A]">
        <header className="sticky top-0 z-10 border-b border-[#DCE6FF] bg-white/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3">
            <div className="text-sm font-semibold tracking-tight">BuroHero</div>
            <LocaleSwitcher currentLocale={safeLocale} />
          </div>
        </header>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}

