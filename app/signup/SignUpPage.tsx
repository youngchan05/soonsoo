"use client";
import React, { useId, useState } from "react";

type Props = {
  brand?: string;
  onSignUp: (p: { email: string; password: string }) => Promise<void>;
};

export default function SignUpPage({ brand = "SOONSOO", onSignUp }: Props) {
  const emailId = useId();
  const passId = useId();
  const pass2Id = useId();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErr("이메일 형식을 확인해 주세요.");
      return;
    }
    if (pw.length < 6) {
      setErr("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (pw !== pw2) {
      setErr("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);
      await onSignUp({ email, password: pw });
    } catch (e: any) {
      setErr(e?.message ?? "회원가입에 실패했습니다.");
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
              이메일과 비밀번호로 가입해 주세요
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

            <div className="space-y-1.5">
              <label htmlFor={passId} className="text-[13px] text-[#4A4A4A]">
                비밀번호
              </label>
              <input
                id={passId}
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#EAEAEA] bg-white px-3 outline-none focus:border-[#6B7A46]"
                placeholder="6자 이상"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor={pass2Id} className="text-[13px] text-[#4A4A4A]">
                비밀번호 확인
              </label>
              <input
                id={pass2Id}
                type="password"
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#EAEAEA] bg-white px-3 outline-none focus:border-[#6B7A46]"
                placeholder="한 번 더 입력"
                autoComplete="new-password"
                required
              />
            </div>

            {err && <p className="text-[13px] text-red-600">{err}</p>}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl text-white transition-colors disabled:opacity-60 bg-[#6B7A46] hover:bg-[#5F6E3F]"
            >
              {loading ? "가입 중…" : "가입하기"}
            </button>

            <div className="text-right">
              <a
                href="/login"
                className="text-[13px] text-[#6B7A46] hover:underline"
              >
                이미 계정이 있으신가요? 로그인
              </a>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
