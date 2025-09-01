"use client";

import { IconSearch, IconSliders } from "@/app/icons/icon";
import * as React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onOpenFilter: () => void;
  placeholder?: string;
  /** 활성 필터 개수 (뱃지로 표시) */
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

  console.log(activeCount, "activeCount");

  return (
    <div className={["w-full", className].join(" ")}>
      <div
        className={[
          "relative h-12 w-full rounded-[10px] bg-white border",
          "shadow-[0_6px_22px_rgba(0,0,0,0.06)]",
        ].join(" ")}
        style={{ borderColor: "var(--line)" }}
      >
        {/* 돋보기 */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
          <IconSearch />
        </span>

        {/* 입력 */}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-full w-full rounded-full bg-transparent pl-10 pr-14 text-[15px] outline-none placeholder:text-neutral-400"
        />

        {/* 필터 버튼(오른쪽 캡슐) */}
        <button
          type="button"
          onClick={onOpenFilter}
          aria-label="필터 열기"
          className={[
            "absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-3 rounded-full",
            "grid place-items-center",
            "active:scale-95",
          ].join(" ")}
          style={{
            color: hasActive ? "var(--brand-900)" : "",
          }}
        >
          <IconSliders />
        </button>

        {/* 활성 뱃지(작은 점) */}
        {/* {hasActive && (
          <span
            className="absolute right-[4px] top-[4px] h-3.5 w-3.5 flex place-items-center text-[12px] justify-center rounded-full ring-2 ring-white text-white"
            style={{ background: "var(--brand-600)" }}
            aria-hidden
          >
            {activeCount}
          </span>
        )} */}
      </div>
    </div>
  );
}
