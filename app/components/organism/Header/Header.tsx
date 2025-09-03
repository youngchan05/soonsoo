"use client";

import * as React from "react";
import {
  IconHamburger,
  IconClose,
  IconHome,
  IconShop,
} from "../../../icons/Icon";

type NavItem = { label: string; href: string; icon?: React.ReactNode };

type Props = {
  brand?: React.ReactNode;
  nav?: NavItem[];
  accountHref?: string;
  className?: string;
};

export default function MobileHeader({
  nav = [
    { label: "Home", href: "/", icon: <IconHome width={18} height={18} /> },
    {
      label: "Shop",
      href: "/products",
      icon: <IconShop width={18} height={18} />,
    },
    { label: "Support", href: "/support" },
    { label: "About", href: "/about" },
  ],
  accountHref = "/account",
  className = "",
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* 모바일 앱바 */}
      <div
        className={[
          "sticky top-0 z-50 w-full bg-[var(--surface-1)/85] backdrop-blur",
          className,
        ].join(" ")}
      >
        <div className="h-[56px] px-3 pt-[env(safe-area-inset-top)] flex items-center justify-between">
          {/* 햄버거 버튼 */}
          <button
            type="button"
            aria-label="메뉴 열기"
            className="w-10 h-10 grid place-items-center rounded-xl active:scale-95 transition text-[var(--natural-600)]"
            onClick={() => setOpen(true)}
          >
            <IconHamburger />
          </button>
        </div>
      </div>

      {/* 드로어 */}
      <div
        role="dialog"
        aria-modal="true"
        className={[
          "fixed inset-0 z-[100] transition",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Dim */}
        <div
          className={[
            "absolute inset-0 bg-black/40 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setOpen(false)}
        />

        {/* 패널 */}
        <aside
          className={[
            "absolute left-0 top-0 h-full w-[88%] max-w-[360px]",
            "bg-[var(--surface-2)] border-r border-[var(--line-soft)]",
            "shadow-xl transition-transform duration-300 ease-in-out",
            open ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          {/* 브랜드 */}
          <div className="relative h-[64px] flex items-center justify-center border-b border-[var(--line-soft)] bg-[var(--natural-50)] shadow-sm">
            <span className="text-[18px] font-heading font-semibold text-[var(--natural-700)]">
              SOONSOO
            </span>
            <button
              type="button"
              aria-label="닫기"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-xl active:scale-95 transition text-[var(--stone-600)] hover:text-[var(--natural-700)]"
              onClick={() => setOpen(false)}
            >
              <IconClose />
            </button>
          </div>

          {/* 네비게이션 */}
          <nav className="px-3 py-4 font-body space-y-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] text-[var(--stone-700)] hover:bg-[var(--natural-100)] hover:text-[var(--natural-700)] transition"
              >
                {item.icon && (
                  <span className="text-[var(--stone-600)] group-hover:text-[var(--natural-600)]">
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </a>
            ))}

            {/* 계정 */}
            <div className="mt-4 border-t border-[var(--line-soft)] pt-3">
              <a
                href={accountHref}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] text-[var(--stone-700)] hover:bg-[var(--natural-100)] hover:text-[var(--natural-700)] transition"
              >
                마이페이지
              </a>
            </div>
          </nav>

          {/* 푸터 */}
          <div className="absolute bottom-0 w-full px-4 py-4 border-t border-[var(--line-soft)] text-[12px] text-[var(--text-mute)] bg-[var(--surface-1)]">
            <div className="flex justify-between">
              <a href="/support" className="hover:underline">
                고객센터
              </a>
              <a href="/terms" className="hover:underline">
                이용약관
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
