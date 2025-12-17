"use client";

import { useTranslations } from "next-intl";

export type FeesRefundForm = {
  customer_full_name: string;
  customer_id: string;
  customer_address: string;
  bank_name: string;
  account_iban: string;
  product_type: "account" | "card" | "mortgage" | "loan" | "other" | "";
  fee_type: "maintenance" | "card" | "overdraft" | "transfer" | "opening" | "other" | "";
  fee_amount_eur: string;
  fee_date: string;
  period_details: string;
  reason: string;
  contacted_before: "yes" | "no" | "";
  contacted_details: string;
  desired_outcome: string;
  refund_iban: string;
  extra_details: string;
};

export const defaultFeesRefundForm: FeesRefundForm = {
  customer_full_name: "",
  customer_id: "",
  customer_address: "",
  bank_name: "",
  account_iban: "",
  product_type: "",
  fee_type: "",
  fee_amount_eur: "",
  fee_date: "",
  period_details: "",
  reason: "",
  contacted_before: "",
  contacted_details: "",
  desired_outcome: "",
  refund_iban: "",
  extra_details: "",
};

export function buildFeesRefundFacts(form: FeesRefundForm, companySlug: string) {
  const lines: string[] = [];
  lines.push(`Use case: bank fees refund / return of commissions (${companySlug}).`);
  if (form.customer_full_name) lines.push(`Customer full name: ${form.customer_full_name}`);
  if (form.customer_id) lines.push(`Customer ID (DNI/NIE/Passport): ${form.customer_id}`);
  if (form.customer_address) lines.push(`Customer address: ${form.customer_address}`);
  if (form.bank_name) lines.push(`Bank name: ${form.bank_name}`);
  if (form.account_iban) lines.push(`Account IBAN: ${form.account_iban}`);
  if (form.product_type) lines.push(`Product type: ${form.product_type}`);
  if (form.fee_type) lines.push(`Fee type: ${form.fee_type}`);
  if (form.fee_amount_eur) lines.push(`Fee amount (EUR): ${form.fee_amount_eur}`);
  if (form.fee_date) lines.push(`Fee date: ${form.fee_date}`);
  if (form.period_details) lines.push(`Period / details: ${form.period_details}`);
  if (form.reason) lines.push(`Reason: ${form.reason}`);
  if (form.contacted_before === "yes") lines.push("Contacted bank before: yes");
  if (form.contacted_before === "no") lines.push("Contacted bank before: no");
  if (form.contacted_details) lines.push(`Previous communication: ${form.contacted_details}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.refund_iban) lines.push(`Refund IBAN: ${form.refund_iban}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\\n");
}

export function FeesRefundFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: FeesRefundForm;
  setForm: (updater: (prev: FeesRefundForm) => FeesRefundForm) => void;
  builtFacts: string;
}) {
  const tGen = useTranslations("generator");
  const tForms = useTranslations("forms");

  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">{tForms("sections.customer")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.customer_full_name}
          onChange={(e) => setForm((p) => ({ ...p, customer_full_name: e.target.value }))}
          placeholder={tForms("common.placeholders.fullName")}
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.customer_id}
          onChange={(e) => setForm((p) => ({ ...p, customer_id: e.target.value }))}
          placeholder={tForms("common.placeholders.idOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.customer_address}
          onChange={(e) => setForm((p) => ({ ...p, customer_address: e.target.value }))}
          placeholder={tForms("common.placeholders.addressOptional")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("sections.bankFee")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.bank_name}
          onChange={(e) => setForm((p) => ({ ...p, bank_name: e.target.value }))}
          placeholder={tForms("feesRefund.bankNameOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.account_iban}
          onChange={(e) => setForm((p) => ({ ...p, account_iban: e.target.value }))}
          placeholder={tForms("feesRefund.accountIbanOptional")}
        />
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.product_type}
          onChange={(e) => setForm((p) => ({ ...p, product_type: e.target.value as any }))}
        >
          <option value="">{tForms("feesRefund.productType.label")}</option>
          <option value="account">{tForms("feesRefund.productType.account")}</option>
          <option value="card">{tForms("feesRefund.productType.card")}</option>
          <option value="mortgage">{tForms("feesRefund.productType.mortgage")}</option>
          <option value="loan">{tForms("feesRefund.productType.loan")}</option>
          <option value="other">{tForms("feesRefund.productType.other")}</option>
        </select>
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.fee_type}
          onChange={(e) => setForm((p) => ({ ...p, fee_type: e.target.value as any }))}
        >
          <option value="">{tForms("feesRefund.feeType.label")}</option>
          <option value="maintenance">{tForms("feesRefund.feeType.maintenance")}</option>
          <option value="card">{tForms("feesRefund.feeType.cardFee")}</option>
          <option value="overdraft">{tForms("feesRefund.feeType.overdraft")}</option>
          <option value="transfer">{tForms("feesRefund.feeType.transfer")}</option>
          <option value="opening">{tForms("feesRefund.feeType.openingSetup")}</option>
          <option value="other">{tForms("feesRefund.feeType.other")}</option>
        </select>
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.fee_amount_eur}
          onChange={(e) => setForm((p) => ({ ...p, fee_amount_eur: e.target.value }))}
          placeholder={tForms("feesRefund.feeAmountOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.fee_date}
          onChange={(e) => setForm((p) => ({ ...p, fee_date: e.target.value }))}
          placeholder={tForms("feesRefund.feeDateOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.period_details}
          onChange={(e) => setForm((p) => ({ ...p, period_details: e.target.value }))}
          placeholder={tForms("feesRefund.periodDetailsOptional")}
        />
      </div>

      <textarea
        className="h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
        value={form.reason}
        onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
        placeholder={tForms("feesRefund.reasonOptional")}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_before}
          onChange={(e) => setForm((p) => ({ ...p, contacted_before: e.target.value as any }))}
        >
          <option value="">{tForms("feesRefund.contactedBankBefore")}</option>
          <option value="yes">{tForms("common.yes")}</option>
          <option value="no">{tForms("common.no")}</option>
        </select>
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.refund_iban}
          onChange={(e) => setForm((p) => ({ ...p, refund_iban: e.target.value }))}
          placeholder={tForms("common.placeholders.refundIbanOptional")}
        />
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_details}
          onChange={(e) => setForm((p) => ({ ...p, contacted_details: e.target.value }))}
          placeholder={tForms("common.placeholders.previousCommunicationOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder={tForms("feesRefund.desiredOutcome")}
        />
      </div>

      <textarea
        className="h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
        value={form.extra_details}
        onChange={(e) => setForm((p) => ({ ...p, extra_details: e.target.value }))}
        placeholder={tForms("common.placeholders.extraDetailsOptional")}
      />

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

