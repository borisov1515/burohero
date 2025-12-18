"use client";

import { useTranslations } from "next-intl";

export type BillComplaintForm = {
  customer_full_name: string;
  customer_id: string;
  customer_address: string;
  contract_or_account_number: string;
  invoice_number: string;
  billing_period: string;
  invoice_date: string;
  amount_eur: string;
  issue_type: "overcharge" | "wrong_reading" | "duplicate" | "service_not_provided" | "other" | "";
  issue_description: string;
  contacted_before: "yes" | "no" | "";
  contacted_before_details: string;
  payment_status: "paid" | "unpaid" | "partially_paid" | "";
  desired_outcome: string;
  refund_iban: string;
  extra_details: string;
};

export const defaultBillComplaintForm: BillComplaintForm = {
  customer_full_name: "",
  customer_id: "",
  customer_address: "",
  contract_or_account_number: "",
  invoice_number: "",
  billing_period: "",
  invoice_date: "",
  amount_eur: "",
  issue_type: "",
  issue_description: "",
  contacted_before: "",
  contacted_before_details: "",
  payment_status: "",
  desired_outcome: "",
  refund_iban: "",
  extra_details: "",
};

export function buildBillComplaintFacts(form: BillComplaintForm, companySlug: string) {
  const lines: string[] = [];
  lines.push(`Use case: bill dispute / invoice complaint (${companySlug}).`);
  if (form.customer_full_name) lines.push(`Customer full name: ${form.customer_full_name}`);
  if (form.customer_id) lines.push(`Customer ID (DNI/NIE/Passport): ${form.customer_id}`);
  if (form.customer_address) lines.push(`Customer address: ${form.customer_address}`);
  if (form.contract_or_account_number)
    lines.push(`Contract/account number: ${form.contract_or_account_number}`);
  if (form.invoice_number) lines.push(`Invoice number: ${form.invoice_number}`);
  if (form.invoice_date) lines.push(`Invoice date: ${form.invoice_date}`);
  if (form.billing_period) lines.push(`Billing period: ${form.billing_period}`);
  if (form.amount_eur) lines.push(`Invoice amount (EUR): ${form.amount_eur}`);
  if (form.payment_status) lines.push(`Payment status: ${form.payment_status}`);
  if (form.issue_type) lines.push(`Issue type: ${form.issue_type}`);
  if (form.issue_description) lines.push(`Issue description: ${form.issue_description}`);
  if (form.contacted_before === "yes") lines.push("Contacted provider before: yes");
  if (form.contacted_before === "no") lines.push("Contacted provider before: no");
  if (form.contacted_before_details)
    lines.push(`Previous communication: ${form.contacted_before_details}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.refund_iban) lines.push(`Refund IBAN: ${form.refund_iban}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\n");
}

export function BillComplaintFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: BillComplaintForm;
  setForm: (updater: (prev: BillComplaintForm) => BillComplaintForm) => void;
  builtFacts: string;
}) {
  const tGen = useTranslations("generator");
  const tForms = useTranslations("forms");

  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">{tForms("sections.customer")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.customer_full_name}
          onChange={(e) => setForm((p) => ({ ...p, customer_full_name: e.target.value }))}
          placeholder={tForms("common.placeholders.fullName")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.customer_id}
          onChange={(e) => setForm((p) => ({ ...p, customer_id: e.target.value }))}
          placeholder={tForms("common.placeholders.idOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.customer_address}
          onChange={(e) => setForm((p) => ({ ...p, customer_address: e.target.value }))}
          placeholder={tForms("common.placeholders.addressOptional")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("sections.invoice")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.contract_or_account_number}
          onChange={(e) =>
            setForm((p) => ({ ...p, contract_or_account_number: e.target.value }))
          }
          placeholder={tForms("billComplaint.contractOrAccountNumberOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.invoice_number}
          onChange={(e) => setForm((p) => ({ ...p, invoice_number: e.target.value }))}
          placeholder={tForms("billComplaint.invoiceNumberOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.invoice_date}
          onChange={(e) => setForm((p) => ({ ...p, invoice_date: e.target.value }))}
          placeholder={tForms("billComplaint.invoiceDateOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.billing_period}
          onChange={(e) => setForm((p) => ({ ...p, billing_period: e.target.value }))}
          placeholder={tForms("billComplaint.billingPeriodOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.amount_eur}
          onChange={(e) => setForm((p) => ({ ...p, amount_eur: e.target.value }))}
          placeholder={tForms("billComplaint.amountOptional")}
        />
        <select
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.payment_status}
          onChange={(e) => setForm((p) => ({ ...p, payment_status: e.target.value as any }))}
        >
          <option value="">{tForms("billComplaint.paymentStatus.label")}</option>
          <option value="paid">{tForms("billComplaint.paymentStatus.paid")}</option>
          <option value="unpaid">{tForms("billComplaint.paymentStatus.unpaid")}</option>
          <option value="partially_paid">{tForms("billComplaint.paymentStatus.partiallyPaid")}</option>
        </select>
      </div>

      <div className="text-sm font-medium">{tForms("sections.issue")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <select
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.issue_type}
          onChange={(e) => setForm((p) => ({ ...p, issue_type: e.target.value as any }))}
        >
          <option value="">{tForms("billComplaint.issueType.label")}</option>
          <option value="overcharge">{tForms("billComplaint.issueType.overcharge")}</option>
          <option value="wrong_reading">{tForms("billComplaint.issueType.wrongReading")}</option>
          <option value="duplicate">{tForms("billComplaint.issueType.duplicate")}</option>
          <option value="service_not_provided">{tForms("billComplaint.issueType.serviceNotProvided")}</option>
          <option value="other">{tForms("billComplaint.issueType.other")}</option>
        </select>
        <select
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.contacted_before}
          onChange={(e) => setForm((p) => ({ ...p, contacted_before: e.target.value as any }))}
        >
          <option value="">{tForms("billComplaint.contactedProviderBefore")}</option>
          <option value="yes">{tForms("common.yes")}</option>
          <option value="no">{tForms("common.no")}</option>
        </select>
        <textarea
          className="sm:col-span-2 h-28 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.issue_description}
          onChange={(e) => setForm((p) => ({ ...p, issue_description: e.target.value }))}
          placeholder={tForms("billComplaint.issueDescription")}
        />
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.contacted_before_details}
          onChange={(e) => setForm((p) => ({ ...p, contacted_before_details: e.target.value }))}
          placeholder={tForms("common.placeholders.previousCommunicationOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder={tForms("billComplaint.desiredOutcome")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.refund_iban}
          onChange={(e) => setForm((p) => ({ ...p, refund_iban: e.target.value }))}
          placeholder={tForms("common.placeholders.refundIbanOptional")}
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

