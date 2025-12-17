import companies from "@/data/companies.json";

export type Company = {
  slug: string;
  name: string;
  cif: string;
  address: string;
};

const companyList = companies as Company[];
const bySlug = new Map(companyList.map((c) => [c.slug, c]));

export function getCompanyBySlug(slug: string): Company | null {
  return bySlug.get(slug) ?? null;
}

