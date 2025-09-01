"use client";
import React, { useId, useState } from "react";

type AccountPayload = { email: string; password: string };
type OrderPayload = { orderNo: string; contact: string }; // contact: email 또는 전화번호

// components/LoginPage.tsx (일부만 발췌)
type Props = {
  brand?: string;
  onAccountLogin: (p: { email: string; password: string }) => Promise<void>;
  onOrderLogin: (p: { orderNo: string; contact: string }) => Promise<void>;
  onResendVerify?: (email: string) => Promise<void>; // 🔸 추가
  defaultEmail?: string; // 🔸 선택
  verifyHint?: boolean; // 🔸 선택
};

export default function LoginPage({
  brand = "SOONSOO",
  onAccountLogin,
  onOrderLogin,
}: Props) {
  const [tab, setTab] = useState<"account" | "order">("account");

  return (
    <main className="flex flex-col justify-center min-h-[100vh] w-full bg-[#F8E8EC] py-12">
      <div className="mx-auto w-full max-w-[1248px] px-4">
        {/* 카드 패널 */}
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
              로그인 방법을 선택해주세요
            </p>
          </header>

          {/* 탭 */}
          <div
            role="tablist"
            aria-label="login method"
            className="grid grid-cols-2 gap-2 mb-6"
          >
            <button
              role="tab"
              aria-selected={tab === "account"}
              onClick={() => setTab("account")}
              className={`h-11 rounded-xl border text-[14px] transition-colors ${
                tab === "account"
                  ? "border-[#6B7A46] bg-[#F0F4EC] text-[#2a2a2a]"
                  : "border-[#EAEAEA] bg-white text-[#5A5A5A] hover:bg-[#FAFAFA]"
              }`}
            >
              계정 로그인
            </button>
            <button
              role="tab"
              aria-selected={tab === "order"}
              onClick={() => setTab("order")}
              className={`h-11 rounded-xl border text-[14px] transition-colors ${
                tab === "order"
                  ? "border-[#6B7A46] bg-[#F0F4EC] text-[#2a2a2a]"
                  : "border-[#EAEAEA] bg-white text-[#5A5A5A] hover:bg-[#FAFAFA]"
              }`}
            >
              주문번호 로그인
            </button>
          </div>

          {tab === "account" ? (
            <AccountForm onSubmit={onAccountLogin} />
          ) : (
            <OrderForm onSubmit={onOrderLogin} />
          )}
        </section>
      </div>
    </main>
  );
}

/* ================== Forms ================== */

