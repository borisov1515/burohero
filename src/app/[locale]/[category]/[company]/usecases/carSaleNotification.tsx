"use client";

import { useTranslations } from "next-intl";

export type CarSaleNotificationForm = {
  seller_full_name: string;
  seller_id: string;
  seller_address: string;

  plate_number: string;
  buyer_name: string;
  buyer_id: string;
  sale_date: string;
  additional_details: string;
};

export const defaultCarSaleNotificationForm: CarSaleNotificationForm = {
  seller_full_name: "",
  seller_id: "",
  seller_address: "",
  plate_number: "",
  buyer_name: "",
  buyer_id: "",
  sale_date: "",
  additional_details: "",
};

export function buildCarSaleNotificationFacts(form: CarSaleNotificationForm) {
  const lines: string[] = [];
  lines.push("Use case: notify DGT about vehicle sale (notificación de venta).");
  lines.push("Recipient: DGT (Dirección General de Tráfico).");

  if (form.seller_full_name) lines.push(`Seller full name: ${form.seller_full_name}`);
  if (form.seller_id) lines.push(`Seller ID (DNI/NIE/Passport): ${form.seller_id}`);
  if (form.seller_address) lines.push(`Seller address: ${form.seller_address}`);

  if (form.plate_number) lines.push(`Vehicle license plate (matrícula): ${form.plate_number}`);
  if (form.buyer_name) lines.push(`Buyer full name: ${form.buyer_name}`);
  if (form.buyer_id) lines.push(`Buyer DNI/NIE/CIF: ${form.buyer_id}`);
  if (form.sale_date) lines.push(`Date of sale / contract date: ${form.sale_date}`);
  if (form.additional_details) lines.push(`Additional details: ${form.additional_details}`);

  lines.push("");
  lines.push("Drafting instructions (legal context):");
  lines.push("Context: communication to DGT regarding vehicle transfer.");
  lines.push("Legal basis: Art. 32 Reglamento General de Vehículos.");
  lines.push(
    "Goal: formally communicate the vehicle is no longer in seller's possession to limit liability (IVTM/fines) from the sale date.",
  );

  return lines.join("\n");
}

export function CarSaleNotificationFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: CarSaleNotificationForm;
  setForm: (updater: (prev: CarSaleNotificationForm) => CarSaleNotificationForm) => void;
  builtFacts: string;
}) {
  const tGen = useTranslations("generator");
  const tForms = useTranslations("forms");

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-[#DCE6FF] bg-[#F5F8FF] p-4 text-sm">
        <div className="font-medium">{tForms("sections.recipient")}</div>
        <div className="mt-2 text-[#475569]">
          {tForms("carSale.recipientLine")}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium">{tForms("carSale.sections.seller")}</div>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.seller_full_name}
            onChange={(e) => setForm((p) => ({ ...p, seller_full_name: e.target.value }))}
            placeholder={tForms("common.placeholders.fullName")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.seller_id}
            onChange={(e) => setForm((p) => ({ ...p, seller_id: e.target.value }))}
            placeholder={tForms("common.placeholders.id")}
          />
          <input
            className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.seller_address}
            onChange={(e) => setForm((p) => ({ ...p, seller_address: e.target.value }))}
            placeholder={tForms("common.placeholders.address")}
          />
        </div>
      </div>

      <div>
        <div className="text-sm font-medium">{tForms("sections.caseDetails")}</div>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.plate_number}
            onChange={(e) => setForm((p) => ({ ...p, plate_number: e.target.value }))}
            placeholder={tForms("carSale.plateNumber")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.sale_date}
            onChange={(e) => setForm((p) => ({ ...p, sale_date: e.target.value }))}
            placeholder={tForms("carSale.saleDate")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.buyer_name}
            onChange={(e) => setForm((p) => ({ ...p, buyer_name: e.target.value }))}
            placeholder={tForms("carSale.buyerName")}
          />
          <input
            className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
            value={form.buyer_id}
            onChange={(e) => setForm((p) => ({ ...p, buyer_id: e.target.value }))}
            placeholder={tForms("carSale.buyerId")}
          />
        </div>

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

