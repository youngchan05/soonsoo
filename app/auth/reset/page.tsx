"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/app/lib/supabaseClient";
import { EmailOtpType } from "@supabase/supabase-js";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [expired, setExpired] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ran = useRef(false); // StrictMode 중복 호출 가드

  useEffect(() => {
    (async () => {
      if (ran.current) return;
      ran.current = true;

      const supabase = supabaseBrowser();
      const url = window.location.href;
      const { searchParams, hash } = new URL(url);

      // 1) 해시 토큰(implicit) 우선 처리: PKCE OFF일 때 도착
      if (hash.includes("access_token")) {
        const p = new URLSearchParams(hash.slice(1));
        const { error } = await supabase.auth.setSession({
          access_token: p.get("access_token")!,
          refresh_token: p.get("refresh_token")!,
        });
        if (!error) {
          history.replaceState(null, "", window.location.pathname);
          setReady(true);
          return;
        }
      }

      // 2) token_hash + verifyOtp 경로 (이메일 템플릿에서 token_hash를 붙였을 때)
      const token_hash = searchParams.get("token_hash");
      const type = (searchParams.get("type") as EmailOtpType) || "recovery";
      if (token_hash) {
        const { data, error } = await supabase.auth.verifyOtp({
          type,
          token_hash,
        });
        if (!error && (data?.user || data?.session)) {
          history.replaceState(null, "", window.location.pathname);
          setReady(true);
          return;
        }
        setExpired(true);
        return;
      }

      // 3) PKCE 코드 교환 (?code=... 또는 token=pkce_...로 올 때)
      if (/[?&](code|token)=/.test(url)) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(url);
        if (!error && data?.session) {
          history.replaceState(null, "", window.location.pathname);
          setReady(true);
          return;
        }
        setExpired(true);
        return;
      }

      // 4) 만료 파라미터 처리
      if (searchParams.get("error_code") === "otp_expired") {
        setExpired(true);
        const last = localStorage.getItem("last_reset_email");
        if (last) setEmail(last);
        return;
      }

      // 그 외는 만료 처리
      setExpired(true);
    })();
  }, []);

  async function resend(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr("올바른 이메일을 입력해 주세요.");
      return;
    }
    const supabase = supabaseBrowser();
    const origin = window.location.origin;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/reset`,
    });
    if (error) {
      setErr(error.message);
      return;
    }
    localStorage.setItem("last_reset_email", email);
    setOk(
      "재설정 링크를 다시 보냈습니다. 메일함(스팸함 포함)을 확인해 주세요."
    );
  }

  async function changePw(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);
    if (pw.length < 6) {
      setErr("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (pw !== pw2) {
      setErr("비밀번호가 서로 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.updateUser({ password: pw });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    setOk("비밀번호가 변경되었습니다. 이제 로그인할 수 있습니다.");
    setTimeout(() => router.replace("/login"), 800);
  }

  if (expired) {
    return (
      <main className="flex min-h-[100vh] items-center justify-center bg-[#F8E8EC] py-12">
        <form
          onSubmit={resend}
          className="w-full max-w-[480px] rounded-2xl border bg-[#FFFDF8] p-6 shadow-md"
        >
          <h2 className="text-lg font-semibold" style={{ color: "#6B7A46" }}>
            링크가 만료되었어요
          </h2>
          <p className="mt-2 text-sm text-[#6B6B6B]">
            이메일을 입력하면 새 재설정 링크를 보내드립니다.
          </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4 h-11 w-full rounded-xl border px-3"
            placeholder="you@example.com"
            type="email"
            required
          />
          {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
          {ok && <p className="mt-2 text-sm text-[#2a5a2a]">{ok}</p>}
          <button className="mt-4 h-11 w-full rounded-xl bg-[#6B7A46] text-white hover:bg-[#5F6E3F]">
            재설정 링크 다시 보내기
          </button>
          <div className="mt-2 text-right">
            <a href="/login" className="text-sm text-[#6B7A46] hover:underline">
              로그인으로
            </a>
          </div>
        </form>
      </main>
    );
  }

  if (!ready) return null;

  return (
    <main className="flex min-h-[100vh] items-center justify-center bg-[#F8E8EC] py-12">
      <form
        onSubmit={changePw}
        className="w-full max-w-[480px] rounded-2xl border bg-[#FFFDF8] p-6 shadow-md"
      >
        <h2 className="text-lg font-semibold" style={{ color: "#6B7A46" }}>
          새 비밀번호 설정
        </h2>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="mt-4 h-11 w-full rounded-xl border px-3"
          placeholder="6자 이상"
          autoComplete="new-password"
          required
        />
        <input
          type="password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          className="mt-3 h-11 w-full rounded-xl border px-3"
          placeholder="한 번 더 입력"
          autoComplete="new-password"
          required
        />
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
        {ok && <p className="mt-2 text-sm text-[#2a5a2a]">{ok}</p>}
        <button
          disabled={loading}
          className="mt-4 h-11 w-full rounded-xl bg-[#6B7A46] text-white hover:bg-[#5F6E3F] disabled:opacity-60"
        >
          {loading ? "변경 중…" : "비밀번호 변경"}
        </button>
      </form>
    </main>
  );
}
