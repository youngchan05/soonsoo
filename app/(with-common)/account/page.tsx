import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import AccountClient from "./parts/AccountClient";
import { supabaseServer } from "@/app/lib/supabaseServer";

export default async function AccountPage() {
  const supabase = await supabaseServer(); // ⬅️ await 필요

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/account");

  // 초기 1페이지 프리패치(빠른 첫 렌더)
  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_no, status, created_at, total_amount")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  // 프로필 프리패치
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 py-10">
      <h1 className="text-2xl font-semibold">마이페이지</h1>
      <AccountClient
        initialEmail={user.email ?? ""}
        initialProfile={{
          full_name: profile?.full_name ?? "",
          phone: profile?.phone ?? "",
        }}
        initialOrders={orders ?? []}
      />
    </main>
  );
}
