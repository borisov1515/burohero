"use client";

export type DepositReturnForm = {
  tenant_full_name: string;
  tenant_id: string;
  tenant_address: string;
  landlord_full_name: string;
  landlord_id: string;
  landlord_address: string;
  property_address: string;
  lease_start_date: string;
  lease_end_date: string;
  deposit_amount_eur: string;
  move_out_date: string;
  keys_returned_date: string;
  requested_before: "yes" | "no" | "";
  requested_before_details: string;
  refund_iban: string;
  desired_outcome: string;
  extra_details: string;
};

export const defaultDepositReturnForm: DepositReturnForm = {
  tenant_full_name: "",
  tenant_id: "",
  tenant_address: "",
  landlord_full_name: "",
  landlord_id: "",
  landlord_address: "",
  property_address: "",
  lease_start_date: "",
  lease_end_date: "",
  deposit_amount_eur: "",
  move_out_date: "",
  keys_returned_date: "",
  requested_before: "",
  requested_before_details: "",
  refund_iban: "",
  desired_outcome: "",
  extra_details: "",
};

export function buildDepositReturnFacts(form: DepositReturnForm) {
  const lines: string[] = [];
  lines.push("Use case: housing deposit return (fianza).");
  if (form.tenant_full_name) lines.push(`Tenant full name: ${form.tenant_full_name}`);
  if (form.tenant_id) lines.push(`Tenant ID (DNI/NIE/Passport): ${form.tenant_id}`);
  if (form.tenant_address) lines.push(`Tenant address: ${form.tenant_address}`);
  if (form.landlord_full_name) lines.push(`Landlord full name: ${form.landlord_full_name}`);
  if (form.landlord_id) lines.push(`Landlord ID: ${form.landlord_id}`);
  if (form.landlord_address) lines.push(`Landlord address: ${form.landlord_address}`);
  if (form.property_address) lines.push(`Rented property address: ${form.property_address}`);
  if (form.lease_start_date) lines.push(`Lease start date: ${form.lease_start_date}`);
  if (form.lease_end_date) lines.push(`Lease end date: ${form.lease_end_date}`);
  if (form.deposit_amount_eur) lines.push(`Deposit amount (EUR): ${form.deposit_amount_eur}`);
  if (form.move_out_date) lines.push(`Move-out date: ${form.move_out_date}`);
  if (form.keys_returned_date) lines.push(`Keys returned date: ${form.keys_returned_date}`);
  if (form.requested_before === "yes") lines.push("Deposit return already requested before: yes");
  if (form.requested_before === "no") lines.push("Deposit return already requested before: no");
  if (form.requested_before_details) lines.push(`Previous requests: ${form.requested_before_details}`);
  if (form.refund_iban) lines.push(`Refund IBAN: ${form.refund_iban}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\n");
}

export function DepositReturnFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: DepositReturnForm;
  setForm: (updater: (prev: DepositReturnForm) => DepositReturnForm) => void;
  builtFacts: string;
}) {
  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">Tenant</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.tenant_full_name}
          onChange={(e) => setForm((p) => ({ ...p, tenant_full_name: e.target.value }))}
          placeholder="Tenant full name"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.tenant_id}
          onChange={(e) => setForm((p) => ({ ...p, tenant_id: e.target.value }))}
          placeholder="Tenant DNI/NIE/Passport"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.tenant_address}
          onChange={(e) => setForm((p) => ({ ...p, tenant_address: e.target.value }))}
          placeholder="Tenant address"
        />
      </div>

      <div className="text-sm font-medium">Landlord / recipient</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.landlord_full_name}
          onChange={(e) => setForm((p) => ({ ...p, landlord_full_name: e.target.value }))}
          placeholder="Landlord full name"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.landlord_id}
          onChange={(e) => setForm((p) => ({ ...p, landlord_id: e.target.value }))}
          placeholder="Landlord ID (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.landlord_address}
          onChange={(e) => setForm((p) => ({ ...p, landlord_address: e.target.value }))}
          placeholder="Landlord address"
        />
      </div>

      <div className="text-sm font-medium">Lease + deposit</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.property_address}
          onChange={(e) => setForm((p) => ({ ...p, property_address: e.target.value }))}
          placeholder="Rented property address"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.lease_start_date}
          onChange={(e) => setForm((p) => ({ ...p, lease_start_date: e.target.value }))}
          placeholder="Lease start date (YYYY-MM-DD)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.lease_end_date}
          onChange={(e) => setForm((p) => ({ ...p, lease_end_date: e.target.value }))}
          placeholder="Lease end date (YYYY-MM-DD)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.deposit_amount_eur}
          onChange={(e) => setForm((p) => ({ ...p, deposit_amount_eur: e.target.value }))}
          placeholder="Deposit amount EUR"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.move_out_date}
          onChange={(e) => setForm((p) => ({ ...p, move_out_date: e.target.value }))}
          placeholder="Move-out date (YYYY-MM-DD)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.keys_returned_date}
          onChange={(e) => setForm((p) => ({ ...p, keys_returned_date: e.target.value }))}
          placeholder="Keys returned date (optional)"
        />
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.requested_before}
          onChange={(e) => setForm((p) => ({ ...p, requested_before: e.target.value as any }))}
        >
          <option value="">Requested return before?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.refund_iban}
          onChange={(e) => setForm((p) => ({ ...p, refund_iban: e.target.value }))}
          placeholder="Refund IBAN (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder="Desired outcome (refund by date, etc.)"
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
          Debug: facts sent to AI
        </summary>
        <pre className="mt-3 whitespace-pre-wrap text-xs text-zinc-600 dark:text-zinc-400">
          {builtFacts}
        </pre>
      </details>
    </div>
  );
}

