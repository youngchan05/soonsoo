"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Cat } from "@/app/types/type";

type Option = { id: Cat; label: string };

type Props = {
  value?: Cat;
  onChange?: (next: Cat) => void;
  options?: Option[];
  title?: string;
  seeAllHref?: string;
  className?: string;
};

const OPTIONS: Option[] = [
  { id: "all", label: "All" },
  { id: "bouquet", label: "Bouquets" },
  { id: "basket", label: "Flower Basket" },
  { id: "Flower Box", label: "Flower Box" },
];

export default function CategoryFilter({
  value,
  onChange,
  options = OPTIONS,
  title = "Products",
  seeAllHref = "/products",
  className = "",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const urlCat = (params.get("category") ?? "all") as Cat;
  const selected = (value ?? urlCat) as Cat;

  function setCat(next: Cat) {
    onChange?.(next);

    const sp = new URLSearchParams(params.toString());
    if (next === "all") sp.delete("category");
    else sp.set("category", next);
    router.push(`${pathname}?${sp.toString()}`, { scroll: false });
  }

  return (
    <section className={["w-full", className].join(" ")}>
      {/* 타이틀 라인 */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <h2
          className="text-[16px] font-semibold"
          style={{ color: "var(--text-strong)" }}
        >
          {title}
        </h2>
        {seeAllHref && (
          <a
            href={seeAllHref}
            className="text-[14px] font-medium"
            style={{ color: "var(--accent-500)" }}
          >
            See All
          </a>
        )}
      </div>

      {/* 필 가로 스크롤 */}
      <div className="relative">
        <div
          role="tablist"
          aria-label="Filter by category"
          className="flex gap-4 overflow-x-auto px-4 pb-6 no-scrollbar"
        >
          {options.map((opt) => {
            const active = selected === opt.id;
            return (
              <button
                key={opt.id}
                role="tab"
                aria-selected={active}
                onClick={() => setCat(opt.id)}
                className={[
                  "shrink-0 h-10 rounded-full px-5 text-[14px] transition-all active:scale-95",
                  active
                    ? "font-semibold"
                    : "border bg-[var(--surface-3)] hover:bg-[var(--terra-100)]",
                ].join(" ")}
                style={
                  active
                    ? {
                        background: "var(--natural-200)",
                        border: "1px solid var(--natural-300)",
                        color: "var(--text-strong)",
                        boxShadow: "0 8px 22px rgba(127,157,118,0.35)", // natural-500 변형
                      }
                    : {
                        borderColor: "var(--line-soft)",
                        color: "var(--text)",
                      }
                }
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* 좌/우 페이드 */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-[var(--surface-1)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-[var(--surface-1)] to-transparent" />
      </div>
    </section>
  );
}
