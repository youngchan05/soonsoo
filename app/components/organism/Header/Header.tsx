"use client";

import * as React from "react";
import CartBadgeButton from "../../molecule/CartBadgeButton";
import {
  IconHamburger,
  IconClose,
  IconHome,
  IconShop,
  IconUser,
} from "../../../icons/icon";

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
          {/* 왼쪽 햄버거 */}
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

      {/* 풀스크린 드로어 */}
      <div
        role="dialog"
        aria-modal="true"
        className={[
          "fixed inset-0 z-50 transition",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Dim */}
        <div
          className={[
            "absolute inset-0 bg-black/35 transition-opacity",
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
          {/* 상단 브랜드 영역 */}
          <div className="h-[64px] px-4 pt-[env(safe-area-inset-top)] flex items-center justify-between border-b border-[var(--line-soft)] bg-[var(--natural-50)] shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-heading font-semibold text-[var(--natural-700)]">
                SOONSOO
              </span>
            </div>
            <button
              type="button"
              aria-label="닫기"
              className="w-10 h-10 grid place-items-center rounded-xl active:scale-95 transition"
              onClick={() => setOpen(false)}
            >
              <IconClose />
            </button>
          </div>

          {/* 네비게이션 리스트 */}
          <nav className="px-2 py-3 font-body space-y-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] text-[var(--stone-700)] transition relative group"
              >
                {/* 좌측 인디케이터 */}
                <span className="absolute left-0 top-0 h-full w-1 rounded-r bg-transparent group-hover:bg-[var(--terra-400)] transition" />
                {/* 라벨 */}
                <span className="group-hover:translate-x-1 transition">
                  {item.label}
                </span>
              </a>
            ))}

            <div className="mt-4 border-t border-[var(--line-soft)] pt-3">
              <a
                href={accountHref}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] text-[var(--stone-700)] hover:bg-[var(--natural-100)] transition"
              >
                마이페이지
              </a>
            </div>
          </nav>

          {/* 하단 브랜드/푸터 */}
          <div className="absolute bottom-0 w-full px-4 py-4 border-t border-[var(--line-soft)] text-[13px] text-[var(--text-mute)] bg-[var(--surface-1)]">
            <p className="mb-2 font-heading text-[14px] text-[var(--natural-700)]">
              🌸 Bloom with SOONSOO
            </p>
            <div className="flex justify-between">
              <a href="/support">고객센터</a>
              <a href="/terms">이용약관</a>
              <a href="https://instagram.com" target="_blank">
                Instagram
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
