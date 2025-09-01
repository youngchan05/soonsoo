"use client";

import { IconCart } from "@/app/icons/icon";
import * as React from "react";

type Props = {
  onCart?: () => void;
  href?: string;
  className?: string;
};

const CART_KEYS = ["cart:v1", "cart"]; // v1(새 포맷), 레거시 호환

export default function CartBadgeButton({
  onCart,
  href = "/cart",
  className = "grid place-items-center rounded-md hover:bg-[var(--natural-100)] relative transition",
}: Props) {
  const [mounted, setMounted] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const readCount = React.useCallback(() => {
    try {
      const sum = (arr: any[]) =>
        arr.reduce((s, it: any) => s + (Number(it?.qty) || 0), 0);

      // v1
      const v1 = JSON.parse(localStorage.getItem("cart:v1") || "[]");
      const c1 = Array.isArray(v1) ? sum(v1) : 0;

      // legacy
      const v0 = JSON.parse(localStorage.getItem("cart") || "[]");
      const c0 = Array.isArray(v0) ? sum(v0) : 0;

      return Math.max(c1, c0);
    } catch {
      return 0;
    }
  }, []);

  React.useEffect(() => {
    setMounted(true);
    const update = () => setCount(readCount());
    update();

    const onStorage = (e: StorageEvent) => {
      if (!e.key || CART_KEYS.includes(e.key)) update();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("cart:changed", update as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart:changed", update as EventListener);
    };
  }, [readCount]);

  const Badge =
    mounted && count > 0 ? (
      <span
        className="absolute -top-2 -right-3 min-w-[20px] h-5 px-1 rounded-full text-white text-[11px] leading-5 text-center shadow-sm"
        style={{
          background: "var(--terra-500)",
          borderRadius: "var(--radius-sm)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        {count > 99 ? "99+" : count}
      </span>
    ) : null;

  if (onCart) {
    return (
      <button
        type="button"
        onClick={onCart}
        aria-label="장바구니 열기"
        className={className}
      >
        <IconCart className="text-[var(--stone-700)]" />
        {Badge}
      </button>
    );
  }

  return (
    <div aria-label="장바구니" className={className}>
      <IconCart className="text-[var(--stone-700)]" />
      {Badge}
    </div>
  );
}
