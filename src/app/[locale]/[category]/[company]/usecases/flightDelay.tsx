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

  return (
    <div className="grid gap-4">
      <div className="text-sm font-medium">Passenger</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.passenger_full_name}
          onChange={(e) => setForm((p) => ({ ...p, passenger_full_name: e.target.value }))}
          placeholder="Full name"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.passenger_id}
          onChange={(e) => setForm((p) => ({ ...p, passenger_id: e.target.value }))}
          placeholder="DNI/NIE/Passport (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.passenger_address}
          onChange={(e) => setForm((p) => ({ ...p, passenger_address: e.target.value }))}
          placeholder="Address (optional)"
        />
      </div>

      <div className="text-sm font-medium">Flight</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.flight_number}
          onChange={(e) => setForm((p) => ({ ...p, flight_number: e.target.value }))}
          placeholder="Flight number (e.g., FR1234)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.booking_reference}
          onChange={(e) => setForm((p) => ({ ...p, booking_reference: e.target.value }))}
          placeholder="Booking reference / PNR (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.departure_airport}
          onChange={(e) => setForm((p) => ({ ...p, departure_airport: e.target.value }))}
          placeholder="Departure airport (e.g., MAD)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.arrival_airport}
          onChange={(e) => setForm((p) => ({ ...p, arrival_airport: e.target.value }))}
          placeholder="Arrival airport (e.g., BCN)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.scheduled_departure}
          onChange={(e) => setForm((p) => ({ ...p, scheduled_departure: e.target.value }))}
          placeholder="Scheduled departure (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.scheduled_arrival}
          onChange={(e) => setForm((p) => ({ ...p, scheduled_arrival: e.target.value }))}
          placeholder="Scheduled arrival (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.actual_arrival}
          onChange={(e) => setForm((p) => ({ ...p, actual_arrival: e.target.value }))}
          placeholder="Actual arrival (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.delay_hours}
          onChange={(e) => setForm((p) => ({ ...p, delay_hours: e.target.value }))}
          placeholder="Delay (hours) (optional)"
        />
        <input
          className="sm:col-span-2 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.delay_reason}
          onChange={(e) => setForm((p) => ({ ...p, delay_reason: e.target.value }))}
          placeholder="Delay reason (if known) (optional)"
        />
      </div>

      <div className="text-sm font-medium">Expenses (optional)</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.expenses_eur}
          onChange={(e) => setForm((p) => ({ ...p, expenses_eur: e.target.value }))}
          placeholder="Expenses EUR (optional)"
        />
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.iban}
          onChange={(e) => setForm((p) => ({ ...p, iban: e.target.value }))}
          placeholder="IBAN for compensation (optional)"
        />
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.expenses_description}
          onChange={(e) => setForm((p) => ({ ...p, expenses_description: e.target.value }))}
          placeholder="Expenses description (hotel, meals, transport) (optional)"
        />
      </div>

      <div className="text-sm font-medium">Communication + request</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <select
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_airline_before}
          onChange={(e) =>
            setForm((p) => ({ ...p, contacted_airline_before: e.target.value as any }))
          }
        >
          <option value="">Contacted airline before?</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <input
          className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.desired_outcome}
          onChange={(e) => setForm((p) => ({ ...p, desired_outcome: e.target.value }))}
          placeholder="Desired outcome (EU261 compensation + expenses) (optional)"
        />
        <textarea
          className="sm:col-span-2 h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
          value={form.contacted_details}
          onChange={(e) => setForm((p) => ({ ...p, contacted_details: e.target.value }))}
          placeholder="Previous communication details (optional)"
        />
      </div>

      <textarea
        className="h-24 w-full resize-y rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-black dark:focus:ring-zinc-50/10"
        value={form.extra_details}
        onChange={(e) => setForm((p) => ({ ...p, extra_details: e.target.value }))}
        placeholder="Extra details (optional)"
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

