"use client";

import { useTranslations } from "next-intl";

export type UnpaidWagesForm = {
  employee_full_name: string;
  employee_id: string;
  employee_address: string;

  employer_name: string;
  months_owed: string;
  total_amount_eur: string;
  contract_type: "indefinido" | "temporal" | "sin_contrato" | "";
  additional_details: string;
};

export const defaultUnpaidWagesForm: UnpaidWagesForm = {
  employee_full_name: "",
  employee_id: "",
  employee_address: "",
  employer_name: "",
  months_owed: "",
  total_amount_eur: "",
  contract_type: "",
  additional_details: "",
};

export function buildUnpaidWagesFacts(form: UnpaidWagesForm) {
  const lines: string[] = [];
  lines.push("Use case: unpaid wages / salary arrears (reclamación de cantidad).");

  if (form.employee_full_name) lines.push(`Employee full name: ${form.employee_full_name}`);
  if (form.employee_id) lines.push(`Employee ID (DNI/NIE/Passport): ${form.employee_id}`);
  if (form.employee_address) lines.push(`Employee address: ${form.employee_address}`);

  if (form.employer_name) lines.push(`Employer / company name: ${form.employer_name}`);
  if (form.months_owed) lines.push(`Months/periods owed: ${form.months_owed}`);
  if (form.total_amount_eur) lines.push(`Total amount owed (EUR): ${form.total_amount_eur}`);
  if (form.contract_type) lines.push(`Contract type: ${form.contract_type}`);
  if (form.additional_details) lines.push(`Additional details: ${form.additional_details}`);

  lines.push("");
  lines.push("Drafting instructions (legal context):");
  lines.push(
    "Context: formal labor claim (Reclamación de Cantidad) prior to judicial process and before SMAC conciliation.",
  );
  lines.push("Legal basis: Art. 29 Estatuto de los Trabajadores (timely payment of wages).");
  lines.push(
    "Critical: explicitly demand the 10% annual interest for delay (interés por mora) according to Art. 29.3 ET.",
  );
  lines.push(
    "Tone: very firm. Mention intention to file a 'Papeleta de Conciliación' at SMAC if not paid within 5 days.",
  );

  return lines.join("\n");
}

export function UnpaidWagesFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: UnpaidWagesForm;
  setForm: (updater: (prev: UnpaidWagesForm) => UnpaidWagesForm) => void;
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
            placeholder={tForms("unpaidWages.employerName")}
          />
          <input
            className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.months_owed}
            onChange={(e) => setForm((p) => ({ ...p, months_owed: e.target.value }))}
            placeholder={tForms("unpaidWages.monthsOwed")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.total_amount_eur}
            onChange={(e) => setForm((p) => ({ ...p, total_amount_eur: e.target.value }))}
            placeholder={tForms("unpaidWages.totalAmount")}
          />
          <select
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.contract_type}
            onChange={(e) => setForm((p) => ({ ...p, contract_type: e.target.value as any }))}
          >
            <option value="">{tForms("unpaidWages.contractTypeQuestion")}</option>
            <option value="indefinido">{tForms("unpaidWages.contractTypeOptions.indefinido")}</option>
            <option value="temporal">{tForms("unpaidWages.contractTypeOptions.temporal")}</option>
            <option value="sin_contrato">
              {tForms("unpaidWages.contractTypeOptions.sin_contrato")}
            </option>
          </select>
        </div>

        <textarea
          className="mt-3 h-28 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
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

