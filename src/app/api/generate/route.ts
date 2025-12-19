import { NextResponse } from "next/server";
import { z } from "zod";
import { generateDualLanguageLegalText } from "@/lib/deepseek";
import { getCompanyBySlug } from "@/lib/companies";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { parsePseoCompany } from "@/lib/pseoSlug";

const RATE_LIMIT_PER_HOUR = Number(process.env.RATE_LIMIT_PER_HOUR ?? "5");
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const rateLimitBucket: Map<string, number[]> = new Map();

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(req: Request) {
  if (!Number.isFinite(RATE_LIMIT_PER_HOUR) || RATE_LIMIT_PER_HOUR <= 0) return;
  const ip = getClientIp(req);
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const list = rateLimitBucket.get(ip) ?? [];
  const recent = list.filter((t) => t >= windowStart);
  if (recent.length >= RATE_LIMIT_PER_HOUR) {
    throw new Error("RATE_LIMIT_EXCEEDED");
  }
  recent.push(now);
  rateLimitBucket.set(ip, recent);
}

const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const yesNoToBoolean = (v: unknown) => {
  if (v === true || v === false) return v;
  if (typeof v !== "string") return undefined;
  const s = v.trim().toLowerCase();
  if (s === "yes") return true;
  if (s === "no") return false;
  return undefined;
};

