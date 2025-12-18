"use client";

import { useTranslations } from "next-intl";

export type VoluntaryResignationForm = {
  employee_full_name: string;
  employee_id: string;
  employee_address: string;

  employer_name: string;
  last_day: string;
  notice_given: "15_days" | "per_contract" | "immediate" | "";
  request_settlement: "yes" | "no" | "";
  additional_details: string;
};

export const defaultVoluntaryResignationForm: VoluntaryResignationForm = {
  employee_full_name: "",
  employee_id: "",
  employee_address: "",
  employer_name: "",
  last_day: "",
  notice_given: "",
  request_settlement: "yes",
  additional_details: "",
};

export function buildVoluntaryResignationFacts(form: VoluntaryResignationForm) {
  const lines: string[] = [];
  lines.push("Use case: voluntary resignation letter (carta de dimisión).");

  if (form.employee_full_name) lines.push(`Employee full name: ${form.employee_full_name}`);
  if (form.employee_id) lines.push(`Employee ID (DNI/NIE/Passport): ${form.employee_id}`);
  if (form.employee_address) lines.push(`Employee address: ${form.employee_address}`);

  if (form.employer_name) lines.push(`Employer / company name: ${form.employer_name}`);
  if (form.last_day) lines.push(`Last working day (effective date): ${form.last_day}`);
  if (form.notice_given) lines.push(`Notice period provided: ${form.notice_given}`);
  if (form.request_settlement === "yes") lines.push("Request finiquito immediately: yes");
  if (form.request_settlement === "no") lines.push("Request finiquito immediately: no");
  if (form.additional_details) lines.push(`Additional details: ${form.additional_details}`);

  lines.push("");
  lines.push("Drafting instructions (legal context):");
  lines.push("Context: letter of voluntary resignation (Carta de Dimisión).");
  lines.push("Legal basis: Art. 49.1.d Estatuto de los Trabajadores.");
  lines.push(
    "Specific: explicitly request the preparation of the 'Finiquito' (final settlement) and 'Certificado de Empresa' for the last day.",
  );
  if (form.notice_given === "immediate") {
    lines.push(
      "Specific: phrase immediate resignation carefully and acknowledge potential deduction for missing notice days (if applicable).",
    );
  }

  return lines.join("\n");
}

export function VoluntaryResignationFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: VoluntaryResignationForm;
  setForm: (updater: (prev: VoluntaryResignationForm) => VoluntaryResignationForm) => void;
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
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.employee_full_name}
            onChange={(e) => setForm((p) => ({ ...p, employee_full_name: e.target.value }))}
            placeholder={tForms("common.placeholders.fullName")}
          />
          <input
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.employee_id}
            onChange={(e) => setForm((p) => ({ ...p, employee_id: e.target.value }))}
            placeholder={tForms("common.placeholders.id")}
          />
          <input
            className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
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
            className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.employer_name}
            onChange={(e) => setForm((p) => ({ ...p, employer_name: e.target.value }))}
            placeholder={tForms("voluntaryResignation.employerName")}
          />
          <input
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.last_day}
            onChange={(e) => setForm((p) => ({ ...p, last_day: e.target.value }))}
            placeholder={tForms("voluntaryResignation.lastDay")}
          />
          <select
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.notice_given}
            onChange={(e) => setForm((p) => ({ ...p, notice_given: e.target.value as any }))}
          >
            <option value="">{tForms("voluntaryResignation.noticeGivenQuestion")}</option>
            <option value="15_days">{tForms("voluntaryResignation.noticeGivenOptions.15_days")}</option>
            <option value="per_contract">
              {tForms("voluntaryResignation.noticeGivenOptions.per_contract")}
            </option>
            <option value="immediate">
              {tForms("voluntaryResignation.noticeGivenOptions.immediate")}
            </option>
          </select>
          <select
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.request_settlement}
            onChange={(e) => setForm((p) => ({ ...p, request_settlement: e.target.value as any }))}
          >
            <option value="">{tForms("voluntaryResignation.requestSettlementQuestion")}</option>
            <option value="yes">{tForms("common.yes")}</option>
            <option value="no">{tForms("common.no")}</option>
          </select>
        </div>

        <textarea
          className="mt-3 h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.additional_details}
          onChange={(e) => setForm((p) => ({ ...p, additional_details: e.target.value }))}
          placeholder={tForms("common.placeholders.extraDetailsOptional")}
        />
      </div>

      <details className="rounded-xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
        <summary className="cursor-pointer select-none font-medium">{tGen("debug.factsSent")}</summary>
        <pre className="mt-3 whitespace-pre-wrap text-xs text-zinc-600 dark:text-zinc-400">
          {builtFacts}
        </pre>
      </details>
    </div>
  );
}
