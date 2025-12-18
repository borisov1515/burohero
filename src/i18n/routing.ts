export const locales = [
  "es",
  "en",
  "uk",
  "de",
  "fr",
  "it",
  "nl",
  "sv",
  "pl",
  "ro",
] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

