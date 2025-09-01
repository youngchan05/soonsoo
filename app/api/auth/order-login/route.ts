import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/app/lib/supabaseServer";

function sha256(s: string) {
  return crypto
    .createHash("sha256")
    .update(s.trim().toLowerCase())
    .digest("hex");
}

export async function POST(req: Request) {
  try {
    const { orderNo, contact } = (await req.json()) as {
      orderNo?: string;
      contact?: string;
    };
    if (!orderNo || !contact) {
      return NextResponse.json(
        { message: "orderNo/contact 필요" },
        { status: 400 }
      );
    }

    const admin = supabaseAdmin();
    const contactHash = sha256(contact);

    const { data, error } = await admin
      .from("orders")
      .select("id, order_no, status, total_amount, created_at")
      .eq("order_no", orderNo)
      .eq("contact_hash", contactHash)
      .maybeSingle();

    if (error) throw error;
    if (!data)
      return NextResponse.json(
        { message: "주문을 찾을 수 없습니다." },
        { status: 404 }
      );

    return NextResponse.json({ orderId: data.id, status: data.status });
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message ?? "server error" },
      { status: 500 }
    );
  }
}
