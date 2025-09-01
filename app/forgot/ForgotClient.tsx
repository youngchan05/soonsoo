"use client";

import { supabaseBrowser } from "../lib/supabaseClient";
import ForgotPage from "./ForgotPage";

export default function ForgotClient() {
  async function onRequestReset(email: string) {
    const supabase = supabaseBrowser();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `http://localhost:3000/auth/reset`, // 사용자가 메일 링크를 클릭하면 여기로 돌아옴
    });
    if (error) throw new Error(error.message);
  }

  return <ForgotPage brand="SOONSOO" onRequestReset={onRequestReset} />;
}
