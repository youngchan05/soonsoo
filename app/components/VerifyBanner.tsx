// app/components/VerifyBanner.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { supabaseBrowser } from "@/app/lib/supabaseClient";

type Props = {
  email: string;
  className?: string;
  cooldownSec?: number; // 재전송 쿨다운(기본 60s)
  onClose?: () => void;
};

export default function VerifyBanner({
  email,
  className = "",
  cooldownSec = 60,
  onClose,
}: Props) {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [left, setLeft] = useState(0);
  const timer = useRef<number | null>(null);

  // 메일 서비스 바로가기 (국내 자주 쓰는 서비스 포함)
  const mailUrl = useMemo(() => {
    const domain = (email.split("@")[1] || "").toLowerCase();
    const map: Record<string, string> = {
      "gmail.com": "https://mail.google.com/",
      "naver.com": "https://mail.naver.com/",
      "daum.net": "https://mail.daum.net/",
      "hanmail.net": "https://mail.daum.net/",
      "outlook.com": "https://outlook.live.com/mail/",
      "hotmail.com": "https://outlook.live.com/mail/",
      "nate.com": "https://mail.nate.com/",
    };
    return map[domain];
  }, [email]);

  const startCooldown = (sec: number) => {
    setLeft(sec);
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          if (timer.current) window.clearInterval(timer.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const resend = async () => {
    setPending(true);
    setMsg(null);
    try {
      const supabase = supabaseBrowser();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email, // 사용자가 입력한 그대로
        options: { emailRedirectTo: `${location.origin}/auth/callback?next=/` },
      });
      if (error) throw error;
      setMsg("인증 메일을 다시 보냈어요. 받은 편지함을 확인해 주세요.");
      startCooldown(cooldownSec);
    } catch (e: any) {
      const raw = String(e?.message || "");
      setMsg(
        /rate/i.test(raw)
          ? "재전송이 너무 잦아요. 잠시 후 다시 시도해 주세요."
          : "재전송에 실패했어요. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <section
      className={[
        "rounded-2xl border border-[#EFEFEF] bg-[#FFFDF8] shadow-sm",
        "p-4 md:p-5",
        className,
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      {/* 상단 라벨/닫기 */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge>
            <MailIcon />
            <span className="ml-1.5">이메일 확인 필요</span>
          </Badge>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            aria-label="배너 닫기"
            className="rounded-xl border border-[#EFEFEF] hover:bg-white p-2"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* 본문 */}
      <div className="mt-3 md:mt-4">
        <h3
          className="text-[17px] md:text-[18px] font-semibold tracking-tight"
          style={{ color: "#3F3F3F" }}
        >
          인증 메일을 보냈어요
        </h3>
        <p
          className="mt-1.5 text-[14px] leading-6"
          style={{ color: "#3F3F3F" }}
        >
          아래 주소의 받은 편지함에서 <b>“이메일 확인”</b>을 눌러 로그인 절차를
          완료해 주세요. 링크를 누르면 자동으로 로그인됩니다.
        </p>

        {/* 이메일 뱃지 */}
        <div className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#F8E8EC] px-3 py-2">
          <AccountIcon className="shrink-0" />
          {/* 이메일은 LTR로 강제 표시(다국어 환경에서 주소가 뒤틀리지 않게) */}
          <code
            dir="ltr"
            className="text-[13px] md:text-[14px]"
            style={{ color: "#3F3F3F" }}
          >
            {email}
          </code>
        </div>
      </div>

      {/* 액션 */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
        <button
          onClick={resend}
          disabled={pending || left > 0}
          className="px-3 py-2 rounded-xl bg-black text-white disabled:opacity-60"
        >
          {pending ? (
            <span className="inline-flex items-center gap-2">
              <SpinnerIcon /> <span>재전송 중…</span>
            </span>
          ) : left > 0 ? (
            `재전송 대기 ${left}s`
          ) : (
            <span className="inline-flex items-center gap-2">
              <RefreshIcon /> <span>인증 메일 다시 보내기</span>
            </span>
          )}
        </button>

        {mailUrl && (
          <a
            href={mailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl border border-[#EFEFEF] hover:bg-white inline-flex items-center gap-2"
            style={{ color: "#3F3F3F" }}
          >
            <ExternalIcon /> 메일함 열기
          </a>
        )}
      </div>

      {/* 메시지 */}
      {msg && (
        <p className="mt-2 text-[13px]" style={{ color: "#6B7A46" }}>
          {msg}
        </p>
      )}

      {/* 하단 보조 안내 */}
      <div className="mt-3 text-[12px] leading-5" style={{ color: "#3F3F3F" }}>
        <ul className="list-disc ml-5 space-y-1">
          <li>안 보이면 스팸함/프로모션함도 확인해 주세요.</li>
          <li>링크는 일정 시간 후 만료될 수 있습니다.</li>
        </ul>
      </div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px]"
      style={{
        background: "#F8E8EC",
        color: "#6B7A46",
        border: "1px solid #EFEFEF",
      }}
    >
      {children}
    </span>
  );
}

/* ===== Icons (가벼운 라인 아이콘, 가이드 톤에 맞춰 최소 스타일) ===== */
function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16v16H4z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}
function AccountIcon({ className = "" }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21c0-3.314-3.582-6-8-6s-8 2.686-8 6" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.13-3.36L23 10M1 14l5.36 5.36A9 9 0 0020.49 15" />
    </svg>
  );
}
function ExternalIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}