const CancelTelcoFormSchema = z.object({
  applicant_full_name: z.preprocess(
    emptyToUndefined,
    z.string().min(2).optional(),
  ),
  applicant_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  applicant_address: z.preprocess(
    emptyToUndefined,
    z.string().min(5).optional(),
  ),

  contract_number: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  cancellation_request_date: z.preprocess(
    emptyToUndefined,
    z.string().min(4).optional(),
  ), // free-form / date string
  cancellation_request_method: z.preprocess(
    emptyToUndefined,
    z.string().min(2).optional(),
  ),

  charge_after_cancellation: z.preprocess(yesNoToBoolean, z.boolean().optional()),
  charged_amount_eur: z.preprocess(
    emptyToUndefined,
    z.string().min(1).optional(),
  ),
  charged_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  payment_method: z.preprocess(emptyToUndefined, z.string().min(2).optional()),

  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const DepositReturnFormSchema = z.object({
  tenant_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  tenant_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  tenant_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),

  landlord_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  landlord_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  landlord_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),

  property_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  lease_start_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  lease_end_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),

  deposit_amount_eur: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  move_out_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  keys_returned_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),

  requested_before: z.preprocess(yesNoToBoolean, z.boolean().optional()),
  requested_before_details: z.preprocess(emptyToUndefined, z.string().optional()),

  refund_iban: z.preprocess(emptyToUndefined, z.string().optional()),
  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const Return14FormSchema = z.object({
  buyer_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  buyer_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  buyer_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),

  seller_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  seller_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),

  order_number: z.preprocess(emptyToUndefined, z.string().optional()),
  product_description: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  purchase_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  delivery_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  return_request_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),

  paid_amount_eur: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  payment_method: z.preprocess(emptyToUndefined, z.string().optional()),
  refund_iban: z.preprocess(emptyToUndefined, z.string().optional()),

  contacted_support_before: z.preprocess(yesNoToBoolean, z.boolean().optional()),
  contacted_support_details: z.preprocess(emptyToUndefined, z.string().optional()),

  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const RepairDemandFormSchema = z.object({
  tenant_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  tenant_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  tenant_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  landlord_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  landlord_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  property_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  issue_description: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  issue_first_notice_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  urgency: z.preprocess(emptyToUndefined, z.string().optional()),
  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const LeaseTerminationFormSchema = z.object({
  tenant_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  tenant_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  tenant_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  landlord_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  landlord_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  property_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  lease_start_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  planned_termination_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  notice_sent_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  notice_method: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  termination_reason: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const BillComplaintFormSchema = z.object({
  customer_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  customer_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  customer_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  contract_or_account_number: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  invoice_number: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  billing_period: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  invoice_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  amount_eur: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  issue_type: z.preprocess(emptyToUndefined, z.string().optional()),
  issue_description: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  contacted_before: z.preprocess(emptyToUndefined, z.string().optional()),
  contacted_before_details: z.preprocess(emptyToUndefined, z.string().optional()),
  payment_status: z.preprocess(emptyToUndefined, z.string().optional()),
  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  refund_iban: z.preprocess(emptyToUndefined, z.string().optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const Warranty3yFormSchema = z.object({
  buyer_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  buyer_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  buyer_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  seller_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  seller_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  order_or_invoice_number: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  product_description: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  purchase_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  delivery_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  defect_description: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  defect_discovered_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  contacted_support_before: z.preprocess(emptyToUndefined, z.string().optional()),
  contacted_support_details: z.preprocess(emptyToUndefined, z.string().optional()),
  requested_solution: z.preprocess(emptyToUndefined, z.string().optional()),
  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const NonDeliveryFormSchema = z.object({
  buyer_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  buyer_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  buyer_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  seller_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  order_number: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  product_description: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  purchase_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  promised_delivery_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  tracking_number: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  carrier_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  delivery_status: z.preprocess(emptyToUndefined, z.string().optional()),
  contacted_seller_before: z.preprocess(emptyToUndefined, z.string().optional()),
  contacted_details: z.preprocess(emptyToUndefined, z.string().optional()),
  paid_amount_eur: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  payment_method: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  desired_outcome: z.preprocess(emptyToUndefined, z.string().optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const FlightDelayFormSchema = z.object({
  passenger_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  passenger_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  passenger_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  booking_reference: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  flight_number: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  departure_airport: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  arrival_airport: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  scheduled_departure: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  scheduled_arrival: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  actual_arrival: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  delay_hours: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  delay_reason: z.preprocess(emptyToUndefined, z.string().optional()),
  expenses_eur: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  expenses_description: z.preprocess(emptyToUndefined, z.string().optional()),
  contacted_airline_before: z.preprocess(emptyToUndefined, z.string().optional()),
  contacted_details: z.preprocess(emptyToUndefined, z.string().optional()),
  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  iban: z.preprocess(emptyToUndefined, z.string().optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const InsuranceCancelFormSchema = z.object({
  policyholder_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  policyholder_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  policyholder_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  insurer_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  policy_number: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  insurance_type: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  contract_start_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  renewal_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  cancellation_request_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  cancellation_method: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  reason: z.preprocess(emptyToUndefined, z.string().optional()),
  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  iban: z.preprocess(emptyToUndefined, z.string().optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const ClaimDeniedFormSchema = z.object({
  policyholder_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  policyholder_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  policyholder_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  insurer_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  policy_number: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  claim_number: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  incident_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  incident_description: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  claimed_amount_eur: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  denial_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  denial_reason: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  contacted_before: z.preprocess(emptyToUndefined, z.string().optional()),
  contacted_details: z.preprocess(emptyToUndefined, z.string().optional()),
  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  iban: z.preprocess(emptyToUndefined, z.string().optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const FeesRefundFormSchema = z.object({
  customer_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  customer_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  customer_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),
  bank_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  account_iban: z.preprocess(emptyToUndefined, z.string().optional()),
  product_type: z.preprocess(emptyToUndefined, z.string().optional()),
  fee_type: z.preprocess(emptyToUndefined, z.string().optional()),
  fee_amount_eur: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  fee_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  period_details: z.preprocess(emptyToUndefined, z.string().optional()),
  reason: z.preprocess(emptyToUndefined, z.string().optional()),
  contacted_before: z.preprocess(emptyToUndefined, z.string().optional()),
  contacted_details: z.preprocess(emptyToUndefined, z.string().optional()),
  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  refund_iban: z.preprocess(emptyToUndefined, z.string().optional()),
  extra_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const TrafficFineAppealFormSchema = z.object({
  applicant_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  applicant_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  applicant_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),

  fine_reference: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  fine_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  fine_amount_eur: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  appeal_reason: z.preprocess(
    emptyToUndefined,
    z
      .enum(["no_notification", "not_driver", "no_evidence", "incorrect_data"])
      .optional(),
  ),
  additional_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const CarSaleNotificationFormSchema = z.object({
  seller_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  seller_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  seller_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),

  plate_number: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  buyer_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  buyer_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  sale_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  additional_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const UnpaidWagesFormSchema = z.object({
  employee_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  employee_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  employee_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),

  employer_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  months_owed: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  total_amount_eur: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  contract_type: z.preprocess(
    emptyToUndefined,
    z.enum(["indefinido", "temporal", "sin_contrato"]).optional(),
  ),
  additional_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const VoluntaryResignationFormSchema = z.object({
  employee_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  employee_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  employee_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),

  employer_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  last_day: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  notice_given: z.preprocess(
    emptyToUndefined,
    z.enum(["15_days", "per_contract", "immediate"]).optional(),
  ),
  request_settlement: z.preprocess(yesNoToBoolean, z.boolean().optional()),
  additional_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

const VacationRequestFormSchema = z.object({
  employee_full_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  employee_id: z.preprocess(emptyToUndefined, z.string().min(3).optional()),
  employee_address: z.preprocess(emptyToUndefined, z.string().min(5).optional()),

  employer_name: z.preprocess(emptyToUndefined, z.string().min(2).optional()),
  start_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  end_date: z.preprocess(emptyToUndefined, z.string().min(4).optional()),
  total_days: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
  comments: z.preprocess(emptyToUndefined, z.string().optional()),
  additional_details: z.preprocess(emptyToUndefined, z.string().optional()),
});

function buildCancelTelcoFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof CancelTelcoFormSchema>;
}) {
  const f = input.form;
  const recipient = getCompanyBySlug(input.company);
  const lines: string[] = [];
  lines.push(`Use case: cancel telecom contract (${input.company}).`);
  if (recipient) {
    lines.push(`Recipient (company): ${recipient.name}`);
    lines.push(`Recipient CIF: ${recipient.cif}`);
    lines.push(`Recipient address: ${recipient.address}`);
  }
  if (f.applicant_full_name) lines.push(`Applicant full name: ${f.applicant_full_name}`);
  if (f.applicant_id) lines.push(`Applicant ID (DNI/NIE/Passport): ${f.applicant_id}`);
  if (f.applicant_address) lines.push(`Applicant address: ${f.applicant_address}`);
  if (f.contract_number) lines.push(`Contract number: ${f.contract_number}`);
  if (f.cancellation_request_date) lines.push(`Cancellation requested on: ${f.cancellation_request_date}`);
  if (f.cancellation_request_method) lines.push(`Cancellation request method: ${f.cancellation_request_method}`);
  if (f.charge_after_cancellation === true) lines.push(`Provider continued charging after cancellation: yes`);
  if (f.charge_after_cancellation === false) lines.push(`Provider continued charging after cancellation: no`);
  if (f.charged_amount_eur) lines.push(`Charged amount (EUR): ${f.charged_amount_eur}`);
  if (f.charged_date) lines.push(`Charge date: ${f.charged_date}`);
  if (f.payment_method) lines.push(`Payment method: ${f.payment_method}`);
  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);
  return lines.join("\n");
}

function buildDepositReturnFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof DepositReturnFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push("Use case: housing deposit return (fianza).");
  if (f.tenant_full_name) lines.push(`Tenant full name: ${f.tenant_full_name}`);
  if (f.tenant_id) lines.push(`Tenant ID (DNI/NIE/Passport): ${f.tenant_id}`);
  if (f.tenant_address) lines.push(`Tenant address: ${f.tenant_address}`);

  if (f.landlord_full_name) lines.push(`Landlord full name: ${f.landlord_full_name}`);
  if (f.landlord_id) lines.push(`Landlord ID: ${f.landlord_id}`);
  if (f.landlord_address) lines.push(`Landlord address: ${f.landlord_address}`);

  if (f.property_address) lines.push(`Rented property address: ${f.property_address}`);
  if (f.lease_start_date) lines.push(`Lease start date: ${f.lease_start_date}`);
  if (f.lease_end_date) lines.push(`Lease end date: ${f.lease_end_date}`);

  if (f.deposit_amount_eur) lines.push(`Deposit amount (EUR): ${f.deposit_amount_eur}`);
  if (f.move_out_date) lines.push(`Move-out date: ${f.move_out_date}`);
  if (f.keys_returned_date) lines.push(`Keys returned date: ${f.keys_returned_date}`);

  if (f.requested_before === true) lines.push("Deposit return already requested before: yes");
  if (f.requested_before === false) lines.push("Deposit return already requested before: no");
  if (f.requested_before_details) lines.push(`Previous requests: ${f.requested_before_details}`);

  if (f.refund_iban) lines.push(`Refund IBAN: ${f.refund_iban}`);
  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);

  return lines.join("\n");
}

function buildReturn14Facts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof Return14FormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push("Use case: consumer purchase return within 14 days (derecho de desistimiento).");
  if (f.buyer_full_name) lines.push(`Buyer full name: ${f.buyer_full_name}`);
  if (f.buyer_id) lines.push(`Buyer ID (DNI/NIE/Passport): ${f.buyer_id}`);
  if (f.buyer_address) lines.push(`Buyer address: ${f.buyer_address}`);

  if (f.seller_name) lines.push(`Seller/merchant name: ${f.seller_name}`);
  if (f.seller_address) lines.push(`Seller/merchant address: ${f.seller_address}`);

  if (f.order_number) lines.push(`Order / invoice number: ${f.order_number}`);
  if (f.product_description) lines.push(`Product: ${f.product_description}`);
  if (f.purchase_date) lines.push(`Purchase date: ${f.purchase_date}`);
  if (f.delivery_date) lines.push(`Delivery date: ${f.delivery_date}`);
  if (f.return_request_date) lines.push(`Return request date: ${f.return_request_date}`);

  if (f.paid_amount_eur) lines.push(`Paid amount (EUR): ${f.paid_amount_eur}`);
  if (f.payment_method) lines.push(`Payment method: ${f.payment_method}`);
  if (f.refund_iban) lines.push(`Refund IBAN: ${f.refund_iban}`);

  if (f.contacted_support_before === true) lines.push("Contacted support before: yes");
  if (f.contacted_support_before === false) lines.push("Contacted support before: no");
  if (f.contacted_support_details) lines.push(`Support contact details: ${f.contacted_support_details}`);

  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);
  return lines.join("\n");
}

function buildRepairDemandFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof RepairDemandFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push("Use case: housing repair demand (requerimiento de reparación).");
  if (f.tenant_full_name) lines.push(`Tenant full name: ${f.tenant_full_name}`);
  if (f.tenant_id) lines.push(`Tenant ID (DNI/NIE/Passport): ${f.tenant_id}`);
  if (f.tenant_address) lines.push(`Tenant address: ${f.tenant_address}`);
  if (f.landlord_full_name) lines.push(`Landlord full name: ${f.landlord_full_name}`);
  if (f.landlord_address) lines.push(`Landlord address: ${f.landlord_address}`);
  if (f.property_address) lines.push(`Rented property address: ${f.property_address}`);
  if (f.issue_description) lines.push(`Issue description: ${f.issue_description}`);
  if (f.issue_first_notice_date) lines.push(`Issue first reported on: ${f.issue_first_notice_date}`);
  if (f.urgency) lines.push(`Urgency: ${f.urgency}`);
  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);
  return lines.join("\n");
}

function buildLeaseTerminationFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof LeaseTerminationFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push("Use case: housing lease termination (resolución / rescisión del contrato).");
  if (f.tenant_full_name) lines.push(`Tenant full name: ${f.tenant_full_name}`);
  if (f.tenant_id) lines.push(`Tenant ID (DNI/NIE/Passport): ${f.tenant_id}`);
  if (f.tenant_address) lines.push(`Tenant address: ${f.tenant_address}`);
  if (f.landlord_full_name) lines.push(`Landlord full name: ${f.landlord_full_name}`);
  if (f.landlord_address) lines.push(`Landlord address: ${f.landlord_address}`);
  if (f.property_address) lines.push(`Rented property address: ${f.property_address}`);
  if (f.lease_start_date) lines.push(`Lease start date: ${f.lease_start_date}`);
  if (f.planned_termination_date) lines.push(`Planned termination date: ${f.planned_termination_date}`);
  if (f.notice_sent_date) lines.push(`Notice sent date: ${f.notice_sent_date}`);
  if (f.notice_method) lines.push(`Notice method: ${f.notice_method}`);
  if (f.termination_reason) lines.push(`Termination reason: ${f.termination_reason}`);
  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);
  return lines.join("\n");
}

function buildBillComplaintFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof BillComplaintFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push(`Use case: bill dispute / invoice complaint (${input.company}).`);
  if (f.customer_full_name) lines.push(`Customer full name: ${f.customer_full_name}`);
  if (f.customer_id) lines.push(`Customer ID (DNI/NIE/Passport): ${f.customer_id}`);
  if (f.customer_address) lines.push(`Customer address: ${f.customer_address}`);
  if (f.contract_or_account_number)
    lines.push(`Contract/account number: ${f.contract_or_account_number}`);
  if (f.invoice_number) lines.push(`Invoice number: ${f.invoice_number}`);
  if (f.invoice_date) lines.push(`Invoice date: ${f.invoice_date}`);
  if (f.billing_period) lines.push(`Billing period: ${f.billing_period}`);
  if (f.amount_eur) lines.push(`Invoice amount (EUR): ${f.amount_eur}`);
  if (f.payment_status) lines.push(`Payment status: ${f.payment_status}`);
  if (f.issue_type) lines.push(`Issue type: ${f.issue_type}`);
  if (f.issue_description) lines.push(`Issue description: ${f.issue_description}`);
  if (f.contacted_before === "yes") lines.push("Contacted provider before: yes");
  if (f.contacted_before === "no") lines.push("Contacted provider before: no");
  if (f.contacted_before_details)
    lines.push(`Previous communication: ${f.contacted_before_details}`);
  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.refund_iban) lines.push(`Refund IBAN: ${f.refund_iban}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);
  return lines.join("\n");
}

function buildWarranty3yFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof Warranty3yFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push(`Use case: consumer warranty claim (3 years) (${input.company}).`);
  if (f.buyer_full_name) lines.push(`Buyer full name: ${f.buyer_full_name}`);
  if (f.buyer_id) lines.push(`Buyer ID (DNI/NIE/Passport): ${f.buyer_id}`);
  if (f.buyer_address) lines.push(`Buyer address: ${f.buyer_address}`);
  if (f.seller_name) lines.push(`Seller/merchant name: ${f.seller_name}`);
  if (f.seller_address) lines.push(`Seller/merchant address: ${f.seller_address}`);
  if (f.order_or_invoice_number) lines.push(`Order / invoice number: ${f.order_or_invoice_number}`);
  if (f.product_description) lines.push(`Product: ${f.product_description}`);
  if (f.purchase_date) lines.push(`Purchase date: ${f.purchase_date}`);
  if (f.delivery_date) lines.push(`Delivery date: ${f.delivery_date}`);
  if (f.defect_description) lines.push(`Defect description: ${f.defect_description}`);
  if (f.defect_discovered_date) lines.push(`Defect discovered on: ${f.defect_discovered_date}`);
  if (f.contacted_support_before === "yes") lines.push("Contacted support before: yes");
  if (f.contacted_support_before === "no") lines.push("Contacted support before: no");
  if (f.contacted_support_details) lines.push(`Support contact details: ${f.contacted_support_details}`);
  if (f.requested_solution) lines.push(`Requested solution: ${f.requested_solution}`);
  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);
  return lines.join("\n");
}

function buildNonDeliveryFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof NonDeliveryFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push(`Use case: undelivered goods / non-delivery complaint (${input.company}).`);
  if (f.buyer_full_name) lines.push(`Buyer full name: ${f.buyer_full_name}`);
  if (f.buyer_id) lines.push(`Buyer ID (DNI/NIE/Passport): ${f.buyer_id}`);
  if (f.buyer_address) lines.push(`Buyer address: ${f.buyer_address}`);
  if (f.seller_name) lines.push(`Seller/merchant name: ${f.seller_name}`);
  if (f.order_number) lines.push(`Order number: ${f.order_number}`);
  if (f.product_description) lines.push(`Product: ${f.product_description}`);
  if (f.purchase_date) lines.push(`Purchase date: ${f.purchase_date}`);
  if (f.promised_delivery_date) lines.push(`Promised delivery date: ${f.promised_delivery_date}`);
  if (f.tracking_number) lines.push(`Tracking number: ${f.tracking_number}`);
  if (f.carrier_name) lines.push(`Carrier: ${f.carrier_name}`);
  if (f.delivery_status) lines.push(`Delivery status: ${f.delivery_status}`);
  if (f.contacted_seller_before === "yes") lines.push("Contacted seller before: yes");
  if (f.contacted_seller_before === "no") lines.push("Contacted seller before: no");
  if (f.contacted_details) lines.push(`Previous communication: ${f.contacted_details}`);
  if (f.paid_amount_eur) lines.push(`Paid amount (EUR): ${f.paid_amount_eur}`);
  if (f.payment_method) lines.push(`Payment method: ${f.payment_method}`);
  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);
  return lines.join("\n");
}

function buildFlightDelayFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof FlightDelayFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push(`Use case: flight delay compensation claim (EU261/2004) (${input.company}).`);
  if (f.passenger_full_name) lines.push(`Passenger full name: ${f.passenger_full_name}`);
  if (f.passenger_id) lines.push(`Passenger ID (DNI/NIE/Passport): ${f.passenger_id}`);
  if (f.passenger_address) lines.push(`Passenger address: ${f.passenger_address}`);
  if (f.booking_reference) lines.push(`Booking reference (PNR): ${f.booking_reference}`);
  if (f.flight_number) lines.push(`Flight number: ${f.flight_number}`);
  if (f.departure_airport) lines.push(`Departure airport: ${f.departure_airport}`);
  if (f.arrival_airport) lines.push(`Arrival airport: ${f.arrival_airport}`);
  if (f.scheduled_departure) lines.push(`Scheduled departure: ${f.scheduled_departure}`);
  if (f.scheduled_arrival) lines.push(`Scheduled arrival: ${f.scheduled_arrival}`);
  if (f.actual_arrival) lines.push(`Actual arrival: ${f.actual_arrival}`);
  if (f.delay_hours) lines.push(`Delay duration (hours): ${f.delay_hours}`);
  if (f.delay_reason) lines.push(`Delay reason (if known): ${f.delay_reason}`);
  if (f.expenses_eur) lines.push(`Expenses amount (EUR): ${f.expenses_eur}`);
  if (f.expenses_description) lines.push(`Expenses description: ${f.expenses_description}`);
  if (f.contacted_airline_before === "yes") lines.push("Contacted airline before: yes");
  if (f.contacted_airline_before === "no") lines.push("Contacted airline before: no");
  if (f.contacted_details) lines.push(`Previous communication: ${f.contacted_details}`);
  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.iban) lines.push(`IBAN for payment: ${f.iban}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);
  return lines.join("\n");
}

function buildInsuranceCancelFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof InsuranceCancelFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push(`Use case: insurance policy cancellation (${input.company}).`);
  if (f.policyholder_full_name) lines.push(`Policyholder full name: ${f.policyholder_full_name}`);
  if (f.policyholder_id) lines.push(`Policyholder ID (DNI/NIE/Passport): ${f.policyholder_id}`);
  if (f.policyholder_address) lines.push(`Policyholder address: ${f.policyholder_address}`);
  if (f.insurer_name) lines.push(`Insurer name: ${f.insurer_name}`);
  if (f.policy_number) lines.push(`Policy number: ${f.policy_number}`);
  if (f.insurance_type) lines.push(`Insurance type: ${f.insurance_type}`);
  if (f.contract_start_date) lines.push(`Contract start date: ${f.contract_start_date}`);
  if (f.renewal_date) lines.push(`Renewal date: ${f.renewal_date}`);
  if (f.cancellation_request_date) lines.push(`Cancellation requested on: ${f.cancellation_request_date}`);
  if (f.cancellation_method) lines.push(`Cancellation method: ${f.cancellation_method}`);
  if (f.reason) lines.push(`Reason (optional): ${f.reason}`);
  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.iban) lines.push(`IBAN for refunds (optional): ${f.iban}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);
  return lines.join("\n");
}

function buildClaimDeniedFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof ClaimDeniedFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push(`Use case: insurance claim denied / refusal to pay (${input.company}).`);
  if (f.policyholder_full_name) lines.push(`Policyholder full name: ${f.policyholder_full_name}`);
  if (f.policyholder_id) lines.push(`Policyholder ID (DNI/NIE/Passport): ${f.policyholder_id}`);
  if (f.policyholder_address) lines.push(`Policyholder address: ${f.policyholder_address}`);
  if (f.insurer_name) lines.push(`Insurer name: ${f.insurer_name}`);
  if (f.policy_number) lines.push(`Policy number: ${f.policy_number}`);
  if (f.claim_number) lines.push(`Claim number: ${f.claim_number}`);
  if (f.incident_date) lines.push(`Incident date: ${f.incident_date}`);
  if (f.incident_description) lines.push(`Incident description: ${f.incident_description}`);
  if (f.claimed_amount_eur) lines.push(`Claimed amount (EUR): ${f.claimed_amount_eur}`);
  if (f.denial_date) lines.push(`Denial date: ${f.denial_date}`);
  if (f.denial_reason) lines.push(`Denial reason (as stated): ${f.denial_reason}`);
  if (f.contacted_before === "yes") lines.push("Contacted insurer before: yes");
  if (f.contacted_before === "no") lines.push("Contacted insurer before: no");
  if (f.contacted_details) lines.push(`Previous communication: ${f.contacted_details}`);
  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.iban) lines.push(`IBAN for payment (optional): ${f.iban}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);
  return lines.join("\n");
}

function buildFeesRefundFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof FeesRefundFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push(`Use case: bank fees refund / return of commissions (${input.company}).`);
  if (f.customer_full_name) lines.push(`Customer full name: ${f.customer_full_name}`);
  if (f.customer_id) lines.push(`Customer ID (DNI/NIE/Passport): ${f.customer_id}`);
  if (f.customer_address) lines.push(`Customer address: ${f.customer_address}`);
  if (f.bank_name) lines.push(`Bank name: ${f.bank_name}`);
  if (f.account_iban) lines.push(`Account IBAN: ${f.account_iban}`);
  if (f.product_type) lines.push(`Product type: ${f.product_type}`);
  if (f.fee_type) lines.push(`Fee type: ${f.fee_type}`);
  if (f.fee_amount_eur) lines.push(`Fee amount (EUR): ${f.fee_amount_eur}`);
  if (f.fee_date) lines.push(`Fee date: ${f.fee_date}`);
  if (f.period_details) lines.push(`Period / details: ${f.period_details}`);
  if (f.reason) lines.push(`Reason: ${f.reason}`);
  if (f.contacted_before === "yes") lines.push("Contacted bank before: yes");
  if (f.contacted_before === "no") lines.push("Contacted bank before: no");
  if (f.contacted_details) lines.push(`Previous communication: ${f.contacted_details}`);
  if (f.desired_outcome) lines.push(`Desired outcome: ${f.desired_outcome}`);
  if (f.refund_iban) lines.push(`Refund IBAN: ${f.refund_iban}`);
  if (f.extra_details) lines.push(`Additional details: ${f.extra_details}`);
  return lines.join("\n");
}

function buildTrafficFineAppealFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof TrafficFineAppealFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push("Use case: appeal a traffic fine (administrative appeal).");
  lines.push("Authority: DGT or Local Police (as applicable).");
  if (f.applicant_full_name) lines.push(`Applicant full name: ${f.applicant_full_name}`);
  if (f.applicant_id) lines.push(`Applicant ID (DNI/NIE/Passport): ${f.applicant_id}`);
  if (f.applicant_address) lines.push(`Applicant address: ${f.applicant_address}`);
  if (f.fine_reference) lines.push(`Fine reference / expediente number: ${f.fine_reference}`);
  if (f.fine_date) lines.push(`Notification date: ${f.fine_date}`);
  if (f.fine_amount_eur) lines.push(`Fine amount (EUR): ${f.fine_amount_eur}`);
  if (f.appeal_reason) lines.push(`Appeal reason: ${f.appeal_reason}`);
  if (f.additional_details) lines.push(`Additional details: ${f.additional_details}`);
  lines.push("");
  lines.push("Drafting instructions (legal context):");
  lines.push("Context: Administrative appeal against a traffic fine (Recurso de Alzada / Reposición).");
  lines.push("Tone: Formal administrative appeal.");
  lines.push("Legal strategy: cite 'Presunción de Inocencia' (Art. 24 Constitución Española).");
  if (f.appeal_reason === "no_evidence") {
    lines.push(
      "Specific: explicitly demand the 'Certificado de Verificación' of the Radar/Cinemometer and the original photo.",
    );
  }
  if (f.appeal_reason === "no_notification") {
    lines.push(
      "Specific: cite defect in notification procedure (Art. 40 Ley 39/2015) and request proof of notification attempts.",
    );
  }
  if (f.appeal_reason === "not_driver") {
    lines.push(
      "Specific: state that the applicant was not driving and request instructions to identify the actual driver; include driver identification if provided in details.",
    );
  }
  if (f.appeal_reason === "incorrect_data") {
    lines.push("Specific: highlight any license plate / personal data errors and request annulment.");
  }
  return lines.join("\n");
}

function buildCarSaleNotificationFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof CarSaleNotificationFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push("Use case: notify DGT about vehicle sale (notificación de venta).");
  lines.push("Recipient: DGT (Dirección General de Tráfico).");
  if (f.seller_full_name) lines.push(`Seller full name: ${f.seller_full_name}`);
  if (f.seller_id) lines.push(`Seller ID (DNI/NIE/Passport): ${f.seller_id}`);
  if (f.seller_address) lines.push(`Seller address: ${f.seller_address}`);
  if (f.plate_number) lines.push(`Vehicle license plate (matrícula): ${f.plate_number}`);
  if (f.buyer_name) lines.push(`Buyer full name: ${f.buyer_name}`);
  if (f.buyer_id) lines.push(`Buyer DNI/NIE/CIF: ${f.buyer_id}`);
  if (f.sale_date) lines.push(`Date of sale / contract date: ${f.sale_date}`);
  if (f.additional_details) lines.push(`Additional details: ${f.additional_details}`);
  lines.push("");
  lines.push("Drafting instructions (legal context):");
  lines.push("Context: communication to DGT (Tráfico) regarding vehicle transfer.");
  lines.push("Legal basis: Art. 32 Reglamento General de Vehículos.");
  lines.push(
    "Goal: officially communicate that the vehicle is no longer in the user's possession to limit tax/civil liability (IVTM/fines) from the sale date.",
  );
  return lines.join("\n");
}

function buildUnpaidWagesFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof UnpaidWagesFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push("Use case: unpaid wages / salary arrears (reclamación de cantidad).");
  if (f.employee_full_name) lines.push(`Employee full name: ${f.employee_full_name}`);
  if (f.employee_id) lines.push(`Employee ID (DNI/NIE/Passport): ${f.employee_id}`);
  if (f.employee_address) lines.push(`Employee address: ${f.employee_address}`);
  if (f.employer_name) lines.push(`Employer / company name: ${f.employer_name}`);
  if (f.months_owed) lines.push(`Months/periods owed: ${f.months_owed}`);
  if (f.total_amount_eur) lines.push(`Total amount owed (EUR): ${f.total_amount_eur}`);
  if (f.contract_type) lines.push(`Contract type: ${f.contract_type}`);
  if (f.additional_details) lines.push(`Additional details: ${f.additional_details}`);
  lines.push("");
  lines.push("Drafting instructions (legal context):");
  lines.push(
    "Context: formal labor claim (Reclamación de Cantidad) prior to judicial process and before SMAC conciliation.",
  );
  lines.push("Legal basis: Art. 29 Estatuto de los Trabajadores (timely payment of wages).");
  lines.push("Critical: explicitly demand the 10% annual interest for delay (interés por mora) according to Art. 29.3 ET.");
  lines.push("Tone: very firm. Mention intention to file a 'Papeleta de Conciliación' at SMAC if not paid within 5 days.");
  return lines.join("\n");
}

function buildVoluntaryResignationFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof VoluntaryResignationFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push("Use case: voluntary resignation letter (carta de dimisión).");
  if (f.employee_full_name) lines.push(`Employee full name: ${f.employee_full_name}`);
  if (f.employee_id) lines.push(`Employee ID (DNI/NIE/Passport): ${f.employee_id}`);
  if (f.employee_address) lines.push(`Employee address: ${f.employee_address}`);
  if (f.employer_name) lines.push(`Employer / company name: ${f.employer_name}`);
  if (f.last_day) lines.push(`Last working day (effective date): ${f.last_day}`);
  if (f.notice_given) lines.push(`Notice period provided: ${f.notice_given}`);
  if (f.request_settlement === true) lines.push("Request finiquito immediately: yes");
  if (f.request_settlement === false) lines.push("Request finiquito immediately: no");
  if (f.additional_details) lines.push(`Additional details: ${f.additional_details}`);
  lines.push("");
  lines.push("Drafting instructions (legal context):");
  lines.push("Context: letter of voluntary resignation (Carta de Dimisión).");
  lines.push("Legal basis: Art. 49.1.d Estatuto de los Trabajadores.");
  lines.push(
    "Specific: explicitly request the preparation of the 'Finiquito' (final settlement) and 'Certificado de Empresa' for the last day.",
  );
  if (f.notice_given === "immediate") {
    lines.push(
      "Specific: phrase immediate resignation carefully and acknowledge potential deduction for missing notice days (if applicable).",
    );
  }
  return lines.join("\n");
}

function buildVacationRequestFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof VacationRequestFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push("Use case: formal vacation request (solicitud de vacaciones).");
  if (f.employee_full_name) lines.push(`Employee full name: ${f.employee_full_name}`);
  if (f.employee_id) lines.push(`Employee ID (DNI/NIE/Passport): ${f.employee_id}`);
  if (f.employee_address) lines.push(`Employee address: ${f.employee_address}`);
  if (f.employer_name) lines.push(`Employer / company name: ${f.employer_name}`);
  if (f.start_date) lines.push(`Vacation start date: ${f.start_date}`);
  if (f.end_date) lines.push(`Vacation end date: ${f.end_date}`);
  if (f.total_days) lines.push(`Total working days requested: ${f.total_days}`);
  if (f.comments) lines.push(`Comments: ${f.comments}`);
  if (f.additional_details) lines.push(`Additional details: ${f.additional_details}`);
  lines.push("");
  lines.push("Drafting instructions (legal context):");
  lines.push("Context: formal request for annual leave.");
  lines.push("Legal basis: Art. 38 Estatuto de los Trabajadores.");
  lines.push("Goal: create a paper trail. Request a stamped copy or written confirmation to avoid 'abandonment of post' accusations.");
  lines.push("Mention that dates are requested with sufficient notice (usually at least 2 months prior when possible).");
  return lines.join("\n");
}

const GenerateRequestSchema = z.object({
  locale: z.string().min(2),
  category: z.string().min(1),
  company: z.string().min(1),
  // Back-compat: allow raw facts, or structured form (recommended for cancel/*)
  facts: z.string().min(10).optional(),
  form: z.unknown().optional(),
});

export async function POST(req: Request) {
  try {
    checkRateLimit(req);
    const body = await req.json();
    const input = GenerateRequestSchema.parse(body);

    let parsedForm: unknown = null;
    let facts: string | undefined = input.facts;
    const parsedCompany = parsePseoCompany({ category: input.category, company: input.company });
    const effectiveCompanyForRouting =
      input.category === "trafico" || input.category === "trabajo"
        ? (parsedCompany.variant ?? input.company)
        : input.company;

    if (input.category === "cancel" && input.form) {
      const parsed = CancelTelcoFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildCancelTelcoFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "fianza" && input.form) {
      const parsed = DepositReturnFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildDepositReturnFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "devolucion" && input.form) {
      const parsed = Return14FormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildReturn14Facts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "reparacion" && input.form) {
      const parsed = RepairDemandFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildRepairDemandFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "rescision" && input.form) {
      const parsed = LeaseTerminationFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildLeaseTerminationFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "factura" && input.form) {
      const parsed = BillComplaintFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildBillComplaintFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "garantia" && input.form) {
      const parsed = Warranty3yFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildWarranty3yFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "noentrega" && input.form) {
      const parsed = NonDeliveryFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildNonDeliveryFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "vuelo" && input.form) {
      const parsed = FlightDelayFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildFlightDelayFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "seguro" && input.form) {
      const parsed = InsuranceCancelFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildInsuranceCancelFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "denegacion" && input.form) {
      const parsed = ClaimDeniedFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildClaimDeniedFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "comisiones" && input.form) {
      const parsed = FeesRefundFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildFeesRefundFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "trafico" && effectiveCompanyForRouting === "multa" && input.form) {
      const parsed = TrafficFineAppealFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildTrafficFineAppealFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "trafico" && effectiveCompanyForRouting === "venta" && input.form) {
      const parsed = CarSaleNotificationFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildCarSaleNotificationFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "trabajo" && effectiveCompanyForRouting === "salarios" && input.form) {
      const parsed = UnpaidWagesFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildUnpaidWagesFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "trabajo" && effectiveCompanyForRouting === "baja" && input.form) {
      const parsed = VoluntaryResignationFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildVoluntaryResignationFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (input.category === "trabajo" && effectiveCompanyForRouting === "vacaciones" && input.form) {
      const parsed = VacationRequestFormSchema.safeParse(input.form);
      if (!parsed.success) {
        throw new Error(JSON.stringify(parsed.error.issues, null, 2));
      }
      parsedForm = parsed.data;
      facts = buildVacationRequestFacts({
        locale: input.locale,
        company: input.company,
        form: parsed.data,
      });
    }

    if (!facts || facts.trim().length < 10) {
      throw new Error("FACTS_REQUIRED");
    }

    const result = await generateDualLanguageLegalText({
      userLanguage: input.locale,
      facts,
      useCaseHint: `${input.category}/${input.company}`,
    });

    const orderId = crypto.randomUUID();
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase.from("orders").insert({
      id: orderId,
      status: "pending",
      amount: 299,
      content_snapshot: {
        locale: input.locale,
        category: input.category,
        company: input.company,
        recipient: getCompanyBySlug(input.company),
        facts,
        form: parsedForm,
        ...result,
      },
    });

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    return NextResponse.json({ orderId, ...result, facts });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ errorCode: "INVALID_REQUEST" }, { status: 400 });
    }

    const message = e instanceof Error ? e.message : "";

    if (message === "RATE_LIMIT_EXCEEDED") {
      return NextResponse.json(
        { errorCode: "RATE_LIMIT_EXCEEDED" },
        { status: 429 },
      );
    }

    if (message === "FACTS_REQUIRED") {
      return NextResponse.json({ errorCode: "FACTS_REQUIRED" }, { status: 400 });
    }

    // Many form schemas throw JSON-stringified zod issues today.
    if (message.trim().startsWith("[")) {
      return NextResponse.json(
        { errorCode: "FORM_VALIDATION_ERROR" },
        { status: 400 },
      );
    }

    return NextResponse.json({ errorCode: "UNKNOWN_ERROR" }, { status: 400 });
  }
}

