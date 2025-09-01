// app/api/orders/route.ts
export const runtime = "nodejs";

import { supabaseAdmin, supabaseServer } from "@/app/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productId, qty, contactEmail, contactPhone } = await req.json();
    const q = Number(qty || 1);
    if (!productId || q <= 0) {
      return NextResponse.json({ message: "잘못된 요청" }, { status: 400 });
    }

    // 1) 로그인 사용자 이메일 가져오기(있으면)
    const sbServer = await supabaseServer();
    const {
      data: { user },
    } = await sbServer.auth
      .getUser()
      .catch(() => ({ data: { user: null } as any }));
    const userId = user?.id ?? null;
    const authEmail = user?.email ?? null;

    // 2) 게스트가 보낸 이메일/전화 우선, 없으면 로그인 이메일
    const email =
      typeof contactEmail === "string" && contactEmail.trim()
        ? contactEmail.trim()
        : authEmail;
    const phone =
      typeof contactPhone === "string" && contactPhone.trim()
        ? contactPhone.trim()
        : null;

    const sb = supabaseAdmin();

    // 3) 가격 조회
    const { data: product, error: pErr } = await sb
      .from("products")
      .select("id, price")
      .eq("id", productId)
      .single();
    if (pErr || !product) {
      return NextResponse.json(
        { message: "상품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const unit = product.price;
    const subtotal = unit * q;
    const total = subtotal;

    // 4) 주문번호 생성
    const orderNo =
      "FS-" +
      new Date().toISOString().slice(0, 10).replace(/-/g, "") +
      "-" +
      Math.random().toString(36).slice(2, 7).toUpperCase();

    // 5) 주문 + 아이템 저장
    const { data: order, error: oErr } = await sb
      .from("orders")
      .insert({
        order_no: orderNo,
        status: "draft",
        total_amount: total,
        user_id: userId,
        contact_email: email ?? null,
        contact_phone: phone,
      })
      .select("id, order_no")
      .single();
    if (oErr || !order) throw oErr;

    const { error: iErr } = await sb.from("order_items").insert({
      order_id: order.id,
      product_id: productId,
      qty: q,
      unit_price: unit,
      subtotal,
    });
    if (iErr) throw iErr;

    return NextResponse.json({ orderId: order.id, orderNo: order.order_no });
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message ?? "서버 오류" },
      { status: 500 }
    );
  }
}