function AccountForm({
  onSubmit,
  onResendVerify, // (선택) 인증 메일 재전송
  defaultEmail, // (선택) 쿼리로 프리필된 이메일
  verifyHint, // (선택) "방금 인증 메일 보냈습니다" 안내 노출
}: {
  onSubmit: (p: { email: string; password: string }) => Promise<void>;
  onResendVerify?: (email: string) => Promise<void>;
  defaultEmail?: string;
  verifyHint?: boolean;
}) {
  const emailId = useId();
  const passId = useId();

  const [email, setEmail] = useState(defaultEmail ?? "");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(
    verifyHint
      ? "인증 메일을 보냈습니다. 메일함(스팸함 포함)을 확인해 주세요."
      : null
  );
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const isValidEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setInfo(null);

    if (!isValidEmail(email)) {
      setErr("이메일 형식을 확인해 주세요.");
      return;
    }
    if (password.length < 6) {
      setErr("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({ email, password });
    } catch (e: any) {
      // 로그인 래퍼에서 미인증 에러 메시지를 통일해 던지도록 권장
      setErr(e?.message ?? "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!onResendVerify) return;
    setErr(null);
    setInfo(null);
    if (!isValidEmail(email)) {
      setErr("재전송하려면 올바른 이메일을 입력해 주세요.");
      return;
    }
    try {
      await onResendVerify(email);
      setInfo(
        "인증 메일을 다시 보냈습니다. 메일함(스팸함 포함)을 확인해 주세요."
      );
    } catch (e: any) {
      setErr(
        e?.message ?? "재전송에 실패했습니다. 잠시 후 다시 시도해 주세요."
      );
    }
  }

  const shouldShowResend =
    !!onResendVerify &&
    (Boolean(err && err.includes("인증")) || Boolean(verifyHint));

  return (
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
        <div className="relative">
          <input
            id={passId}
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-xl border border-[#EAEAEA] bg-white px-3 pr-12 outline-none focus:border-[#6B7A46]"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-[#6B7A46] px-2 py-1 rounded hover:bg-[#F0F4EC]"
            aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPw ? "숨기기" : "보기"}
          </button>
        </div>
      </div>

      {err && <p className="text-[13px] text-red-600">{err}</p>}
      {info && <p className="text-[13px] text-[#2a5a2a]">{info}</p>}

      {shouldShowResend && (
        <button
          type="button"
          onClick={handleResend}
          className="h-10 w-full rounded-xl border border-[#6B7A46] text-[#6B7A46] hover:bg-[#F0F4EC] transition-colors"
        >
          인증 메일 다시 보내기
        </button>
      )}

      <button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl text-white transition-colors disabled:opacity-60 bg-[#6B7A46] hover:bg-[#5F6E3F]"
      >
        {loading ? "로그인 중…" : "로그인"}
      </button>
      <div className="flex justify-between">
        <a
          href="/signup"
          className="text-[13px] text-[#6B7A46] hover:underline"
        >
          회원 가입
        </a>
        <a
          href="/forgot"
          className="text-[13px] text-[#6B7A46] hover:underline"
        >
          비밀번호 찾기
        </a>
      </div>
    </form>
  );
}

function OrderForm({
  onSubmit,
}: {
  onSubmit: (p: { orderNo: string; contact: string }) => Promise<void>;
}) {
  const orderId = useId();
  const contactId = useId();
  const [orderNo, setOrderNo] = useState("");
  const [contact, setContact] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validContact(v: string) {
    const emailOk = /^\S+@\S+\.\S+$/.test(v);
    const phoneOk = /^[0-9+\-\s]{7,}$/.test(v);
    return emailOk || phoneOk;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!orderNo.trim()) {
      setErr("주문번호를 입력해 주세요.");
      return;
    }
    if (!validContact(contact)) {
      setErr("연락처(이메일 또는 전화번호)를 정확히 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({ orderNo: orderNo.trim(), contact: contact.trim() });
    } catch (e: any) {
      setErr(e?.message ?? "주문 확인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1.5">
        <label htmlFor={orderId} className="text-[13px] text-[#4A4A4A]">
          주문번호
        </label>
        <input
          id={orderId}
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
          className="h-11 w-full rounded-xl border border-[#EAEAEA] bg-white px-3 outline-none focus:border-[#6B7A46]"
          placeholder="예: FS-2025-001234"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor={contactId} className="text-[13px] text-[#4A4A4A]">
          연락처 (이메일 또는 전화번호)
        </label>
        <input
          id={contactId}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="h-11 w-full rounded-xl border border-[#EAEAEA] bg-white px-3 outline-none focus:border-[#6B7A46]"
          placeholder="you@example.com 또는 010-1234-5678"
          required
        />
      </div>

      {err && <p className="text-[13px] text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl text-white transition-colors disabled:opacity-60"
        style={{ backgroundColor: "#6B7A46" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#5F6E3F")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#6B7A46")
        }
      >
        {loading ? "확인 중…" : "주문 확인하기"}
      </button>

      <p className="text-[12px] text-[#8C8C8C]">
        비계정 주문은 주문번호와 연락처로 주문 조회만 가능합니다. 민감 정보는
        저장하지 않습니다.
      </p>
    </form>
  );
}
