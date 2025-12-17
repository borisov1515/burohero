"use client";

import { useTranslations } from "next-intl";

export type Return14Form = {
  buyer_full_name: string;
  buyer_id: string;
  buyer_address: string;
  seller_name: string;
  seller_address: string;
  order_number: string;
  product_description: string;
  purchase_date: string;
  delivery_date: string;
  return_request_date: string;
  paid_amount_eur: string;
  payment_method: string;
  refund_iban: string;
  contacted_support_before: "yes" | "no" | "";
  contacted_support_details: string;
  desired_outcome: string;
  extra_details: string;
};

export const defaultReturn14Form: Return14Form = {
  buyer_full_name: "",
  buyer_id: "",
  buyer_address: "",
  seller_name: "",
  seller_address: "",
  order_number: "",
  product_description: "",
  purchase_date: "",
  delivery_date: "",
  return_request_date: "",
  paid_amount_eur: "",
  payment_method: "",
  refund_iban: "",
  contacted_support_before: "",
  contacted_support_details: "",
  desired_outcome: "",
  extra_details: "",
};

export function buildReturn14Facts(form: Return14Form) {
  const lines: string[] = [];
  lines.push(
    "Use case: consumer purchase return within 14 days (derecho de desistimiento).",
  );
  if (form.buyer_full_name) lines.push(`Buyer full name: ${form.buyer_full_name}`);
  if (form.buyer_id) lines.push(`Buyer ID (DNI/NIE/Passport): ${form.buyer_id}`);
  if (form.buyer_address) lines.push(`Buyer address: ${form.buyer_address}`);
  if (form.seller_name) lines.push(`Seller/merchant name: ${form.seller_name}`);
  if (form.seller_address) lines.push(`Seller/merchant address: ${form.seller_address}`);
  if (form.order_number) lines.push(`Order / invoice number: ${form.order_number}`);
  if (form.product_description) lines.push(`Product: ${form.product_description}`);
  if (form.purchase_date) lines.push(`Purchase date: ${form.purchase_date}`);
  if (form.delivery_date) lines.push(`Delivery date: ${form.delivery_date}`);
  if (form.return_request_date) lines.push(`Return request date: ${form.return_request_date}`);
  if (form.paid_amount_eur) lines.push(`Paid amount (EUR): ${form.paid_amount_eur}`);
  if (form.payment_method) lines.push(`Payment method: ${form.payment_method}`);
  if (form.refund_iban) lines.push(`Refund IBAN: ${form.refund_iban}`);
  if (form.contacted_support_before === "yes") lines.push("Contacted support before: yes");
  if (form.contacted_support_before === "no") lines.push("Contacted support before: no");
  if (form.contacted_support_details)
    lines.push(`Support contact details: ${form.contacted_support_details}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\n");
}

export function Return14FormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: Return14Form;
  setForm: (updater: (prev: Return14Form) => Return14Form) => void;
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
          placeholder="Buyer DNI/NIE/Passport"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.buyer_address}
          onChange={(e) => setForm((p) => ({ ...p, buyer_address: e.target.value }))}
          placeholder="Buyer address"
        />
      </div>

      <div className="text-sm font-medium">Seller / merchant</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.seller_name}
          onChange={(e) => setForm((p) => ({ ...p, seller_name: e.target.value }))}
          placeholder="Seller name"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.order_number}
          onChange={(e) => setForm((p) => ({ ...p, order_number: e.target.value }))}
          placeholder="Order / invoice number (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.seller_address}
          onChange={(e) => setForm((p) => ({ ...p, seller_address: e.target.value }))}
          placeholder="Seller address"
        />
      </div>

      <div className="text-sm font-medium">Purchase</div>
      <div className="grid gap-3 sm:grid-cols-2">
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
          placeholder="Purchase date (YYYY-MM-DD)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.delivery_date}
          onChange={(e) => setForm((p) => ({ ...p, delivery_date: e.target.value }))}
          placeholder="Delivery date (YYYY-MM-DD)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.return_request_date}
          onChange={(e) => setForm((p) => ({ ...p, return_request_date: e.target.value }))}
          placeholder="Return request date (YYYY-MM-DD)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.paid_amount_eur}
          onChange={(e) => setForm((p) => ({ ...p, paid_amount_eur: e.target.value }))}
          placeholder="Paid amount EUR"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.payment_method}
          onChange={(e) => setForm((p) => ({ ...p, payment_method: e.target.value }))}
          placeholder="Payment method (card/PayPal/IBAN)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.refund_iban}
          onChange={(e) => setForm((p) => ({ ...p, refund_iban: e.target.value }))}
          placeholder="Refund IBAN (optional)"
        />
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_support_before}
          onChange={(e) =>
            setForm((p) => ({ ...p, contacted_support_before: e.target.value as any }))
          }
        >
          <option value="">Contacted support before?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder="Desired outcome (refund, instructions for return, etc.)"
        />
        <textarea
          className="sm:col-span-2 h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_support_details}
          onChange={(e) =>
            setForm((p) => ({ ...p, contacted_support_details: e.target.value }))
          }
          placeholder="Support contact details (optional)"
        />
      </div>

      <textarea
        className="h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
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

