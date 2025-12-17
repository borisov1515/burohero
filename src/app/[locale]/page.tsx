import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">BuroHero</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Generate Spanish legal claims with a parallel translation.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-medium">MVP links</h2>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/cancel/vodafone`}
          >
            Example generator: cancel / vodafone
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/fianza/landlord`}
          >
            Example generator: fianza / landlord (deposit return)
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/devolucion/merchant`}
          >
            Example generator: devolucion / merchant (return within 14 days)
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/reparacion/landlord`}
          >
            Example generator: reparacion / landlord (repair demand)
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/rescision/landlord`}
          >
            Example generator: rescicion / landlord (lease termination)
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/factura/endesa`}
          >
            Example generator: factura / endesa (bill complaint)
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/garantia/zara`}
          >
            Example generator: garantia / zara (3-year warranty)
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/noentrega/amazon`}
          >
            Example generator: noentrega / amazon (undelivered goods)
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/vuelo/ryanair`}
          >
            Example generator: vuelo / ryanair (flight delay)
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/seguro/mapfre`}
          >
            Example generator: seguro / mapfre (insurance cancellation)
          </Link>
        </div>
      </section>
    </main>
  );
}

