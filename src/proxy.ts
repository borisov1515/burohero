import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/i18n/routing";

// Next.js 16: `middleware.ts` convention is deprecated in favor of `proxy.ts`.
export const proxy = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

