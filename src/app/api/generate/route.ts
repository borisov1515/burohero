import { NextResponse } from "next/server";
import { z } from "zod";
import { generateDualLanguageLegalText } from "@/lib/deepseek";
import { getCompanyBySlug } from "@/lib/companies";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

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
    throw new Error("Rate limit exceeded. Please try again later.");
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

    if (!facts || facts.trim().length < 10) {
      throw new Error("Facts are required");
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
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

