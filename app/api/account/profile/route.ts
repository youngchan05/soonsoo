import { NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer(); // ⬅️ await 필요
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user.id)
    .maybeSingle();

  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({
    email: user.email,
    profile: data ?? { full_name: "", phone: "" },
  });
}

export async function PATCH(req: Request) {
  const supabase = await supabaseServer(); // ⬅️ await 필요
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const full_name = String(body.full_name ?? "");
  const phone = String(body.phone ?? "");

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, full_name, phone })
    .eq("id", user.id);

  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
