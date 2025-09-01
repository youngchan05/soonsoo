"use server";

import { supabaseBrowser } from "../lib/supabaseClient";

export async function accountLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = supabaseBrowser();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
}
