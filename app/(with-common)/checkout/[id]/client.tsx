"use client";
import { useState } from "react";

export default function CheckoutClient({
  orderId,
  defaultEmail,
  defaultPhone,
  total,
}: {
  orderId: string;
  defaultEmail: string;
  defaultPhone: string;
  total: number;
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState(defaultPhone);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function saveAndContinue() {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactEmail: email,
          contactPhone: phone,
          status: "pending",
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ message: "저장 실패" }));
        throw new Error(j.message);
      }
      // TODO: 결제 페이지/PG로 이동 자리
      window.location.href = `/orders/${orderId}`;
    } catch (e: any) {
      setErr(e?.message ?? "저장 실패");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3 space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className="h-11 w-full rounded-lg border px-3"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="전화번호(선택)"
        className="h-11 w-full rounded-lg border px-3"
      />
      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        onClick={saveAndContinue}
        disabled={loading}
        className="h-11 w-full rounded-xl bg-[#6B7A46] text-white hover:bg-[#5F6E3F] disabled:opacity-60"
      >
        {loading ? "저장 중…" : `다음 (총 ${total.toLocaleString()}원)`}
      </button>
    </div>
  );
}
