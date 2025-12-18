"use client";

import { useTranslations } from "next-intl";

export type TrafficFineAppealForm = {
  applicant_full_name: string;
  applicant_id: string;
  applicant_address: string;

  fine_reference: string;
  fine_date: string;
  fine_amount_eur: string;
  appeal_reason: "no_notification" | "not_driver" | "no_evidence" | "incorrect_data" | "";
  additional_details: string;
};

export const defaultTrafficFineAppealForm: TrafficFineAppealForm = {
  applicant_full_name: "",
  applicant_id: "",
  applicant_address: "",
  fine_reference: "",
  fine_date: "",
  fine_amount_eur: "",
  appeal_reason: "",
  additional_details: "",
};

export function buildTrafficFineAppealFacts(form: TrafficFineAppealForm) {
  const lines: string[] = [];
  lines.push("Use case: appeal a traffic fine (administrative appeal).");
  lines.push("Authority: DGT or Local Police (as applicable).");

  if (form.applicant_full_name) lines.push(`Applicant full name: ${form.applicant_full_name}`);
  if (form.applicant_id) lines.push(`Applicant ID (DNI/NIE/Passport): ${form.applicant_id}`);
  if (form.applicant_address) lines.push(`Applicant address: ${form.applicant_address}`);

  if (form.fine_reference) lines.push(`Fine reference / expediente number: ${form.fine_reference}`);
  if (form.fine_date) lines.push(`Notification date: ${form.fine_date}`);
  if (form.fine_amount_eur) lines.push(`Fine amount (EUR): ${form.fine_amount_eur}`);
  if (form.appeal_reason) lines.push(`Appeal reason: ${form.appeal_reason}`);
  if (form.additional_details) lines.push(`Additional details: ${form.additional_details}`);

  lines.push("");
  lines.push("Drafting instructions (legal context):");
  lines.push(
    "Context: Administrative appeal against a traffic fine (Recurso de Alzada / Reposición).",
  );
  lines.push("Tone: Formal administrative appeal.");
  lines.push("Legal strategy: cite 'Presunción de Inocencia' (Art. 24 Constitución Española).");

  if (form.appeal_reason === "no_evidence") {
    lines.push(
      "Specific: explicitly demand the 'Certificado de Verificación' of the Radar/Cinemometer and the original photo.",
    );
  }
  if (form.appeal_reason === "no_notification") {
    lines.push(
      "Specific: cite defect in notification procedure (Art. 40 Ley 39/2015) and request proof of notification attempts.",
    );
  }
  if (form.appeal_reason === "not_driver") {
    lines.push(
      "Specific: state that the applicant was not driving and request instructions to identify the actual driver; include driver identification if provided in details.",
    );
  }
  if (form.appeal_reason === "incorrect_data") {
    lines.push("Specific: highlight any license plate / personal data errors and request annulment.");
  }

  return lines.join("\n");
}

export function TrafficFineAppealFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: TrafficFineAppealForm;
  setForm: (updater: (prev: TrafficFineAppealForm) => TrafficFineAppealForm) => void;
  builtFacts: string;
}) {
  const tGen = useTranslations("generator");
  const tForms = useTranslations("forms");

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-[#DCE6FF] bg-[#F5F8FF] p-4 text-sm">
        <div className="font-medium">{tForms("sections.recipient")}</div>
        <div className="mt-2 text-[#475569]">
          {tForms("trafficFine.recipientLine")}
        </div>
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
            value={form.fine_reference}
            onChange={(e) => setForm((p) => ({ ...p, fine_reference: e.target.value }))}
            placeholder={tForms("trafficFine.fineReference")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.fine_date}
            onChange={(e) => setForm((p) => ({ ...p, fine_date: e.target.value }))}
            placeholder={tForms("trafficFine.fineDate")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.fine_amount_eur}
            onChange={(e) => setForm((p) => ({ ...p, fine_amount_eur: e.target.value }))}
            placeholder={tForms("trafficFine.fineAmount")}
          />
          <select
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.appeal_reason}
            onChange={(e) => setForm((p) => ({ ...p, appeal_reason: e.target.value as any }))}
          >
            <option value="">{tForms("trafficFine.appealReasonQuestion")}</option>
            <option value="no_notification">
              {tForms("trafficFine.appealReasonOptions.no_notification")}
            </option>
            <option value="not_driver">
              {tForms("trafficFine.appealReasonOptions.not_driver")}
            </option>
            <option value="no_evidence">
              {tForms("trafficFine.appealReasonOptions.no_evidence")}
            </option>
            <option value="incorrect_data">
              {tForms("trafficFine.appealReasonOptions.incorrect_data")}
            </option>
          </select>
        </div>

        <textarea
          className="mt-3 h-28 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.additional_details}
          onChange={(e) => setForm((p) => ({ ...p, additional_details: e.target.value }))}
          placeholder={tForms("trafficFine.additionalDetailsOptional")}
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

