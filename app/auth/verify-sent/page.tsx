// app/auth/verify-sent/page.tsx
"use client";
import VerifyBanner from "@/app/components/VerifyBanner";
import { useSearchParams } from "next/navigation";

export default function VerifySentPage() {
  const params = useSearchParams();
  const email = params.get("email") || "";
  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      {email && <VerifyBanner email={email} />}
      {/* 추가 안내 문구/버튼 등 */}
    </div>
  );
}
