"use client";
import { ProductColor } from "@/app/types/type";
import * as React from "react";

// 색상 → 배경색 매핑 (브랜드 톤과 어울리게 파스텔)
const BG: Record<ProductColor, string> = {
  white: "#F6F6F6",
  ivory: "#F3EEDD",
  pink: "#F7D3DF",
  peach: "#FFE0CC",
  red: "#FFD7D7",
  yellow: "#FFF4B8",
  orange: "#FFE3C0",
  purple: "#E5D7FF",
  lavender: "#EADDF7",
  blue: "#D9E9FF",
  green: "#DDEDD8",
  pastel: "#EFEAF8",
  vivid: "#E7D9FF",
};

const LABEL: Record<ProductColor, string> = {
  white: "White",
  ivory: "Ivory",
  pink: "Pink",
  peach: "Peach",
  red: "Red",
  yellow: "Yellow",
  orange: "Orange",
  purple: "Purple",
  lavender: "Lavender",
  blue: "Blue",
  green: "Green",
  pastel: "Pastel",
  vivid: "Vivid",
};

export function ColorChips({
  colors,
  className = "",
}: {
  colors?: ProductColor[] | null;
  className?: string;
}) {
  if (!colors || colors.length === 0) return <></>;

  return (
    <div className={className}>
      {/* <h3 className="mb-2 text-sm font-medium text-[#2a2a2a]">Color</h3> */}
      <ul className="flex flex-wrap gap-8">
        {colors.map((c) => (
          <li key={c} className="flex items-center gap-2">
            <span
              aria-hidden
              className="h-5 w-5 rounded-full ring-1 ring-black/10"
              style={{ background: BG[c] }}
            />
            {/* <span className="text-sm text-[#2a2a2a]">{LABEL[c]}</span> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
