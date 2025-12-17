"use client";

export type Warranty3yForm = {
  buyer_full_name: string;
  buyer_id: string;
  buyer_address: string;
  seller_name: string;
  seller_address: string;
  order_or_invoice_number: string;
  product_description: string;
  purchase_date: string;
  delivery_date: string;
  defect_description: string;
  defect_discovered_date: string;
  contacted_support_before: "yes" | "no" | "";
  contacted_support_details: string;
  requested_solution: "repair" | "replacement" | "refund" | "price_reduction" | "";
  desired_outcome: string;
  extra_details: string;
};

export const defaultWarranty3yForm: Warranty3yForm = {
  buyer_full_name: "",
  buyer_id: "",
  buyer_address: "",
  seller_name: "",
  seller_address: "",
  order_or_invoice_number: "",
  product_description: "",
  purchase_date: "",
  delivery_date: "",
  defect_description: "",
  defect_discovered_date: "",
  contacted_support_before: "",
  contacted_support_details: "",
  requested_solution: "",
  desired_outcome: "",
  extra_details: "",
};

export function buildWarranty3yFacts(form: Warranty3yForm, companySlug: string) {
  const lines: string[] = [];
  lines.push(`Use case: consumer warranty claim (3 years) (${companySlug}).`);
  if (form.buyer_full_name) lines.push(`Buyer full name: ${form.buyer_full_name}`);
  if (form.buyer_id) lines.push(`Buyer ID (DNI/NIE/Passport): ${form.buyer_id}`);
  if (form.buyer_address) lines.push(`Buyer address: ${form.buyer_address}`);
  if (form.seller_name) lines.push(`Seller/merchant name: ${form.seller_name}`);
  if (form.seller_address) lines.push(`Seller/merchant address: ${form.seller_address}`);
  if (form.order_or_invoice_number) lines.push(`Order / invoice number: ${form.order_or_invoice_number}`);
  if (form.product_description) lines.push(`Product: ${form.product_description}`);
  if (form.purchase_date) lines.push(`Purchase date: ${form.purchase_date}`);
  if (form.delivery_date) lines.push(`Delivery date: ${form.delivery_date}`);
  if (form.defect_description) lines.push(`Defect description: ${form.defect_description}`);
  if (form.defect_discovered_date) lines.push(`Defect discovered on: ${form.defect_discovered_date}`);
  if (form.contacted_support_before === "yes") lines.push("Contacted support before: yes");
  if (form.contacted_support_before === "no") lines.push("Contacted support before: no");
  if (form.contacted_support_details) lines.push(`Support contact details: ${form.contacted_support_details}`);
  if (form.requested_solution) lines.push(`Requested solution: ${form.requested_solution}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\n");
}

export function Warranty3yFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: Warranty3yForm;
  setForm: (updater: (prev: Warranty3yForm) => Warranty3yForm) => void;
  builtFacts: string;
}) {
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

      <div className="text-sm font-medium">Seller / merchant</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.seller_name}
          onChange={(e) => setForm((p) => ({ ...p, seller_name: e.target.value }))}
          placeholder="Seller name (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.order_or_invoice_number}
          onChange={(e) => setForm((p) => ({ ...p, order_or_invoice_number: e.target.value }))}
          placeholder="Order / invoice number (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.seller_address}
          onChange={(e) => setForm((p) => ({ ...p, seller_address: e.target.value }))}
          placeholder="Seller address (optional)"
        />
      </div>

      <div className="text-sm font-medium">Product + warranty</div>
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
          placeholder="Purchase date (YYYY-MM-DD) (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.delivery_date}
          onChange={(e) => setForm((p) => ({ ...p, delivery_date: e.target.value }))}
          placeholder="Delivery date (YYYY-MM-DD) (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.defect_discovered_date}
          onChange={(e) => setForm((p) => ({ ...p, defect_discovered_date: e.target.value }))}
          placeholder="Defect discovered date (optional)"
        />
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.requested_solution}
          onChange={(e) => setForm((p) => ({ ...p, requested_solution: e.target.value as any }))}
        >
          <option value="">Requested solution</option>
          <option value="repair">Repair</option>
          <option value="replacement">Replacement</option>
          <option value="refund">Refund</option>
          <option value="price_reduction">Price reduction</option>
        </select>
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_support_before}
          onChange={(e) => setForm((p) => ({ ...p, contacted_support_before: e.target.value as any }))}
        >
          <option value="">Contacted support before?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <textarea
          className="sm:col-span-2 h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.defect_description}
          onChange={(e) => setForm((p) => ({ ...p, defect_description: e.target.value }))}
          placeholder="Describe the defect / lack of conformity…"
        />
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_support_details}
          onChange={(e) => setForm((p) => ({ ...p, contacted_support_details: e.target.value }))}
          placeholder="Support contact details (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder="Desired outcome (repair within X days, replacement, refund, etc.)"
        />
      </div>

      <textarea
        className="h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
        value={form.extra_details}
        onChange={(e) => setForm((p) => ({ ...p, extra_details: e.target.value }))}
        placeholder="Extra details (optional)"
      />

      <details className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
        <summary className="cursor-pointer select-none font-medium">
          Debug: facts sent to AI
        </summary>
        <pre className="mt-3 whitespace-pre-wrap text-xs text-zinc-600 dark:text-zinc-400">
          {builtFacts}
        </pre>
      </details>
    </div>
  );
}

