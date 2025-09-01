"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconShop, IconUser } from "../../icons/icon";
import CartBadgeButton from "../molecule/CartBadgeButton";
import { haptics } from "../../utils/haptics";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  match?: (path: string) => boolean;
};

export default function NavBar() {
  const path = usePathname() || "/";
  const items: Item[] = [
    {
      href: "/",
      label: "Home",
      icon: <IconHome width={22} height={22} />,
      match: (p) => p === "/",
    },
    {
      href: "/products",
      label: "Shop",
      icon: <IconShop width={22} height={22} />,
      match: (p) => p.startsWith("/products"),
    },
    {
      href: "/cart",
      label: "Cart",
      icon: <CartBadgeButton href="/cart" />,
      match: (p) => p.startsWith("/cart") || p.startsWith("/checkout"),
    },
    {
      href: "/account",
      label: "My",
      icon: <IconUser width={22} height={22} />,
      match: (p) => p.startsWith("/account") || p.startsWith("/login"),
    },
  ];

  const activeIdx = items.findIndex((it) =>
    it.match ? it.match(path) : path === it.href
  );

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <nav className="mx-auto w-full max-w-[640px]">
        <div
          className="relative grid grid-cols-4 items-center border backdrop-blur"
          style={{
            background: "color-mix(in oklab, var(--surface-1) 92%, white)",
            borderColor: "var(--line-soft)",
            boxShadow: "0 6px 20px rgba(0,0,0,.04)",
            height: "64px",
          }}
        >
          {/* 액티브 하이라이트 (연한 배경) */}
          <span
            aria-hidden
            className="absolute top-1 bottom-1 transition-all duration-200"
            style={{
              background: "var(--natural-50)",
              border: "1px solid var(--natural-200)",
              borderRadius: "var(--radius-md)",
              width: "25%",
              transform: `translateX(${activeIdx * 100}%)`,
              boxShadow: "0 2px 6px rgba(0,0,0,.04)",
            }}
          />

          {items.map((it, i) => {
            const active = i === activeIdx;
            return (
              <Link
                key={it.href}
                href={it.href}
                className="relative z-10 group grid place-items-center gap-1"
                aria-current={active ? "page" : undefined}
                onClick={() => haptics.light()}
              >
                <div
                  className={[
                    "grid place-items-center transition-transform duration-150",
                    active ? "scale-100" : "scale-95",
                  ].join(" ")}
                  style={{
                    color: active ? "var(--natural-700)" : "var(--stone-600)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  {it.icon}
                </div>
                <span
                  className="text-[11px]"
                  style={{
                    color: active ? "var(--natural-700)" : "var(--stone-600)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {it.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
