"use client";

import { useTranslations } from "next-intl";

export type RepairDemandForm = {
  tenant_full_name: string;
  tenant_id: string;
  tenant_address: string;
  landlord_full_name: string;
  landlord_address: string;
  property_address: string;
  issue_description: string;
  issue_first_notice_date: string;
  urgency: "low" | "normal" | "high" | "";
  desired_outcome: string;
  extra_details: string;
};

export const defaultRepairDemandForm: RepairDemandForm = {
  tenant_full_name: "",
  tenant_id: "",
  tenant_address: "",
  landlord_full_name: "",
  landlord_address: "",
  property_address: "",
  issue_description: "",
  issue_first_notice_date: "",
  urgency: "",
  desired_outcome: "",
  extra_details: "",
};

export function buildRepairDemandFacts(form: RepairDemandForm) {
  const lines: string[] = [];
  lines.push("Use case: housing repair demand (requerimiento de reparación).");
  if (form.tenant_full_name) lines.push(`Tenant full name: ${form.tenant_full_name}`);
  if (form.tenant_id) lines.push(`Tenant ID (DNI/NIE/Passport): ${form.tenant_id}`);
  if (form.tenant_address) lines.push(`Tenant address: ${form.tenant_address}`);
  if (form.landlord_full_name) lines.push(`Landlord full name: ${form.landlord_full_name}`);
  if (form.landlord_address) lines.push(`Landlord address: ${form.landlord_address}`);
  if (form.property_address) lines.push(`Rented property address: ${form.property_address}`);
  if (form.issue_description) lines.push(`Issue description: ${form.issue_description}`);
  if (form.issue_first_notice_date) lines.push(`Issue first reported on: ${form.issue_first_notice_date}`);
  if (form.urgency) lines.push(`Urgency: ${form.urgency}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\n");
}

export function RepairDemandFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: RepairDemandForm;
  setForm: (updater: (prev: RepairDemandForm) => RepairDemandForm) => void;
  builtFacts: string;
}) {
  const tGen = useTranslations("generator");
  const tForms = useTranslations("forms");

  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">{tForms("sections.tenant")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.tenant_full_name}
          onChange={(e) => setForm((p) => ({ ...p, tenant_full_name: e.target.value }))}
          placeholder={tForms("repairDemand.tenantFullName")}
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.tenant_id}
          onChange={(e) => setForm((p) => ({ ...p, tenant_id: e.target.value }))}
          placeholder={tForms("repairDemand.tenantId")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.tenant_address}
          onChange={(e) => setForm((p) => ({ ...p, tenant_address: e.target.value }))}
          placeholder={tForms("repairDemand.tenantAddress")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("sections.landlord")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.landlord_full_name}
          onChange={(e) => setForm((p) => ({ ...p, landlord_full_name: e.target.value }))}
          placeholder={tForms("repairDemand.landlordFullName")}
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.issue_first_notice_date}
          onChange={(e) => setForm((p) => ({ ...p, issue_first_notice_date: e.target.value }))}
          placeholder={tForms("repairDemand.issueFirstReportedDate")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.landlord_address}
          onChange={(e) => setForm((p) => ({ ...p, landlord_address: e.target.value }))}
          placeholder={tForms("repairDemand.landlordAddress")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("repairDemand.sections.propertyIssue")}</div>
      <div className="grid gap-3">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.property_address}
          onChange={(e) => setForm((p) => ({ ...p, property_address: e.target.value }))}
          placeholder={tForms("repairDemand.propertyAddress")}
        />
        <textarea
          className="h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.issue_description}
          onChange={(e) => setForm((p) => ({ ...p, issue_description: e.target.value }))}
          placeholder={tForms("repairDemand.issueDescription")}
        />
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.urgency}
          onChange={(e) => setForm((p) => ({ ...p, urgency: e.target.value as any }))}
        >
          <option value="">{tForms("repairDemand.urgency.label")}</option>
          <option value="low">{tForms("repairDemand.urgency.low")}</option>
          <option value="normal">{tForms("repairDemand.urgency.normal")}</option>
          <option value="high">{tForms("repairDemand.urgency.high")}</option>
        </select>
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder={tForms("repairDemand.desiredOutcome")}
        />
        <textarea
          className="h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.extra_details}
          onChange={(e) => setForm((p) => ({ ...p, extra_details: e.target.value }))}
          placeholder={tForms("common.placeholders.extraDetailsOptional")}
        />
      </div>

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

