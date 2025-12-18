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
      titleKey: "home.categories.housing",
      icon: icons.housing,
      items: [
        {
          id: "deposit_return",
          slug: "fianza/landlord",
          titleKey: "home.cards.deposit_return.title",
          descKey: "home.cards.deposit_return.desc",
        },
        {
          id: "request_repairs",
          slug: "reparacion/landlord",
          titleKey: "home.cards.request_repairs.title",
          descKey: "home.cards.request_repairs.desc",
        },
        {
          id: "terminate_lease",
          slug: "rescision/landlord",
          titleKey: "home.cards.terminate_lease.title",
          descKey: "home.cards.terminate_lease.desc",
        },
      ],
    },
    {
      id: "services",
      titleKey: "home.categories.services",
      icon: icons.services,
      items: [
        {
          id: "cancel_contract",
          slug: "cancel/vodafone",
          titleKey: "home.cards.cancel_contract.title",
          descKey: "home.cards.cancel_contract.desc",
        },
        {
          id: "dispute_bill",
          slug: "factura/endesa",
          titleKey: "home.cards.dispute_bill.title",
          descKey: "home.cards.dispute_bill.desc",
        },
        {
          id: "bank_fees_refund",
          slug: "comisiones/bbva",
          titleKey: "home.cards.bank_fees_refund.title",
          descKey: "home.cards.bank_fees_refund.desc",
        },
      ],
    },
    {
      id: "shopping",
      titleKey: "home.categories.shopping",
      icon: icons.shopping,
      items: [
        {
          id: "return_14_days",
          slug: "devolucion/merchant",
          titleKey: "home.cards.return_14_days.title",
          descKey: "home.cards.return_14_days.desc",
        },
        {
          id: "warranty_3_years",
          slug: "garantia/zara",
          titleKey: "home.cards.warranty_3_years.title",
          descKey: "home.cards.warranty_3_years.desc",
        },
        {
          id: "non_delivery",
          slug: "noentrega/amazon",
          titleKey: "home.cards.non_delivery.title",
          descKey: "home.cards.non_delivery.desc",
        },
      ],
    },
    {
      id: "travel",
      titleKey: "home.categories.travel",
      icon: icons.travel,
      items: [
        {
          id: "flight_delay",
          slug: "vuelo/ryanair",
          titleKey: "home.cards.flight_delay.title",
          descKey: "home.cards.flight_delay.desc",
        },
        {
          id: "cancel_insurance",
          slug: "seguro/mapfre",
          titleKey: "home.cards.cancel_insurance.title",
          descKey: "home.cards.cancel_insurance.desc",
        },
        {
          id: "claim_denied",
          slug: "denegacion/allianz",
          titleKey: "home.cards.claim_denied.title",
          descKey: "home.cards.claim_denied.desc",
        },
      ],
    },
    {
      id: "traffic",
      titleKey: "home.categories.traffic",
      icon: icons.traffic,
      items: [
        {
          id: "traffic_fine_appeal",
          slug: "trafico/multa",
          titleKey: "home.cards.traffic_fine_appeal.title",
          descKey: "home.cards.traffic_fine_appeal.desc",
        },
        {
          id: "car_sale_notification",
          slug: "trafico/venta",
          titleKey: "home.cards.car_sale_notification.title",
          descKey: "home.cards.car_sale_notification.desc",
        },
      ],
    },
    {
      id: "work",
      titleKey: "home.categories.work",
      icon: icons.work,
      items: [
        {
          id: "unpaid_wages",
          slug: "trabajo/salarios",
          titleKey: "home.cards.unpaid_wages.title",
          descKey: "home.cards.unpaid_wages.desc",
        },
        {
          id: "voluntary_resignation",
          slug: "trabajo/baja",
          titleKey: "home.cards.voluntary_resignation.title",
          descKey: "home.cards.voluntary_resignation.desc",
        },
        {
          id: "vacation_request",
          slug: "trabajo/vacaciones",
          titleKey: "home.cards.vacation_request.title",
          descKey: "home.cards.vacation_request.desc",
        },
      ],
    },
  ];
}

