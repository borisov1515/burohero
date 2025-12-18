"use client";

import { useTranslations } from "next-intl";

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
  const tGen = useTranslations("generator");
  const tForms = useTranslations("forms");

  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">{tForms("sections.tenant")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.tenant_full_name}
          onChange={(e) => setForm((p) => ({ ...p, tenant_full_name: e.target.value }))}
          placeholder={tForms("leaseTermination.tenantFullName")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.tenant_id}
          onChange={(e) => setForm((p) => ({ ...p, tenant_id: e.target.value }))}
          placeholder={tForms("leaseTermination.tenantId")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.tenant_address}
          onChange={(e) => setForm((p) => ({ ...p, tenant_address: e.target.value }))}
          placeholder={tForms("leaseTermination.tenantAddress")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("sections.landlord")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.landlord_full_name}
          onChange={(e) => setForm((p) => ({ ...p, landlord_full_name: e.target.value }))}
          placeholder={tForms("leaseTermination.landlordFullName")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.landlord_address}
          onChange={(e) => setForm((p) => ({ ...p, landlord_address: e.target.value }))}
          placeholder={tForms("leaseTermination.landlordAddress")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("sections.leaseDetails")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.property_address}
          onChange={(e) => setForm((p) => ({ ...p, property_address: e.target.value }))}
          placeholder={tForms("leaseTermination.propertyAddress")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.lease_start_date}
          onChange={(e) => setForm((p) => ({ ...p, lease_start_date: e.target.value }))}
          placeholder={tForms("leaseTermination.leaseStartDate")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.planned_termination_date}
          onChange={(e) => setForm((p) => ({ ...p, planned_termination_date: e.target.value }))}
          placeholder={tForms("leaseTermination.plannedTerminationDate")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.notice_sent_date}
          onChange={(e) => setForm((p) => ({ ...p, notice_sent_date: e.target.value }))}
          placeholder={tForms("leaseTermination.noticeSentDateOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.notice_method}
          onChange={(e) => setForm((p) => ({ ...p, notice_method: e.target.value }))}
          placeholder={tForms("leaseTermination.noticeMethodOptional")}
        />
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.termination_reason}
          onChange={(e) => setForm((p) => ({ ...p, termination_reason: e.target.value }))}
          placeholder={tForms("leaseTermination.terminationReasonOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder={tForms("leaseTermination.desiredOutcome")}
        />
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

