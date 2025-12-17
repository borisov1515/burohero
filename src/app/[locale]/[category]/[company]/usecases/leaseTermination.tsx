"use client";

export type LeaseTerminationForm = {
  tenant_full_name: string;
  tenant_id: string;
  tenant_address: string;
  landlord_full_name: string;
  landlord_address: string;
  property_address: string;
  lease_start_date: string;
  planned_termination_date: string;
  notice_sent_date: string;
  notice_method: string;
  termination_reason: string;
  desired_outcome: string;
  extra_details: string;
};

export const defaultLeaseTerminationForm: LeaseTerminationForm = {
  tenant_full_name: "",
  tenant_id: "",
  tenant_address: "",
  landlord_full_name: "",
  landlord_address: "",
  property_address: "",
  lease_start_date: "",
  planned_termination_date: "",
  notice_sent_date: "",
  notice_method: "",
  termination_reason: "",
  desired_outcome: "",
  extra_details: "",
};

export function buildLeaseTerminationFacts(form: LeaseTerminationForm) {
  const lines: string[] = [];
  lines.push("Use case: housing lease termination (resolución / rescisión del contrato).");
  if (form.tenant_full_name) lines.push(`Tenant full name: ${form.tenant_full_name}`);
  if (form.tenant_id) lines.push(`Tenant ID (DNI/NIE/Passport): ${form.tenant_id}`);
  if (form.tenant_address) lines.push(`Tenant address: ${form.tenant_address}`);
  if (form.landlord_full_name) lines.push(`Landlord full name: ${form.landlord_full_name}`);
  if (form.landlord_address) lines.push(`Landlord address: ${form.landlord_address}`);
  if (form.property_address) lines.push(`Rented property address: ${form.property_address}`);
  if (form.lease_start_date) lines.push(`Lease start date: ${form.lease_start_date}`);
  if (form.planned_termination_date) lines.push(`Planned termination date: ${form.planned_termination_date}`);
  if (form.notice_sent_date) lines.push(`Notice sent date: ${form.notice_sent_date}`);
  if (form.notice_method) lines.push(`Notice method: ${form.notice_method}`);
  if (form.termination_reason) lines.push(`Termination reason: ${form.termination_reason}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\n");
}

export function LeaseTerminationFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: LeaseTerminationForm;
  setForm: (updater: (prev: LeaseTerminationForm) => LeaseTerminationForm) => void;
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

      <div className="text-sm font-medium">Landlord</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.landlord_full_name}
          onChange={(e) => setForm((p) => ({ ...p, landlord_full_name: e.target.value }))}
          placeholder="Landlord full name"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.landlord_address}
          onChange={(e) => setForm((p) => ({ ...p, landlord_address: e.target.value }))}
          placeholder="Landlord address"
        />
      </div>

      <div className="text-sm font-medium">Lease details</div>
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
          value={form.planned_termination_date}
          onChange={(e) => setForm((p) => ({ ...p, planned_termination_date: e.target.value }))}
          placeholder="Planned termination date (YYYY-MM-DD)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.notice_sent_date}
          onChange={(e) => setForm((p) => ({ ...p, notice_sent_date: e.target.value }))}
          placeholder="Notice sent date (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.notice_method}
          onChange={(e) => setForm((p) => ({ ...p, notice_method: e.target.value }))}
          placeholder="Notice method (burofax/email/hand delivery) (optional)"
        />
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.termination_reason}
          onChange={(e) => setForm((p) => ({ ...p, termination_reason: e.target.value }))}
          placeholder="Reason for termination (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder="Desired outcome (confirm termination, key handover, settlement, etc.)"
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

