"use client";

import React from "react";

type Order = {
  id: string;
  order_no: string | null;
  status: string | null;
  created_at: string;
  total_amount: number | null;
};

export default function AccountClient({
  initialEmail,
  initialProfile,
  initialOrders,
}: {
  initialEmail: string;
  initialProfile: { full_name: string; phone: string };
  initialOrders: Order[];
}) {
  const [tab, setTab] = React.useState<"orders" | "profile">("orders");

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Main */}
      <section className="space-y-6">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("orders")}
            className={btn(tab === "orders")}
          >
            주문내역
          </button>
          <button
            onClick={() => setTab("profile")}
            className={btn(tab === "profile")}
          >
            프로필
          </button>
        </div>

        {tab === "orders" ? (
          <OrdersPanel initialOrders={initialOrders} />
        ) : (
          <ProfilePanel email={initialEmail} initial={initialProfile} />
        )}
      </section>

      {/* Side */}
      <aside className="h-fit rounded-2xl border bg-white p-5">
        <div className="text-base font-semibold">계정</div>
        <ul className="mt-2 text-sm text-neutral-700 space-y-1.5">
          <li>
            이메일: <span className="font-medium">{initialEmail}</span>
          </li>
          <li>
            비밀번호 재설정:{" "}
            <a className="underline text-[#6B7A46]" href="/login?reset=1">
              링크 받기
            </a>
          </li>
          <li>
            비회원 주문조회:{" "}
            <a className="underline text-[#6B7A46]" href="/help">
              Support
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}

function OrdersPanel({ initialOrders }: { initialOrders: Order[] }) {
  const [items, setItems] = React.useState<Order[]>(initialOrders);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  async function loadMore() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/account/orders?p=${page + 1}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("load error");
      const j = await res.json();
      setItems((prev) => [...prev, ...(j.items ?? [])]);
      setPage(j.page ?? page + 1);
      setHasMore(Boolean(j.hasMore));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-5">
      <h2 className="text-lg font-semibold">주문내역</h2>

      {items.length === 0 ? (
        <div className="mt-4 text-sm text-neutral-600">
          주문이 없습니다.{" "}
          <a className="underline text-[#6B7A46]" href="/products">
            상품 보러가기
          </a>
        </div>
      ) : (
        <ul className="mt-4 divide-y">
          {items.map((o) => (
            <li key={o.id} className="py-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="text-sm text-neutral-500">
                  {new Date(o.created_at).toLocaleString("ko-KR")}
                </div>
                <div className="text-[15px] font-medium">
                  주문번호 {o.order_no ?? o.id.slice(0, 8).toUpperCase()}
                </div>
                <div className="mt-0.5 text-sm text-neutral-600">
                  상태: {o.status ?? "확인중"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-semibold">
                  {formatKRW(o.total_amount ?? 0)}
                </div>
                <a
                  className="mt-1 inline-flex h-9 items-center justify-center rounded-lg border px-3 text-sm hover:bg-neutral-50"
                  href={`/orders/${o.id}`}
                >
                  상세보기
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}

      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="mt-4 h-11 w-full rounded-xl border hover:bg-neutral-50"
        >
          {loading ? "불러오는 중…" : "더 보기"}
        </button>
      )}
    </div>
  );
}

function ProfilePanel({
  email,
  initial,
}: {
  email: string;
  initial: { full_name: string; phone: string };
}) {
  const [fullName, setFullName] = React.useState(initial.full_name);
  const [phone, setPhone] = React.useState(initial.phone);
  const [saving, setSaving] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, phone }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message || "저장 실패");
      }
      setMsg("저장되었습니다.");
    } catch (e: any) {
      setMsg(e?.message ?? "오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="rounded-2xl border bg-white p-5 space-y-4">
      <h2 className="text-lg font-semibold">프로필</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-neutral-600">이메일</label>
          <input
            value={email}
            disabled
            className="mt-1 h-11 w-full rounded-xl border bg-neutral-50 px-3 text-neutral-600"
          />
        </div>
        <div>
          <label className="text-sm text-neutral-600">이름</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 h-11 w-full rounded-xl border px-3"
            placeholder="이름"
          />
        </div>
        <div>
          <label className="text-sm text-neutral-600">연락처</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 h-11 w-full rounded-xl border px-3"
            placeholder="010-0000-0000"
          />
        </div>
      </div>

      {msg && <p className="text-sm text-[#6B7A46]">{msg}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="h-11 rounded-xl bg-[#6B7A46] px-5 text-white hover:bg-[#5F6E3F]"
        >
          {saving ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}

function btn(active: boolean) {
  return [
    "h-10 rounded-xl border px-3 text-sm",
    active
      ? "border-[#6B7A46] bg-[#F0F4EC]"
      : "border-[#EAEAEA] bg-white hover:bg-neutral-50",
  ].join(" ");
}

function formatKRW(v: number) {
  try {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(v);
  } catch {
    return `${v.toLocaleString()}원`;
  }
}
