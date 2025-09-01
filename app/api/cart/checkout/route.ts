import { supabaseAdmin, supabaseServer } from "@/app/lib/supabaseServer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Item = { productId: string; qty: number };

export async function POST(req: Request) {
  try {
    const { items, contactEmail, contactPhone } = await req.json();
    const list: Item[] = Array.isArray(items) ? items : [];
    const clean = list
      .map((i) => ({
        productId: String(i.productId),
        qty: Math.max(1, Number(i.qty) || 1),
      }))
      .filter((i) => i.productId && i.qty > 0);

    if (!clean.length) {
      return NextResponse.json(
        { message: "장바구니가 비어 있습니다." },
        { status: 400 }
      );
    }

    // 로그인 사용자라면 userId/email 채우기 시도
    const sbServer = await supabaseServer().catch(() => null as any);
    const { data: userData } = sbServer
      ? await sbServer.auth
          .getUser()
          .catch(() => ({ data: { user: null } as any }))
      : { data: { user: null } };
    const userId = userData?.user?.id ?? null;
    const authEmail = userData?.user?.email ?? null;

    const email =
      typeof contactEmail === "string" && contactEmail.trim()
        ? contactEmail.trim()
        : authEmail;
    const phone =
      typeof contactPhone === "string" && contactPhone.trim()
        ? contactPhone.trim()
        : null;

    const sb = supabaseAdmin();

    // 가격/존재 확인
    const ids = Array.from(new Set(clean.map((i) => i.productId)));
    const { data: prods, error: pErr } = await sb
      .from("products")
      .select("id, price")
      .in("id", ids)
      .eq("is_published", true);
    if (pErr) throw pErr;

    // 존재하는 상품만
    const map = new Map(prods?.map((p) => [p.id, p.price]));
    const itemsOk = clean
      .map((i) => ({ ...i, price: map.get(i.productId) }))
      .filter((i) => typeof i.price === "number") as (Item & {
      price: number;
    })[];

    if (!itemsOk.length) {
      return NextResponse.json(
        { message: "유효한 상품이 없습니다." },
        { status: 400 }
      );
    }

    const orderNo =
      "FS-" +
      new Date().toISOString().slice(0, 10).replace(/-/g, "") +
      "-" +
      Math.random().toString(36).slice(2, 7).toUpperCase();
    const total = itemsOk.reduce((s, i) => s + i.price * i.qty, 0);

    // 주문 생성
    const { data: order, error: oErr } = await sb
      .from("orders")
      .insert({
        order_no: orderNo,
        status: "draft",
        user_id: userId,
        contact_email: email ?? null,
        contact_phone: phone,
        total_amount: total,
      })
      .select("id, order_no")
      .single();
    if (oErr || !order) throw oErr;

    // 아이템 생성
    const rows = itemsOk.map((i) => ({
      order_id: order.id,
      product_id: i.productId,
      qty: i.qty,
      unit_price: i.price,
      subtotal: i.price * i.qty,
    }));
    const { error: iErr } = await sb.from("order_items").insert(rows);
    if (iErr) throw iErr;

    return NextResponse.json({ orderId: order.id, orderNo: order.order_no });
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message ?? "서버 오류" },
      { status: 500 }
    );
  }
}
