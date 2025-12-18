import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHome = await getTranslations("home");

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">BuroHero</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {tHome("tagline")}
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-medium">{tHome("linksTitle")}</h2>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/cancel/vodafone`}
          >
            {tHome("links.cancelVodafone")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/fianza/landlord`}
          >
            {tHome("links.depositReturn")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/devolucion/merchant`}
          >
            {tHome("links.return14")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/reparacion/landlord`}
          >
            {tHome("links.repair")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/rescision/landlord`}
          >
            {tHome("links.leaseTermination")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/factura/endesa`}
          >
            {tHome("links.billComplaint")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/garantia/zara`}
          >
            {tHome("links.warranty")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/noentrega/amazon`}
          >
            {tHome("links.nonDelivery")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/vuelo/ryanair`}
          >
            {tHome("links.flightDelay")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/seguro/mapfre`}
          >
            {tHome("links.insuranceCancel")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/denegacion/allianz`}
          >
            {tHome("links.claimDenied")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/comisiones/bbva`}
          >
            {tHome("links.feesRefund")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/trafico/multa`}
          >
            {tHome("links.trafficFineAppeal")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/trafico/venta`}
          >
            {tHome("links.carSaleNotification")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/trabajo/salarios`}
          >
            {tHome("links.unpaidWages")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/trabajo/baja`}
          >
            {tHome("links.voluntaryResignation")}
          </Link>
          <Link
            className="underline underline-offset-4"
            href={`/${locale}/trabajo/vacaciones`}
          >
            {tHome("links.vacationRequest")}
          </Link>
        </div>
      </section>
    </main>
  );
}

