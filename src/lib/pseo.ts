import pseoData from "@/data/pseo.json";
import { trafficVariants, workVariants } from "@/lib/pseoSlug";

export type PseoPath = { category: string; company: string };

type NamedEntity = { slug: string; name: string; category?: string };

function findBySlug(arr: NamedEntity[], slug: string) {
  return arr.find((x) => x.slug === slug) ?? null;
}

export function getEntityNameBySlug(slug: string): string | null {
  return (
    findBySlug(pseoData.companies as any, slug)?.name ??
    findBySlug(pseoData.retailers as any, slug)?.name ??
    findBySlug(pseoData.airlines as any, slug)?.name ??
    findBySlug(pseoData.insurers as any, slug)?.name ??
    findBySlug(pseoData.cities as any, slug)?.name ??
    null
  );
}

export function getCityNameBySlug(slug: string): string | null {
  return findBySlug(pseoData.cities as any, slug)?.name ?? null;
}

export function getPseoPaths(): PseoPath[] {
  const paths: PseoPath[] = [];

  const companies = pseoData.companies as any as NamedEntity[];
  const retailers = pseoData.retailers as any as NamedEntity[];
  const airlines = pseoData.airlines as any as NamedEntity[];
  const insurers = pseoData.insurers as any as NamedEntity[];
  const cities = pseoData.cities as any as NamedEntity[];

  // Companies (telco/utilities/banks) — reuse the same pool
  for (const c of companies) {
    paths.push({ category: "cancel", company: c.slug });
    paths.push({ category: "factura", company: c.slug });
    paths.push({ category: "comisiones", company: c.slug });
  }

  // Retailers
  for (const r of retailers) {
    paths.push({ category: "devolucion", company: r.slug });
    paths.push({ category: "garantia", company: r.slug });
    paths.push({ category: "noentrega", company: r.slug });
  }

  // Airlines
  for (const a of airlines) {
    paths.push({ category: "vuelo", company: a.slug });
  }

  // Insurers
  for (const i of insurers) {
    paths.push({ category: "seguro", company: i.slug });
    paths.push({ category: "denegacion", company: i.slug });
  }

  // Cities (housing categories map directly)
  for (const city of cities) {
    paths.push({ category: "fianza", company: city.slug });
    paths.push({ category: "reparacion", company: city.slug });
    paths.push({ category: "rescision", company: city.slug });

    // Traffic / Work compound slugs
    for (const v of trafficVariants) {
      paths.push({ category: "trafico", company: `${v}-${city.slug}` });
    }
    for (const v of workVariants) {
      paths.push({ category: "trabajo", company: `${v}-${city.slug}` });
    }
  }

  return paths;
}

