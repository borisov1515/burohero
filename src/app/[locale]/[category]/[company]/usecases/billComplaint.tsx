"use client";

export type BillComplaintForm = {
  customer_full_name: string;
  customer_id: string;
  customer_address: string;
  contract_or_account_number: string;
  invoice_number: string;
  billing_period: string;
  invoice_date: string;
  amount_eur: string;
  issue_type: "overcharge" | "wrong_reading" | "duplicate" | "service_not_provided" | "other" | "";
  issue_description: string;
  contacted_before: "yes" | "no" | "";
  contacted_before_details: string;
  payment_status: "paid" | "unpaid" | "partially_paid" | "";
  desired_outcome: string;
  refund_iban: string;
  extra_details: string;
};

export const defaultBillComplaintForm: BillComplaintForm = {
  customer_full_name: "",
  customer_id: "",
  customer_address: "",
  contract_or_account_number: "",
  invoice_number: "",
  billing_period: "",
  invoice_date: "",
  amount_eur: "",
  issue_type: "",
  issue_description: "",
  contacted_before: "",
  contacted_before_details: "",
  payment_status: "",
  desired_outcome: "",
  refund_iban: "",
  extra_details: "",
};

export function buildBillComplaintFacts(form: BillComplaintForm, companySlug: string) {
  const lines: string[] = [];
  lines.push(`Use case: bill dispute / invoice complaint (${companySlug}).`);
  if (form.customer_full_name) lines.push(`Customer full name: ${form.customer_full_name}`);
  if (form.customer_id) lines.push(`Customer ID (DNI/NIE/Passport): ${form.customer_id}`);
  if (form.customer_address) lines.push(`Customer address: ${form.customer_address}`);
  if (form.contract_or_account_number)
    lines.push(`Contract/account number: ${form.contract_or_account_number}`);
  if (form.invoice_number) lines.push(`Invoice number: ${form.invoice_number}`);
  if (form.invoice_date) lines.push(`Invoice date: ${form.invoice_date}`);
  if (form.billing_period) lines.push(`Billing period: ${form.billing_period}`);
  if (form.amount_eur) lines.push(`Invoice amount (EUR): ${form.amount_eur}`);
  if (form.payment_status) lines.push(`Payment status: ${form.payment_status}`);
  if (form.issue_type) lines.push(`Issue type: ${form.issue_type}`);
  if (form.issue_description) lines.push(`Issue description: ${form.issue_description}`);
  if (form.contacted_before === "yes") lines.push("Contacted provider before: yes");
  if (form.contacted_before === "no") lines.push("Contacted provider before: no");
  if (form.contacted_before_details)
    lines.push(`Previous communication: ${form.contacted_before_details}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.refund_iban) lines.push(`Refund IBAN: ${form.refund_iban}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\n");
}

export function BillComplaintFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: BillComplaintForm;
  setForm: (updater: (prev: BillComplaintForm) => BillComplaintForm) => void;
  builtFacts: string;
}) {
  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">Customer</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.customer_full_name}
          onChange={(e) => setForm((p) => ({ ...p, customer_full_name: e.target.value }))}
          placeholder="Full name"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.customer_id}
          onChange={(e) => setForm((p) => ({ ...p, customer_id: e.target.value }))}
          placeholder="DNI/NIE/Passport (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.customer_address}
          onChange={(e) => setForm((p) => ({ ...p, customer_address: e.target.value }))}
          placeholder="Address (optional)"
        />
      </div>

      <div className="text-sm font-medium">Invoice</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contract_or_account_number}
          onChange={(e) =>
            setForm((p) => ({ ...p, contract_or_account_number: e.target.value }))
          }
          placeholder="Contract/account number (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.invoice_number}
          onChange={(e) => setForm((p) => ({ ...p, invoice_number: e.target.value }))}
          placeholder="Invoice number (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.invoice_date}
          onChange={(e) => setForm((p) => ({ ...p, invoice_date: e.target.value }))}
          placeholder="Invoice date (YYYY-MM-DD) (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.billing_period}
          onChange={(e) => setForm((p) => ({ ...p, billing_period: e.target.value }))}
          placeholder="Billing period (e.g., 2025-10) (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.amount_eur}
          onChange={(e) => setForm((p) => ({ ...p, amount_eur: e.target.value }))}
          placeholder="Amount EUR (optional)"
        />
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.payment_status}
          onChange={(e) => setForm((p) => ({ ...p, payment_status: e.target.value as any }))}
        >
          <option value="">Payment status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="partially_paid">Partially paid</option>
        </select>
      </div>

      <div className="text-sm font-medium">Issue</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.issue_type}
          onChange={(e) => setForm((p) => ({ ...p, issue_type: e.target.value as any }))}
        >
          <option value="">Issue type</option>
          <option value="overcharge">Overcharge</option>
          <option value="wrong_reading">Wrong meter reading</option>
          <option value="duplicate">Duplicate invoice</option>
          <option value="service_not_provided">Service not provided</option>
          <option value="other">Other</option>
        </select>
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_before}
          onChange={(e) => setForm((p) => ({ ...p, contacted_before: e.target.value as any }))}
        >
          <option value="">Contacted provider before?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <textarea
          className="sm:col-span-2 h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.issue_description}
          onChange={(e) => setForm((p) => ({ ...p, issue_description: e.target.value }))}
          placeholder="Describe what's wrong with the invoice…"
        />
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_before_details}
          onChange={(e) => setForm((p) => ({ ...p, contacted_before_details: e.target.value }))}
          placeholder="Previous communication details (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder="Desired outcome (corrected invoice, refund, etc.)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.refund_iban}
          onChange={(e) => setForm((p) => ({ ...p, refund_iban: e.target.value }))}
          placeholder="Refund IBAN (optional)"
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

