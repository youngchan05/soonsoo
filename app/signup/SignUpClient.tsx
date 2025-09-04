// app/signup/SignUpClient.tsx
"use client";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../lib/supabaseClient";
import SignUpPage from "./SignUpPage";

export default function SignUpClient() {
  const router = useRouter();

  async function onSignUp({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const supabase = supabaseBrowser();

    // 현재 클라이언트 URL 가져오기
    const url = new URL(window.location.href);
    const clientUrl = new URL(
      "/auth/callback" + url.search + url.hash,
      url.origin
    );

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: clientUrl.toString(),
      },
    });

    if (error) {
      const msg = error.message?.toLowerCase() ?? "";
      if (msg.includes("already registered")) {
        throw new Error("이미 가입된 이메일입니다. 로그인해 주세요.");
      }
      throw new Error("회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }

    // 안내 페이지 이동
    router.push(`/auth/verify-sent?email=${encodeURIComponent(email)}`);
  }

  return <SignUpPage brand="SOONSOO" onSignUp={onSignUp} />;
}
