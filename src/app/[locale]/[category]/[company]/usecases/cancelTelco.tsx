"use client";

import { getCompanyBySlug, type Company } from "@/lib/companies";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export type CancelTelcoForm = {
  applicant_full_name: string;
  applicant_id: string;
  applicant_address: string;
  contract_number: string;
  cancellation_request_date: string;
  cancellation_request_method: string;
  charge_after_cancellation: "yes" | "no" | "";
  charged_amount_eur: string;
  charged_date: string;
  payment_method: string;
  desired_outcome: string;
  extra_details: string;
};

export const defaultCancelTelcoForm: CancelTelcoForm = {
  applicant_full_name: "",
  applicant_id: "",
  applicant_address: "",
  contract_number: "",
  cancellation_request_date: "",
  cancellation_request_method: "",
  charge_after_cancellation: "",
  charged_amount_eur: "",
  charged_date: "",
  payment_method: "",
  desired_outcome: "",
  extra_details: "",
};

export function buildCancelTelcoFacts(form: CancelTelcoForm, company: string) {
  const recipient = getCompanyBySlug(company);
  const lines: string[] = [];
  lines.push(`Use case: cancel telecom contract (${company}).`);
  if (recipient) {
    lines.push(`Recipient (company): ${recipient.name}`);
    lines.push(`Recipient CIF: ${recipient.cif}`);
    lines.push(`Recipient address: ${recipient.address}`);
  }
  if (form.applicant_full_name)
    lines.push(`Applicant full name: ${form.applicant_full_name}`);
  if (form.applicant_id)
    lines.push(`Applicant ID (DNI/NIE/Passport): ${form.applicant_id}`);
  if (form.applicant_address) lines.push(`Applicant address: ${form.applicant_address}`);
  if (form.contract_number) lines.push(`Contract number: ${form.contract_number}`);
  if (form.cancellation_request_date)
    lines.push(`Cancellation requested on: ${form.cancellation_request_date}`);
  if (form.cancellation_request_method)
    lines.push(`Cancellation request method: ${form.cancellation_request_method}`);
  if (form.charge_after_cancellation === "yes")
    lines.push(`Provider continued charging after cancellation: yes`);
  if (form.charge_after_cancellation === "no")
    lines.push(`Provider continued charging after cancellation: no`);
  if (form.charged_amount_eur) lines.push(`Charged amount (EUR): ${form.charged_amount_eur}`);
  if (form.charged_date) lines.push(`Charge date: ${form.charged_date}`);
  if (form.payment_method) lines.push(`Payment method: ${form.payment_method}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\n");
}

export function CancelTelcoFormSection({
  company,
  form,
  setForm,
  builtFacts,
}: {
  company: string;
  form: CancelTelcoForm;
  setForm: (updater: (prev: CancelTelcoForm) => CancelTelcoForm) => void;
  builtFacts: string;
}) {
  const recipient: Company | null = useMemo(() => getCompanyBySlug(company), [company]);
  const tGen = useTranslations("generator");
  const tForms = useTranslations("forms");

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-[#DCE6FF] bg-[#F5F8FF] p-4 text-sm">
        <div className="font-medium">{tForms("sections.recipient")}</div>
        {recipient ? (
          <div className="mt-2 grid gap-1 text-[#475569]">
            <div>{recipient.name}</div>
            <div>
              <span className="text-[#64748B]">
                {tForms("common.labels.cif")}
              </span>{" "}
              <span className="font-mono">{recipient.cif}</span>
            </div>
            <div>{recipient.address}</div>
          </div>
        ) : (
          <div className="mt-2 text-[#475569]">
            {tForms("cancelTelco.unknownCompanySlug")}{" "}
            <span className="font-mono">{company}</span>
          </div>
        )}
      </div>

      <div>
        <div className="text-sm font-medium">{tForms("sections.applicant")}</div>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.applicant_full_name}
            onChange={(e) => setForm((p) => ({ ...p, applicant_full_name: e.target.value }))}
            placeholder={tForms("common.placeholders.fullName")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.applicant_id}
            onChange={(e) => setForm((p) => ({ ...p, applicant_id: e.target.value }))}
            placeholder={tForms("common.placeholders.id")}
          />
          <input
            className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.applicant_address}
            onChange={(e) => setForm((p) => ({ ...p, applicant_address: e.target.value }))}
            placeholder={tForms("common.placeholders.address")}
          />
        </div>
      </div>

      <div>
        <div className="text-sm font-medium">{tForms("sections.caseDetails")}</div>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.contract_number}
            onChange={(e) => setForm((p) => ({ ...p, contract_number: e.target.value }))}
            placeholder={tForms("cancelTelco.contractNumberOptional")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.cancellation_request_date}
            onChange={(e) =>
              setForm((p) => ({ ...p, cancellation_request_date: e.target.value }))
            }
            placeholder={tForms("cancelTelco.cancellationRequestDate")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.cancellation_request_method}
            onChange={(e) =>
              setForm((p) => ({ ...p, cancellation_request_method: e.target.value }))
            }
            placeholder={tForms("cancelTelco.cancellationRequestMethod")}
          />
          <select
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.charge_after_cancellation}
            onChange={(e) =>
              setForm((p) => ({ ...p, charge_after_cancellation: e.target.value as any }))
            }
          >
            <option value="">{tForms("cancelTelco.chargingAfterCancellationQuestion")}</option>
            <option value="yes">{tForms("common.yes")}</option>
            <option value="no">{tForms("common.no")}</option>
          </select>
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.charged_amount_eur}
            onChange={(e) => setForm((p) => ({ ...p, charged_amount_eur: e.target.value }))}
            placeholder={tForms("cancelTelco.chargedAmountOptional")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.charged_date}
            onChange={(e) => setForm((p) => ({ ...p, charged_date: e.target.value }))}
            placeholder={tForms("cancelTelco.chargeDateOptional")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.payment_method}
            onChange={(e) => setForm((p) => ({ ...p, payment_method: e.target.value }))}
            placeholder={tForms("cancelTelco.paymentMethodOptional")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.desired_outcome}
            onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
            placeholder={tForms("cancelTelco.desiredOutcome")}
          />
        </div>

        <textarea
          className="mt-3 h-28 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.extra_details}
          onChange={(e) => setForm((p) => ({ ...p, extra_details: e.target.value }))}
          placeholder={tForms("common.placeholders.extraDetailsOptional")}
        />
      </div>

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

