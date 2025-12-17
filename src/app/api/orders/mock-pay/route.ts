import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const BodySchema = z.object({
  orderId: z.string().uuid(),
});

export async function POST(req: Request) {
  try {
    if (process.env.NEXT_PUBLIC_ENABLE_TEST_PAYMENTS !== "true") {
      return NextResponse.json(
        { errorCode: "MOCK_PAYMENTS_DISABLED" },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { orderId } = BodySchema.parse(body);

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("orders")
      .update({ status: "paid" }, { count: "exact" })
      .eq("id", orderId)
      .select("id,status");

    if (error) throw new Error(error.message);

    if (!data || data.length === 0) {
      return NextResponse.json(
        { errorCode: "ORDER_NOT_FOUND" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, orderId, status: data[0].status });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ errorCode: "INVALID_ORDER_ID" }, { status: 400 });
    }
    return NextResponse.json({ errorCode: "UNKNOWN_ERROR" }, { status: 400 });
  }
}

