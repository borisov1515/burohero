"use client";

import { useTranslations } from "next-intl";

export type VacationRequestForm = {
  employee_full_name: string;
  employee_id: string;
  employee_address: string;

  employer_name: string;
  start_date: string;
  end_date: string;
  total_days: string;
  comments: string;
  additional_details: string;
};

export const defaultVacationRequestForm: VacationRequestForm = {
  employee_full_name: "",
  employee_id: "",
  employee_address: "",
  employer_name: "",
  start_date: "",
  end_date: "",
  total_days: "",
  comments: "",
  additional_details: "",
};

export function buildVacationRequestFacts(form: VacationRequestForm) {
  const lines: string[] = [];
  lines.push("Use case: formal vacation request (solicitud de vacaciones).");

  if (form.employee_full_name) lines.push(`Employee full name: ${form.employee_full_name}`);
  if (form.employee_id) lines.push(`Employee ID (DNI/NIE/Passport): ${form.employee_id}`);
  if (form.employee_address) lines.push(`Employee address: ${form.employee_address}`);

  if (form.employer_name) lines.push(`Employer / company name: ${form.employer_name}`);
  if (form.start_date) lines.push(`Vacation start date: ${form.start_date}`);
  if (form.end_date) lines.push(`Vacation end date: ${form.end_date}`);
  if (form.total_days) lines.push(`Total working days requested: ${form.total_days}`);
  if (form.comments) lines.push(`Comments: ${form.comments}`);
  if (form.additional_details) lines.push(`Additional details: ${form.additional_details}`);

  lines.push("");
  lines.push("Drafting instructions (legal context):");
  lines.push("Context: formal request for annual leave.");
  lines.push("Legal basis: Art. 38 Estatuto de los Trabajadores.");
  lines.push(
    "Goal: create a paper trail. Request a stamped copy or written confirmation to avoid 'abandonment of post' accusations.",
  );
  lines.push(
    "Mention that dates are requested with sufficient notice (usually at least 2 months prior when possible).",
  );

  return lines.join("\n");
}

export function VacationRequestFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: VacationRequestForm;
  setForm: (updater: (prev: VacationRequestForm) => VacationRequestForm) => void;
  builtFacts: string;
}) {
  const tGen = useTranslations("generator");
  const tForms = useTranslations("forms");

  return (
    <div className="grid gap-4">
      <div>
        <div className="text-sm font-medium">{tForms("work.sections.employee")}</div>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.employee_full_name}
            onChange={(e) => setForm((p) => ({ ...p, employee_full_name: e.target.value }))}
            placeholder={tForms("common.placeholders.fullName")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.employee_id}
            onChange={(e) => setForm((p) => ({ ...p, employee_id: e.target.value }))}
            placeholder={tForms("common.placeholders.id")}
          />
          <input
            className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.employee_address}
            onChange={(e) => setForm((p) => ({ ...p, employee_address: e.target.value }))}
            placeholder={tForms("common.placeholders.address")}
          />
        </div>
      </div>

      <div>
        <div className="text-sm font-medium">{tForms("work.sections.employer")}</div>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <input
            className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.employer_name}
            onChange={(e) => setForm((p) => ({ ...p, employer_name: e.target.value }))}
            placeholder={tForms("vacationRequest.employerName")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.start_date}
            onChange={(e) => setForm((p) => ({ ...p, start_date: e.target.value }))}
            placeholder={tForms("vacationRequest.startDate")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.end_date}
            onChange={(e) => setForm((p) => ({ ...p, end_date: e.target.value }))}
            placeholder={tForms("vacationRequest.endDate")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.total_days}
            onChange={(e) => setForm((p) => ({ ...p, total_days: e.target.value }))}
            placeholder={tForms("vacationRequest.totalDays")}
          />
        </div>

        <textarea
          className="mt-3 h-24 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.comments}
          onChange={(e) => setForm((p) => ({ ...p, comments: e.target.value }))}
          placeholder={tForms("vacationRequest.comments")}
        />
        <textarea
          className="mt-3 h-24 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.additional_details}
          onChange={(e) => setForm((p) => ({ ...p, additional_details: e.target.value }))}
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

