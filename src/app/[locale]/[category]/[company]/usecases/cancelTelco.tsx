"use client";

import { getCompanyBySlug, type Company } from "@/lib/companies";
import { useMemo } from "react";

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

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-black">
        <div className="font-medium">Recipient</div>
        {recipient ? (
          <div className="mt-2 grid gap-1 text-zinc-700 dark:text-zinc-300">
            <div>{recipient.name}</div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400">CIF:</span>{" "}
              <span className="font-mono">{recipient.cif}</span>
            </div>
            <div>{recipient.address}</div>
          </div>
        ) : (
          <div className="mt-2 text-zinc-600 dark:text-zinc-400">
            Unknown company slug: <span className="font-mono">{company}</span>
          </div>
        )}
      </div>

      <div>
        <div className="text-sm font-medium">Applicant</div>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <input
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.applicant_full_name}
            onChange={(e) => setForm((p) => ({ ...p, applicant_full_name: e.target.value }))}
            placeholder="Full name"
          />
          <input
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.applicant_id}
            onChange={(e) => setForm((p) => ({ ...p, applicant_id: e.target.value }))}
            placeholder="DNI/NIE/Passport"
          />
          <input
            className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.applicant_address}
            onChange={(e) => setForm((p) => ({ ...p, applicant_address: e.target.value }))}
            placeholder="Address"
          />
        </div>
      </div>

      <div>
        <div className="text-sm font-medium">Case details</div>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <input
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.contract_number}
            onChange={(e) => setForm((p) => ({ ...p, contract_number: e.target.value }))}
            placeholder="Contract number (optional)"
          />
          <input
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.cancellation_request_date}
            onChange={(e) =>
              setForm((p) => ({ ...p, cancellation_request_date: e.target.value }))
            }
            placeholder="Cancellation request date (YYYY-MM-DD)"
          />
          <input
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.cancellation_request_method}
            onChange={(e) =>
              setForm((p) => ({ ...p, cancellation_request_method: e.target.value }))
            }
            placeholder="How did you request cancellation? (call/email/web)"
          />
          <select
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.charge_after_cancellation}
            onChange={(e) =>
              setForm((p) => ({ ...p, charge_after_cancellation: e.target.value as any }))
            }
          >
            <option value="">Charging after cancellation?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <input
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.charged_amount_eur}
            onChange={(e) => setForm((p) => ({ ...p, charged_amount_eur: e.target.value }))}
            placeholder="Charged amount EUR (optional)"
          />
          <input
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.charged_date}
            onChange={(e) => setForm((p) => ({ ...p, charged_date: e.target.value }))}
            placeholder="Charge date (optional)"
          />
          <input
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.payment_method}
            onChange={(e) => setForm((p) => ({ ...p, payment_method: e.target.value }))}
            placeholder="Payment method (card/IBAN) (optional)"
          />
          <input
            className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
            value={form.desired_outcome}
            onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
            placeholder="What do you want? (refund, confirmation, etc.)"
          />
        </div>

        <textarea
          className="mt-3 h-28 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.extra_details}
          onChange={(e) => setForm((p) => ({ ...p, extra_details: e.target.value }))}
          placeholder="Extra details (optional)"
        />
      </div>

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

