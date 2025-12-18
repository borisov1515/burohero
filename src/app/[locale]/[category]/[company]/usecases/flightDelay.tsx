"use client";

import { useTranslations } from "next-intl";

export type FlightDelayForm = {
  passenger_full_name: string;
  passenger_id: string;
  passenger_address: string;
  booking_reference: string;
  flight_number: string;
  departure_airport: string;
  arrival_airport: string;
  scheduled_departure: string;
  scheduled_arrival: string;
  actual_arrival: string;
  delay_hours: string;
  delay_reason: string;
  expenses_eur: string;
  expenses_description: string;
  contacted_airline_before: "yes" | "no" | "";
  contacted_details: string;
  desired_outcome: string;
  iban: string;
  extra_details: string;
};

export const defaultFlightDelayForm: FlightDelayForm = {
  passenger_full_name: "",
  passenger_id: "",
  passenger_address: "",
  booking_reference: "",
  flight_number: "",
  departure_airport: "",
  arrival_airport: "",
  scheduled_departure: "",
  scheduled_arrival: "",
  actual_arrival: "",
  delay_hours: "",
  delay_reason: "",
  expenses_eur: "",
  expenses_description: "",
  contacted_airline_before: "",
  contacted_details: "",
  desired_outcome: "",
  iban: "",
  extra_details: "",
};

export function buildFlightDelayFacts(form: FlightDelayForm, companySlug: string) {
  const lines: string[] = [];
  lines.push(`Use case: flight delay compensation claim (EU261/2004) (${companySlug}).`);
  if (form.passenger_full_name) lines.push(`Passenger full name: ${form.passenger_full_name}`);
  if (form.passenger_id) lines.push(`Passenger ID (DNI/NIE/Passport): ${form.passenger_id}`);
  if (form.passenger_address) lines.push(`Passenger address: ${form.passenger_address}`);
  if (form.booking_reference) lines.push(`Booking reference (PNR): ${form.booking_reference}`);
  if (form.flight_number) lines.push(`Flight number: ${form.flight_number}`);
  if (form.departure_airport) lines.push(`Departure airport: ${form.departure_airport}`);
  if (form.arrival_airport) lines.push(`Arrival airport: ${form.arrival_airport}`);
  if (form.scheduled_departure) lines.push(`Scheduled departure: ${form.scheduled_departure}`);
  if (form.scheduled_arrival) lines.push(`Scheduled arrival: ${form.scheduled_arrival}`);
  if (form.actual_arrival) lines.push(`Actual arrival: ${form.actual_arrival}`);
  if (form.delay_hours) lines.push(`Delay duration (hours): ${form.delay_hours}`);
  if (form.delay_reason) lines.push(`Delay reason (if known): ${form.delay_reason}`);
  if (form.expenses_eur) lines.push(`Expenses amount (EUR): ${form.expenses_eur}`);
  if (form.expenses_description) lines.push(`Expenses description: ${form.expenses_description}`);
  if (form.contacted_airline_before === "yes") lines.push("Contacted airline before: yes");
  if (form.contacted_airline_before === "no") lines.push("Contacted airline before: no");
  if (form.contacted_details) lines.push(`Previous communication: ${form.contacted_details}`);
  if (form.desired_outcome) lines.push(`Desired outcome: ${form.desired_outcome}`);
  if (form.iban) lines.push(`IBAN for payment: ${form.iban}`);
  if (form.extra_details) lines.push(`Additional details: ${form.extra_details}`);
  return lines.join("\\n");
}

export function FlightDelayFormSection({
  form,
  setForm,
  builtFacts,
}: {
  form: FlightDelayForm;
  setForm: (updater: (prev: FlightDelayForm) => FlightDelayForm) => void;
  builtFacts: string;
}) {
  const tGen = useTranslations("generator");
  const tForms = useTranslations("forms");

  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">{tForms("sections.passenger")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.passenger_full_name}
          onChange={(e) => setForm((p) => ({ ...p, passenger_full_name: e.target.value }))}
          placeholder={tForms("common.placeholders.fullName")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.passenger_id}
          onChange={(e) => setForm((p) => ({ ...p, passenger_id: e.target.value }))}
          placeholder={tForms("common.placeholders.idOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.passenger_address}
          onChange={(e) => setForm((p) => ({ ...p, passenger_address: e.target.value }))}
          placeholder={tForms("common.placeholders.addressOptional")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("sections.flight")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.flight_number}
          onChange={(e) => setForm((p) => ({ ...p, flight_number: e.target.value }))}
          placeholder={tForms("flightDelay.flightNumber")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.booking_reference}
          onChange={(e) => setForm((p) => ({ ...p, booking_reference: e.target.value }))}
          placeholder={tForms("flightDelay.bookingReferenceOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.departure_airport}
          onChange={(e) => setForm((p) => ({ ...p, departure_airport: e.target.value }))}
          placeholder={tForms("flightDelay.departureAirport")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.arrival_airport}
          onChange={(e) => setForm((p) => ({ ...p, arrival_airport: e.target.value }))}
          placeholder={tForms("flightDelay.arrivalAirport")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.scheduled_departure}
          onChange={(e) => setForm((p) => ({ ...p, scheduled_departure: e.target.value }))}
          placeholder={tForms("flightDelay.scheduledDepartureOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.scheduled_arrival}
          onChange={(e) => setForm((p) => ({ ...p, scheduled_arrival: e.target.value }))}
          placeholder={tForms("flightDelay.scheduledArrivalOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.actual_arrival}
          onChange={(e) => setForm((p) => ({ ...p, actual_arrival: e.target.value }))}
          placeholder={tForms("flightDelay.actualArrivalOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.delay_hours}
          onChange={(e) => setForm((p) => ({ ...p, delay_hours: e.target.value }))}
          placeholder={tForms("flightDelay.delayHoursOptional")}
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.delay_reason}
          onChange={(e) => setForm((p) => ({ ...p, delay_reason: e.target.value }))}
          placeholder={tForms("flightDelay.delayReasonOptional")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("sections.expensesOptional")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.expenses_eur}
          onChange={(e) => setForm((p) => ({ ...p, expenses_eur: e.target.value }))}
          placeholder={tForms("flightDelay.expensesEurOptional")}
        />
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.iban}
          onChange={(e) => setForm((p) => ({ ...p, iban: e.target.value }))}
          placeholder={tForms("flightDelay.ibanOptional")}
        />
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.expenses_description}
          onChange={(e) => setForm((p) => ({ ...p, expenses_description: e.target.value }))}
          placeholder={tForms("flightDelay.expensesDescriptionOptional")}
        />
      </div>

      <div className="text-sm font-medium">{tForms("sections.communicationRequest")}</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <select
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.contacted_airline_before}
          onChange={(e) =>
            setForm((p) => ({ ...p, contacted_airline_before: e.target.value as any }))
          }
        >
          <option value="">{tForms("flightDelay.contactedAirlineBefore")}</option>
          <option value="yes">{tForms("common.yes")}</option>
          <option value="no">{tForms("common.no")}</option>
        </select>
        <input
          className="h-11 w-full rounded-xl border border-[#DCE6FF] bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder={tForms("flightDelay.desiredOutcomeOptional")}
        />
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-[#DCE6FF] bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
          value={form.contacted_details}
          onChange={(e) => setForm((p) => ({ ...p, contacted_details: e.target.value }))}
          placeholder={tForms("common.placeholders.previousCommunicationOptional")}
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

