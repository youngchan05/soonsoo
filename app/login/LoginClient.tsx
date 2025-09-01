// app/login/LoginClient.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "../lib/supabaseClient";
import LoginPage from "./Loginpage";

export default function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const prefillEmail = params.get("email") ?? undefined;
  const verifySent = params.get("verify") === "sent";

  async function onAccountLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      const m = error.message.toLowerCase();
      if (m.includes("not confirmed")) {
        // 미인증: 화면에서 재전송 버튼을 노출할 수 있게 에러 메시지 통일
        throw new Error(
          "이메일 인증이 필요합니다. 아래에서 인증 메일을 다시 보내세요."
        );
      }
      if (m.includes("invalid login credentials")) {
        throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
      throw new Error("로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
    router.push("/");
    router.refresh();
  }

  async function onResendVerify(email: string) {
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    if (error)
      throw new Error("재전송에 실패했습니다. 이메일 주소를 확인해 주세요.");
    // 성공 시 아무 것도 반환하지 않음 → 화면에서 성공 메시지 표시
  }

  async function onOrderLogin({
    orderNo,
    contact,
  }: {
    orderNo: string;
    contact: string;
  }) {
    const res = await fetch("/api/auth/order-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderNo, contact }),
    });
    if (!res.ok) {
      const { message } = await res
        .json()
        .catch(() => ({ message: "주문을 찾을 수 없습니다." }));
      throw new Error(message);
    }
    const { orderId } = await res.json();
    router.push(`/orders/${orderId}`);
  }

  return (
    <LoginPage
      brand="SOONSOO"
      onAccountLogin={onAccountLogin}
      onOrderLogin={onOrderLogin}
      onResendVerify={onResendVerify} // 🔸 추가
      defaultEmail={prefillEmail} // 🔸 선택: 쿼리에서 이메일 프리필
      verifyHint={verifySent} // 🔸 선택: "인증 메일 보냈어요" 힌트
    />
  );
}
