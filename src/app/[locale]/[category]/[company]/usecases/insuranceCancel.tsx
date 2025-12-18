"use client";

import { useTranslations } from "next-intl";

export type InsuranceCancelForm = {
  policyholder_full_name: string;
  policyholder_id: string;
  policyholder_address: string;
  insurer_name: string;
  policy_number: string;
  insurance_type: string;
  contract_start_date: string;
  renewal_date: string;
  cancellation_request_date: string;
  cancellation_method: string;
  reason: string;
  desired_outcome: string;
  iban: string;
  extra_details: string;
};

export const defaultInsuranceCancelForm: InsuranceCancelForm = {
  policyholder_full_name: "",
  policyholder_id: "",
  policyholder_address: "",
  insurer_name: "",
  policy_number: "",
  insurance_type: "",
  contract_start_date: "",
  renewal_date: "",
  cancellation_request_date: "",
  cancellation_method: "",
  reason: "",
  desired_outcome: "",
  iban: "",
  extra_details: "",
};

export function buildInsuranceCancelFacts(form: InsuranceCancelForm, companySlug: string) {
  const lines: string[] = [];
  lines.push(`Use case: insurance policy cancellation (${companySlug}).`);
  if (form.policyholder_full_name) lines.push(`Policyholder full name: ${form.policyholder_full_name}`);
  if (form.policyholder_id) lines.push(`Policyholder ID (DNI/NIE/Passport): ${form.policyholder_id}`);
  if (form.policyholder_address) lines.push(`Policyholder address: ${form.policyholder_address}`);
  if (form.insurer_name) lines.push(`Insurer name: ${form.insurer_name}`);
  if (form.policy_number) lines.push(`Policy number: ${form.policy_number}`);
  if (form.insurance_type) lines.push(`Insurance type: ${form.insurance_type}`);
  if (form.contract_start_date) lines.push(`Contract start date: ${form.contract_start_date}`);
  if (form.renewal_date) lines.push(`Renewal date: ${form.renewal_date}`);
  if (form.cancellation_request_date) lines.push(`Cancellation requested on: ${form.cancellation_request_date}`);
  if (form.cancellation_method) lines.push(`Cancellation method: ${form.cancellation_method}`);
  if (form.reason) lines.push(`Reason (optional): ${form.reason}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.iban) lines.push(`IBAN for refunds (optional): ${form.iban}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\\n");
}

export function InsuranceCancelFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: InsuranceCancelForm;
  setForm: (updater: (prev: InsuranceCancelForm) => InsuranceCancelForm) => void;
  builtFacts: string;
}) {
  const tGen = useTranslations("generator");
  const tForms = useTranslations("forms");

  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">{tForms("sections.policyholder")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.policyholder_full_name}
          onChange={(e) => setForm((p) => ({ ...p, policyholder_full_name: e.target.value }))}
          placeholder={tForms("common.placeholders.fullName")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.policyholder_id}
          onChange={(e) => setForm((p) => ({ ...p, policyholder_id: e.target.value }))}
          placeholder={tForms("common.placeholders.idOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.policyholder_address}
          onChange={(e) => setForm((p) => ({ ...p, policyholder_address: e.target.value }))}
          placeholder={tForms("common.placeholders.addressOptional")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("sections.policy")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.insurer_name}
          onChange={(e) => setForm((p) => ({ ...p, insurer_name: e.target.value }))}
          placeholder={tForms("insuranceCancel.insurerNameOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.policy_number}
          onChange={(e) => setForm((p) => ({ ...p, policy_number: e.target.value }))}
          placeholder={tForms("insuranceCancel.policyNumberOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.insurance_type}
          onChange={(e) => setForm((p) => ({ ...p, insurance_type: e.target.value }))}
          placeholder={tForms("insuranceCancel.insuranceTypeOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.renewal_date}
          onChange={(e) => setForm((p) => ({ ...p, renewal_date: e.target.value }))}
          placeholder={tForms("insuranceCancel.renewalDateOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.cancellation_request_date}
          onChange={(e) => setForm((p) => ({ ...p, cancellation_request_date: e.target.value }))}
          placeholder={tForms("insuranceCancel.cancellationRequestDateOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.cancellation_method}
          onChange={(e) => setForm((p) => ({ ...p, cancellation_method: e.target.value }))}
          placeholder={tForms("insuranceCancel.cancellationMethodOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.iban}
          onChange={(e) => setForm((p) => ({ ...p, iban: e.target.value }))}
          placeholder={tForms("insuranceCancel.ibanOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder={tForms("insuranceCancel.desiredOutcome")}
        />
      </div>

      <textarea
        className="h-24 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
        value={form.reason}
        onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
        placeholder={tForms("insuranceCancel.reasonOptional")}
      />

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

