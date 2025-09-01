// app/api/account/orders/route.ts
import { supabaseServer } from "@/app/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const sb = await supabaseServer(); // ⬅️ await 필요

  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await sb
    .from("orders")
    .select("id, order_no, status, created_at, total_amount")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json({ items: data ?? [] });
}
