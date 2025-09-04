"use client";

import { IconSearch, IconSliders } from "@/icons/Icon";
import * as React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onOpenFilter: () => void;
  placeholder?: string;
  activeCount?: number;
  className?: string;
};

export default function SearchFilterBar({
  value,
  onChange,
  onOpenFilter,
  placeholder = "검색…",
  activeCount = 0,
  className = "",
}: Props) {
  const hasActive = activeCount > 0;

  return (
    <div className={["w-full", className].join(" ")}>
      <div
        className="relative h-12 w-full rounded-xl border shadow-[var(--shadow-soft)] bg-[var(--surface-1)]"
        style={{ borderColor: "var(--line)" }}
      >
        {/* 돋보기 */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--stone-500)]">
          <IconSearch />
        </span>

        {/* 입력 */}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-full w-full rounded-full bg-transparent pl-10 pr-14 text-[15px] outline-none placeholder:text-[var(--stone-400)] text-[var(--stone-800)]"
        />

        {/* 필터 버튼 */}
        <button
          type="button"
          onClick={onOpenFilter}
          aria-label="필터 열기"
          className={[
            "absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-3 rounded-full",
            "grid place-items-center transition active:scale-95",
            hasActive
              ? "bg-[var(--natural-700)] text-white shadow-md"
              : "text-[var(--stone-600)] hover:bg-[var(--surface-2)]",
          ].join(" ")}
        >
          <IconSliders />
        </button>

        {/* 활성 뱃지 */}
        {hasActive && (
          <span
            className="absolute right-[2px] top-[2px] min-w-[18px] h-4 flex items-center justify-center text-[11px] rounded-full ring-2 text-white"
            style={{
              background: "var(--terra-500)",
              borderRadius: "9999px",
            }}
            aria-hidden
          >
            {activeCount}
          </span>
        )}
      </div>
    </div>
  );
}
