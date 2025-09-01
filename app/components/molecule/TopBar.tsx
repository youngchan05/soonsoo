"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IconBackThin } from "@/app/icons/icon";

type Props = {
  title?: string;
  backHref?: string;
  rightSlot?: React.ReactNode;
  variant?: "solid" | "transparent";
  className?: string;
};

export default function TopBar({
  title,
  backHref,
  rightSlot,
  variant = "transparent",
  className = "",
}: Props) {
  const router = useRouter();

  const bg =
    variant === "solid"
      ? "bg-[var(--surface-1)]/95 border-b border-[var(--line-soft)]"
      : "bg-[var(--surface-1)]/30 backdrop-blur";

  const textColor =
    variant === "solid"
      ? "text-[var(--natural-700)]"
      : "text-[var(--stone-800)]";

  return (
    <div
      className={[
        "sticky top-0 z-50",
        bg,
        "h-[60px]",
        "px-3",
        "pt-[env(safe-area-inset-top)]",
        className,
      ].join(" ")}
      role="toolbar"
      aria-label="페이지 상단바"
    >
      <div className="mx-auto flex h-full max-w-[1248px] items-center justify-between">
        {/* Back */}
        <button
          type="button"
          onClick={() =>
            backHref ? (window.location.href = backHref) : router.back()
          }
          aria-label="뒤로가기"
          className="grid h-10 w-10 place-items-center rounded-md active:scale-95 transition"
        >
          <IconBackThin className="w-5 h-5 text-[var(--stone-700)] group-hover:text-[var(--natural-600)]" />
        </button>

        {/* Title */}
        <div
          className={[
            "pointer-events-none absolute inset-x-0 mx-auto w-fit text-[15px] font-semibold",
            textColor,
          ].join(" ")}
          aria-live="polite"
        >
          {title}
        </div>

        {/* Right slot */}
        <div className="h-10 min-w-10 grid place-items-center">
          {rightSlot ?? <span />}
        </div>
      </div>
    </div>
  );
}
