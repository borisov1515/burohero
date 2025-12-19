import type { LucideIcon } from "lucide-react";

export type CatalogCategoryId =
  | "housing"
  | "services"
  | "shopping"
  | "travel"
  | "traffic"
  | "work";

export type CatalogCardId =
  | "deposit_return"
  | "request_repairs"
  | "terminate_lease"
  | "cancel_contract"
  | "dispute_bill"
  | "bank_fees_refund"
  | "return_14_days"
  | "warranty_3_years"
  | "non_delivery"
  | "flight_delay"
  | "cancel_insurance"
  | "claim_denied"
  | "traffic_fine_appeal"
  | "car_sale_notification"
  | "unpaid_wages"
  | "voluntary_resignation"
  | "vacation_request";

export type CatalogItem = {
  id: CatalogCardId;
  slug: string; // category/company (generator route)
  titleKey: string; // home.cards.<...>.title
  descKey: string; // home.cards.<...>.desc
};

export type CatalogCategory = {
  id: CatalogCategoryId;
  titleKey: string; // home.categories.<id>
  icon: LucideIcon;
  items: CatalogItem[];
};

export function createCatalog(input: {
  icons: Record<
    CatalogCategoryId,
    LucideIcon
  >;
}): CatalogCategory[] {
  const { icons } = input;
  return [
    {
      id: "housing",
      titleKey: "categories.housing",
      icon: icons.housing,
      items: [
        {
          id: "deposit_return",
          slug: "fianza/landlord",
          titleKey: "cards.deposit_return.title",
          descKey: "cards.deposit_return.desc",
        },
        {
          id: "request_repairs",
          slug: "reparacion/landlord",
          titleKey: "cards.request_repairs.title",
          descKey: "cards.request_repairs.desc",
        },
        {
          id: "terminate_lease",
          slug: "rescision/landlord",
          titleKey: "cards.terminate_lease.title",
          descKey: "cards.terminate_lease.desc",
        },
      ],
    },
    {
      id: "services",
      titleKey: "categories.services",
      icon: icons.services,
      items: [
        {
          id: "cancel_contract",
          slug: "cancel/vodafone",
          titleKey: "cards.cancel_contract.title",
          descKey: "cards.cancel_contract.desc",
        },
        {
          id: "dispute_bill",
          slug: "factura/endesa",
          titleKey: "cards.dispute_bill.title",
          descKey: "cards.dispute_bill.desc",
        },
        {
          id: "bank_fees_refund",
          slug: "comisiones/bbva",
          titleKey: "cards.bank_fees_refund.title",
          descKey: "cards.bank_fees_refund.desc",
        },
      ],
    },
    {
      id: "shopping",
      titleKey: "categories.shopping",
      icon: icons.shopping,
      items: [
        {
          id: "return_14_days",
          slug: "devolucion/merchant",
          titleKey: "cards.return_14_days.title",
          descKey: "cards.return_14_days.desc",
        },
        {
          id: "warranty_3_years",
          slug: "garantia/zara",
          titleKey: "cards.warranty_3_years.title",
          descKey: "cards.warranty_3_years.desc",
        },
        {
          id: "non_delivery",
          slug: "noentrega/amazon",
          titleKey: "cards.non_delivery.title",
          descKey: "cards.non_delivery.desc",
        },
      ],
    },
    {
      id: "travel",
      titleKey: "categories.travel",
      icon: icons.travel,
      items: [
        {
          id: "flight_delay",
          slug: "vuelo/ryanair",
          titleKey: "cards.flight_delay.title",
          descKey: "cards.flight_delay.desc",
        },
        {
          id: "cancel_insurance",
          slug: "seguro/mapfre",
          titleKey: "cards.cancel_insurance.title",
          descKey: "cards.cancel_insurance.desc",
        },
        {
          id: "claim_denied",
          slug: "denegacion/allianz",
          titleKey: "cards.claim_denied.title",
          descKey: "cards.claim_denied.desc",
        },
      ],
    },
    {
      id: "traffic",
      titleKey: "categories.traffic",
      icon: icons.traffic,
      items: [
        {
          id: "traffic_fine_appeal",
          slug: "trafico/multa",
          titleKey: "cards.traffic_fine_appeal.title",
          descKey: "cards.traffic_fine_appeal.desc",
        },
        {
          id: "car_sale_notification",
          slug: "trafico/venta",
          titleKey: "cards.car_sale_notification.title",
          descKey: "cards.car_sale_notification.desc",
        },
      ],
    },
    {
      id: "work",
      titleKey: "categories.work",
      icon: icons.work,
      items: [
        {
          id: "unpaid_wages",
          slug: "trabajo/salarios",
          titleKey: "cards.unpaid_wages.title",
          descKey: "cards.unpaid_wages.desc",
        },
        {
          id: "voluntary_resignation",
          slug: "trabajo/baja",
          titleKey: "cards.voluntary_resignation.title",
          descKey: "cards.voluntary_resignation.desc",
        },
        {
          id: "vacation_request",
          slug: "trabajo/vacaciones",
          titleKey: "cards.vacation_request.title",
          descKey: "cards.vacation_request.desc",
        },
      ],
    },
  ];
}

