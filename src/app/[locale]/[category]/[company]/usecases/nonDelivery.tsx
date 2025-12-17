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

  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">Buyer</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.buyer_full_name}
          onChange={(e) => setForm((p) => ({ ...p, buyer_full_name: e.target.value }))}
          placeholder="Buyer full name"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.buyer_id}
          onChange={(e) => setForm((p) => ({ ...p, buyer_id: e.target.value }))}
          placeholder="Buyer DNI/NIE/Passport (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.buyer_address}
          onChange={(e) => setForm((p) => ({ ...p, buyer_address: e.target.value }))}
          placeholder="Buyer address (optional)"
        />
      </div>

      <div className="text-sm font-medium">Order</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.seller_name}
          onChange={(e) => setForm((p) => ({ ...p, seller_name: e.target.value }))}
          placeholder="Seller name (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.order_number}
          onChange={(e) => setForm((p) => ({ ...p, order_number: e.target.value }))}
          placeholder="Order number (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.product_description}
          onChange={(e) => setForm((p) => ({ ...p, product_description: e.target.value }))}
          placeholder="Product description"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.purchase_date}
          onChange={(e) => setForm((p) => ({ ...p, purchase_date: e.target.value }))}
          placeholder="Purchase date (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.promised_delivery_date}
          onChange={(e) => setForm((p) => ({ ...p, promised_delivery_date: e.target.value }))}
          placeholder="Promised delivery date (optional)"
        />
      </div>

      <div className="text-sm font-medium">Delivery</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.tracking_number}
          onChange={(e) => setForm((p) => ({ ...p, tracking_number: e.target.value }))}
          placeholder="Tracking number (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.carrier_name}
          onChange={(e) => setForm((p) => ({ ...p, carrier_name: e.target.value }))}
          placeholder="Carrier name (optional)"
        />
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.delivery_status}
          onChange={(e) => setForm((p) => ({ ...p, delivery_status: e.target.value as any }))}
        >
          <option value="">Delivery status</option>
          <option value="not_delivered">Not delivered</option>
          <option value="lost">Lost</option>
          <option value="delivered_but_not_received">Marked delivered but not received</option>
        </select>
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_seller_before}
          onChange={(e) =>
            setForm((p) => ({ ...p, contacted_seller_before: e.target.value as any }))
          }
        >
          <option value="">Contacted seller before?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_details}
          onChange={(e) => setForm((p) => ({ ...p, contacted_details: e.target.value }))}
          placeholder="Previous communication details (optional)"
        />
      </div>

      <div className="text-sm font-medium">Payment + requested outcome</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.paid_amount_eur}
          onChange={(e) => setForm((p) => ({ ...p, paid_amount_eur: e.target.value }))}
          placeholder="Paid amount EUR (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.payment_method}
          onChange={(e) => setForm((p) => ({ ...p, payment_method: e.target.value }))}
          placeholder="Payment method (optional)"
        />
        <select
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value as any }))}
        >
          <option value="">Desired outcome</option>
          <option value="deliver">Deliver the goods</option>
          <option value="replacement">Replacement</option>
          <option value="refund">Refund</option>
        </select>
      </div>

      <textarea
        className="h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
        value={form.extra_details}
        onChange={(e) => setForm((p) => ({ ...p, extra_details: e.target.value }))}
        placeholder="Extra details (optional)"
      />

      <details className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
        <summary className="cursor-pointer select-none font-medium">
          {tGen("debug.factsSent")}
        </summary>
        <pre className="mt-3 whitespace-pre-wrap text-xs text-zinc-600 dark:text-zinc-400">
          {builtFacts}
        </pre>
      </details>
    </div>
  );
}

