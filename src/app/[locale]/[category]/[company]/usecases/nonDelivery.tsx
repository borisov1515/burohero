"use client";

import { useTranslations } from "next-intl";

export type NonDeliveryForm = {
  buyer_full_name: string;
  buyer_id: string;
  buyer_address: string;
  seller_name: string;
  order_number: string;
  product_description: string;
  purchase_date: string;
  promised_delivery_date: string;
  tracking_number: string;
  carrier_name: string;
  delivery_status: "not_delivered" | "lost" | "delivered_but_not_received" | "";
  contacted_seller_before: "yes" | "no" | "";
  contacted_details: string;
  paid_amount_eur: string;
  payment_method: string;
  desired_outcome: "deliver" | "refund" | "replacement" | "";
  extra_details: string;
};

export const defaultNonDeliveryForm: NonDeliveryForm = {
  buyer_full_name: "",
  buyer_id: "",
  buyer_address: "",
  seller_name: "",
  order_number: "",
  product_description: "",
  purchase_date: "",
  promised_delivery_date: "",
  tracking_number: "",
  carrier_name: "",
  delivery_status: "",
  contacted_seller_before: "",
  contacted_details: "",
  paid_amount_eur: "",
  payment_method: "",
  desired_outcome: "",
  extra_details: "",
};

