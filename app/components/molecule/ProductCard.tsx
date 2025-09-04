"use client";

import Link from "next/link";
import * as React from "react";
import { ProductColor } from "../../types/type";
import { HeartIcon } from "@/icons/Icon";

type Product = {
  id: string;
  name: string;
  price: number;
  sale_price?: number | null;
  thumbnail_url: string | null;
  lead_time_days?: number | null;
  colors?: ProductColor[]; // 👈 추가
  stock?: number | null; // 0이면 품절
};

export default function ProductCardTile({ p }: { p: Product }) {
  const soldOut = p.stock === 0;
  const hasSale =
    typeof p.sale_price === "number" &&
    (p.sale_price as number) > 0 &&
    (p.sale_price as number) < p.price;

  // 위시 토글 (로컬)
  const [wish, setWish] = React.useState(false);
  React.useEffect(() => {
    try {
      const w = JSON.parse(localStorage.getItem("wishlist:v1") || "[]");
      setWish(Array.isArray(w) && w.includes(p.id));
    } catch {}
  }, [p.id]);
  const toggleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const w = JSON.parse(localStorage.getItem("wishlist:v1") || "[]");
      const set = new Set<string>(Array.isArray(w) ? w : []);
      wish ? set.delete(p.id) : set.add(p.id);
      localStorage.setItem("wishlist:v1", JSON.stringify([...set]));
      setWish(!wish);
    } catch {}
  };

  // const addToCart = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if (soldOut) return;
  //   try {
  //     const raw = localStorage.getItem(CART_KEY);
  //     const arr: { productId: string; qty: number }[] = raw
  //       ? JSON.parse(raw)
  //       : [];
  //     const i = arr.findIndex((x) => x.productId === p.id);
  //     i >= 0 ? (arr[i].qty += 1) : arr.push({ productId: p.id, qty: 1 });
  //     localStorage.setItem(CART_KEY, JSON.stringify(arr));
  //     window.dispatchEvent(
  //       new CustomEvent("cart:changed", {
  //         detail: { count: arr.reduce((s, it) => s + (it.qty || 0), 0) },
  //       })
  //     );
  //   } catch {}
  // };

  return (
    <Link href={`/products/${p.id}`} className="block">
      <article
        className="relative overflow-hidden p-4 transition-shadow active:scale-[.99]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--natural-50) 70%, white) 0%, #fff 100%)",
          boxShadow: "0 16px 40px rgba(0,0,0,.06)",
          borderRadius: "var(--radius-lg)", // ✅ 카드 radius
        }}
      >
        {/* 우상단 하트 */}
        <button
          onClick={toggleWish}
          aria-label="wishlist"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center backdrop-blur border bg-white/90"
          style={{
            borderColor: "var(--line)",
            borderRadius: "var(--radius-md)", // ✅ 버튼 radius
          }}
        >
          <HeartIcon filled={wish} />
        </button>

        {/* 메인 이미지 */}
        <div
          className="relative mx-auto mt-2 mb-4 aspect-square w-[78%]"
          style={{ borderRadius: "var(--radius-md)" }} // ✅ 썸네일 radius
        >
          {p.thumbnail_url ? (
            <img
              src={p.thumbnail_url}
              alt={p.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_14px_30px_rgba(0,0,0,.14)] transition-transform group-hover:scale-[1.02]"
              style={{ borderRadius: "var(--radius-md)" }} // ✅ 썸네일 radius
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-neutral-400">
              이미지 없음
            </div>
          )}
        </div>

        {/* 이름 */}
        <h3 className="line-clamp-1 text-[17px] font-medium text-[var(--text-strong)]">
          {p.name}
        </h3>

        {/* 리드타임 */}
        <p className="mt-0.5 text-[12px] text-[var(--text-mute)]">
          리드타임 {p.lead_time_days}일
        </p>

        {/* 가격 */}
        <div className="mt-3 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-[18px] font-bold text-[var(--text-strong)]">
              {formatKRW(hasSale ? (p.sale_price as number) : p.price)}
            </span>
            {hasSale && (
              <span className="text-[13px] text-[var(--text-mute)] line-through">
                {formatKRW(p.price)}
              </span>
            )}
          </div>
        </div>

        {/* 품절 오버레이 */}
        {soldOut && (
          <div
            className="absolute inset-0 grid place-items-center bg-black/30"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            {" "}
            {/* ✅ 카드 radius */}
            <span
              className="px-3 py-1.5 text-sm font-medium text-neutral-900"
              style={{
                borderRadius: "var(--radius-sm)", // ✅ 뱃지 radius
                background: "var(--surface-3)",
              }}
            >
              품절
            </span>
          </div>
        )}
      </article>
    </Link>
  );
}

function formatKRW(v: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(v);
}
