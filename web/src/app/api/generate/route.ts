import { NextResponse } from "next/server";
import { z } from "zod";
import { generateDualLanguageLegalText } from "@/lib/deepseek";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const GenerateRequestSchema = z.object({
  locale: z.string().min(2),
  category: z.string().min(1),
  company: z.string().min(1),
  facts: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = GenerateRequestSchema.parse(body);

    const result = await generateDualLanguageLegalText({
      userLanguage: input.locale,
      facts: input.facts,
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
        ...result,
      },
    });

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    return NextResponse.json({ orderId, ...result });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

