import { NextResponse } from "next/server";
import { z } from "zod";
import { generateDualLanguageLegalText } from "@/lib/deepseek";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

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
  applicant_full_name: z.preprocess(emptyToUndefined, z.string().min(2)).optional(),
  applicant_id: z.preprocess(emptyToUndefined, z.string().min(3)).optional(),
  applicant_address: z.preprocess(emptyToUndefined, z.string().min(5)).optional(),

  contract_number: z.preprocess(emptyToUndefined, z.string().min(2)).optional(),
  cancellation_request_date: z.preprocess(emptyToUndefined, z.string().min(4)).optional(), // free-form / date string
  cancellation_request_method: z.preprocess(emptyToUndefined, z.string().min(2)).optional(),

  charge_after_cancellation: z.preprocess(yesNoToBoolean, z.boolean()).optional(),
  charged_amount_eur: z.preprocess(emptyToUndefined, z.string().min(1)).optional(),
  charged_date: z.preprocess(emptyToUndefined, z.string().min(4)).optional(),
  payment_method: z.preprocess(emptyToUndefined, z.string().min(2)).optional(),

  desired_outcome: z.preprocess(emptyToUndefined, z.string().min(2)).optional(),
  extra_details: z.preprocess(emptyToUndefined, z.string()).optional(),
});

function buildCancelTelcoFacts(input: {
  locale: string;
  company: string;
  form: z.infer<typeof CancelTelcoFormSchema>;
}) {
  const f = input.form;
  const lines: string[] = [];
  lines.push(`Use case: cancel telecom contract (${input.company}).`);
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

const GenerateRequestSchema = z.object({
  locale: z.string().min(2),
  category: z.string().min(1),
  company: z.string().min(1),
  // Back-compat: allow raw facts, or structured form (recommended for cancel/*)
  facts: z.string().min(10).optional(),
  form: CancelTelcoFormSchema.optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = GenerateRequestSchema.parse(body);

    const facts =
      input.category === "cancel" && input.form
        ? buildCancelTelcoFacts({
            locale: input.locale,
            company: input.company,
            form: input.form,
          })
        : input.facts;

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
        facts,
        form: input.form ?? null,
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

