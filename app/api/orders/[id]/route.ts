import { supabaseAdmin } from "@/app/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from("orders")
    .select(
      "id, order_no, status, total_amount, contact_email, contact_phone, created_at, order_items:order_items(product_id, qty, unit_price, subtotal)"
    )
    .eq("id", params.id)
    .single();
  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { contactEmail, contactPhone, status } = await req.json();
    const sb = supabaseAdmin();

    const payload: any = {};
    if (typeof contactEmail === "string")
      payload.contact_email = contactEmail.trim() || null;
    if (typeof contactPhone === "string")
      payload.contact_phone = contactPhone.trim() || null;
    if (typeof status === "string") payload.status = status;

    const { error } = await sb
      .from("orders")
      .update(payload)
      .eq("id", params.id);
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message ?? "서버 오류" },
      { status: 500 }
    );
  }
}
