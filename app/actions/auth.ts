"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "../lib/supabaseServer";

export async function logout() {
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signOut({ scope: "global" });
  if (error) {
    console.error("signOut error:", error.message);
  }
  redirect("/"); // 원하는 경로
}