export function buildNonDeliveryFacts(form: NonDeliveryForm, companySlug: string) {
  const lines: string[] = [];
  lines.push(`Use case: undelivered goods / non-delivery complaint (${companySlug}).`);
  if (form.buyer_full_name) lines.push(`Buyer full name: ${form.buyer_full_name}`);
  if (form.buyer_id) lines.push(`Buyer ID (DNI/NIE/Passport): ${form.buyer_id}`);
  if (form.buyer_address) lines.push(`Buyer address: ${form.buyer_address}`);
  if (form.seller_name) lines.push(`Seller/merchant name: ${form.seller_name}`);
  if (form.order_number) lines.push(`Order number: ${form.order_number}`);
  if (form.product_description) lines.push(`Product: ${form.product_description}`);
  if (form.purchase_date) lines.push(`Purchase date: ${form.purchase_date}`);
  if (form.promised_delivery_date) lines.push(`Promised delivery date: ${form.promised_delivery_date}`);
  if (form.tracking_number) lines.push(`Tracking number: ${form.tracking_number}`);
  if (form.carrier_name) lines.push(`Carrier: ${form.carrier_name}`);
  if (form.delivery_status) lines.push(`Delivery status: ${form.delivery_status}`);
  if (form.contacted_seller_before === "yes") lines.push("Contacted seller before: yes");
  if (form.contacted_seller_before === "no") lines.push("Contacted seller before: no");
  if (form.contacted_details) lines.push(`Previous communication: ${form.contacted_details}`);
  if (form.paid_amount_eur) lines.push(`Paid amount (EUR): ${form.paid_amount_eur}`);
  if (form.payment_method) lines.push(`Payment method: ${form.payment_method}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\\n");
}

export function NonDeliveryFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: NonDeliveryForm;
  setForm: (updater: (prev: NonDeliveryForm) => NonDeliveryForm) => void;
  builtFacts: string;
}) {
  const tGen = useTranslations("generator");
  const tForms = useTranslations("forms");

  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">{tForms("sections.buyer")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.buyer_full_name}
          onChange={(e) => setForm((p) => ({ ...p, buyer_full_name: e.target.value }))}
          placeholder={tForms("nonDelivery.buyerFullName")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.buyer_id}
          onChange={(e) => setForm((p) => ({ ...p, buyer_id: e.target.value }))}
          placeholder={tForms("nonDelivery.buyerIdOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.buyer_address}
          onChange={(e) => setForm((p) => ({ ...p, buyer_address: e.target.value }))}
          placeholder={tForms("nonDelivery.buyerAddressOptional")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("nonDelivery.sections.order")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.seller_name}
          onChange={(e) => setForm((p) => ({ ...p, seller_name: e.target.value }))}
          placeholder={tForms("nonDelivery.sellerNameOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.order_number}
          onChange={(e) => setForm((p) => ({ ...p, order_number: e.target.value }))}
          placeholder={tForms("nonDelivery.orderNumberOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.product_description}
          onChange={(e) => setForm((p) => ({ ...p, product_description: e.target.value }))}
          placeholder={tForms("nonDelivery.productDescription")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.purchase_date}
          onChange={(e) => setForm((p) => ({ ...p, purchase_date: e.target.value }))}
          placeholder={tForms("nonDelivery.purchaseDateOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.promised_delivery_date}
          onChange={(e) => setForm((p) => ({ ...p, promised_delivery_date: e.target.value }))}
          placeholder={tForms("nonDelivery.promisedDeliveryDateOptional")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("sections.delivery")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.tracking_number}
          onChange={(e) => setForm((p) => ({ ...p, tracking_number: e.target.value }))}
          placeholder={tForms("nonDelivery.trackingNumberOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.carrier_name}
          onChange={(e) => setForm((p) => ({ ...p, carrier_name: e.target.value }))}
          placeholder={tForms("nonDelivery.carrierNameOptional")}
        />
        <select
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.delivery_status}
          onChange={(e) => setForm((p) => ({ ...p, delivery_status: e.target.value as any }))}
        >
          <option value="">{tForms("nonDelivery.deliveryStatus.label")}</option>
          <option value="not_delivered">{tForms("nonDelivery.deliveryStatus.notDelivered")}</option>
          <option value="lost">{tForms("nonDelivery.deliveryStatus.lost")}</option>
          <option value="delivered_but_not_received">{tForms("nonDelivery.deliveryStatus.deliveredButNotReceived")}</option>
        </select>
        <select
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.contacted_seller_before}
          onChange={(e) =>
            setForm((p) => ({ ...p, contacted_seller_before: e.target.value as any }))
          }
        >
          <option value="">{tForms("nonDelivery.contactedSellerBefore")}</option>
          <option value="yes">{tForms("common.yes")}</option>
          <option value="no">{tForms("common.no")}</option>
        </select>
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.contacted_details}
          onChange={(e) => setForm((p) => ({ ...p, contacted_details: e.target.value }))}
          placeholder={tForms("common.placeholders.previousCommunicationOptional")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("sections.paymentOutcome")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.paid_amount_eur}
          onChange={(e) => setForm((p) => ({ ...p, paid_amount_eur: e.target.value }))}
          placeholder={tForms("nonDelivery.paidAmountOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.payment_method}
          onChange={(e) => setForm((p) => ({ ...p, payment_method: e.target.value }))}
          placeholder={tForms("common.placeholders.paymentMethodOptional")}
        />
        <select
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value as any }))}
        >
          <option value="">{tForms("nonDelivery.desiredOutcome.label")}</option>
          <option value="deliver">{tForms("nonDelivery.desiredOutcome.deliver")}</option>
          <option value="replacement">{tForms("nonDelivery.desiredOutcome.replacement")}</option>
          <option value="refund">{tForms("nonDelivery.desiredOutcome.refund")}</option>
        </select>
      </div>

      <textarea
        className="h-24 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
        value={form.extra_details}
        onChange={(e) => setForm((p) => ({ ...p, extra_details: e.target.value }))}
        placeholder={tForms("common.placeholders.extraDetailsOptional")}
      />

      <details className="rounded-xl border border-[#DCE6FF] p-4 text-sm">
        <summary className="cursor-pointer select-none font-medium">
          {tGen("debug.factsSent")}
        </summary>
        <pre className="mt-3 whitespace-pre-wrap text-xs text-[#475569]">
          {builtFacts}
        </pre>
      </details>
    </div>
  );
}

