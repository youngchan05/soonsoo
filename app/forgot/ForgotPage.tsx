"use client";
import React, { useId, useState } from "react";

export default function ForgotPage({
  brand = "SOONSOO",
  onRequestReset,
  defaultEmail = "",
}: {
  brand?: string;
  onRequestReset: (email: string) => Promise<void>;
  defaultEmail?: string;
}) {
  const emailId = useId();
  const [email, setEmail] = useState(defaultEmail);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setInfo(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr("이메일 형식을 확인해 주세요.");
      return;
    }
    try {
      setLoading(true);
      await onRequestReset(email);
      setInfo(
        "재설정 링크를 이메일로 보냈습니다. 메일함(스팸함 포함)을 확인해 주세요."
      );
    } catch (e: any) {
      setErr(e?.message ?? "요청에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col justify-center min-h-[100vh] w-full bg-[#F8E8EC] py-12">
      <div className="mx-auto w-full max-w-[1248px] px-4">
        <section className="mx-auto w-full max-w-[480px] rounded-2xl border border-[#EFEFEF] bg-[#FFFDF8] p-6 md:p-8 shadow-md">
          <header className="mb-6 text-center">
            <h1
              className="text-[22px] font-semibold tracking-tight"
              style={{
                color: "#6B7A46",
                fontFamily: `'Noto Serif KR', ui-serif, serif`,
              }}
            >
              {brand}
            </h1>
            <p
              className="mt-1 text-[14px] text-[#6B6B6B]"
              style={{ fontFamily: `'Noto Sans KR', ui-sans-serif, system-ui` }}
            >
              가입한 이메일로 비밀번호 재설정 링크를 보내드립니다.
            </p>
          </header>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="space-y-1.5">
              <label htmlFor={emailId} className="text-[13px] text-[#4A4A4A]">
                이메일
              </label>
              <input
                id={emailId}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#EAEAEA] bg-white px-3 outline-none focus:border-[#6B7A46]"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            {err && <p className="text-[13px] text-red-600">{err}</p>}
            {info && <p className="text-[13px] text-[#2a5a2a]">{info}</p>}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl text-white transition-colors disabled:opacity-60 bg-[#6B7A46] hover:bg-[#5F6E3F]"
            >
              {loading ? "전송 중…" : "재설정 링크 보내기"}
            </button>

            <div className="text-right">
              <a
                href="/login"
                className="text-[13px] text-[#6B7A46] hover:underline"
              >
                로그인으로 돌아가기
              </a>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
