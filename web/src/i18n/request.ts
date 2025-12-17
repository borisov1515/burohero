import { getRequestConfig } from "next-intl/server";
import { locales, type AppLocale } from "@/i18n/routing";

function isLocale(value: string): value is AppLocale {
  return (locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? "en";
  const safeLocale: AppLocale = isLocale(locale) ? locale : "en";

  return {
    locale: safeLocale,
    messages: (await import(`../../messages/${safeLocale}.json`)).default,
  };
});

