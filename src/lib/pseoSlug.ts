export const trafficVariants = ["multa", "venta"] as const;
export const workVariants = ["salarios", "baja", "vacaciones"] as const;

export function parsePseoCompany(input: {
  category: string;
  company: string;
}): { variant?: string; entitySlug?: string; citySlug?: string } {
  const { category, company } = input;

  if (category === "trafico") {
    // company is either 'multa'/'venta' (legacy) or 'multa-madrid'
    const [maybeVariant, maybeCity] = company.split("-", 2);
    const variant = trafficVariants.includes(maybeVariant as any) ? maybeVariant : undefined;
    const citySlug = maybeCity || undefined;
    return { variant, citySlug, entitySlug: citySlug };
  }

  if (category === "trabajo") {
    // company is either 'salarios'/'baja'/'vacaciones' (legacy) or 'salarios-madrid'
    const [maybeVariant, maybeCity] = company.split("-", 2);
    const variant = workVariants.includes(maybeVariant as any) ? maybeVariant : undefined;
    const citySlug = maybeCity || undefined;
    return { variant, citySlug, entitySlug: citySlug };
  }

  // Housing city slugs or company-like entities
  return { entitySlug: company };
}

export function getUseCaseCardKey(input: { category: string; variant?: string }): string | null {
  const { category, variant } = input;
  if (category === "cancel") return "cancel_contract";
  if (category === "fianza") return "deposit_return";
  if (category === "devolucion") return "return_14_days";
  if (category === "reparacion") return "request_repairs";
  if (category === "rescision") return "terminate_lease";
  if (category === "factura") return "dispute_bill";
  if (category === "garantia") return "warranty_3_years";
  if (category === "noentrega") return "non_delivery";
  if (category === "vuelo") return "flight_delay";
  if (category === "seguro") return "cancel_insurance";
  if (category === "denegacion") return "claim_denied";
  if (category === "comisiones") return "bank_fees_refund";
  if (category === "trafico") {
    if (variant === "multa") return "traffic_fine_appeal";
    if (variant === "venta") return "car_sale_notification";
    return null;
  }
  if (category === "trabajo") {
    if (variant === "salarios") return "unpaid_wages";
    if (variant === "baja") return "voluntary_resignation";
    if (variant === "vacaciones") return "vacation_request";
    return null;
  }
  return null;
}

