"use client";

import { locales, type AppLocale } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function replaceLocaleInPath(pathname: string, nextLocale: AppLocale) {
  // Expected: /{locale}/...
  const parts = pathname.split("/");
  // ["", "en", "cancel", "vodafone"]
  if (parts.length >= 2 && (locales as readonly string[]).includes(parts[1] ?? "")) {
    parts[1] = nextLocale;
    return parts.join("/") || `/${nextLocale}`;
  }
  // Fallback: if somehow no locale prefix
  return `/${nextLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}

export default function LocaleSwitcher({ currentLocale }: { currentLocale: AppLocale }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("app");

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="text-[#475569]">{t("language")}</span>
      <select
        className="h-9 rounded-lg border border-[#DCE6FF] bg-white px-2 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
        value={currentLocale}
        onChange={(e) => {
          const nextLocale = e.target.value as AppLocale;
          const nextPath = replaceLocaleInPath(pathname, nextLocale);
          const qs = searchParams.toString();
          router.push(qs ? `${nextPath}?${qs}` : nextPath);
        }}
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}

