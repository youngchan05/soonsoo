"use client";

import * as React from "react";
import { Cat, CATS, COLOR_SWATCHES, ProductColor } from "@/app/types/type";

type Props = {
  open: boolean;
  onClose: () => void;

  categories: Cat[];
  colors: ProductColor[];
  minPrice?: number;
  maxPrice?: number;

  onApply: (v: {
    categories: Cat[];
    colors: ProductColor[];
    minPrice?: number;
    maxPrice?: number;
  }) => void;

  onReset?: () => void;
};

export default function BottomSheetFilter({
  open,
  onClose,
  categories,
  colors,
  minPrice,
  maxPrice,
  onApply,
  onReset,
}: Props) {
  const [draftCats, setDraftCats] = React.useState<Cat[]>(
    categories?.length ? categories : (["all"] as Cat[])
  );
  const [draftColors, setDraftColors] = React.useState<ProductColor[]>(colors);
  const [minV, setMinV] = React.useState<number | undefined>(minPrice);
  const [maxV, setMaxV] = React.useState<number | undefined>(maxPrice);

  React.useEffect(() => {
    if (!open) return;
    setDraftCats(categories?.length ? categories : (["all"] as Cat[]));
    setDraftColors(colors);
    setMinV(minPrice);
    setMaxV(maxPrice);

    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open, categories, colors, minPrice, maxPrice]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const toggleColor = (id: ProductColor) =>
    setDraftColors((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleCat = (id: Cat) => {
    setDraftCats((prev) => {
      if (id === "all") return ["all"];
      const set = new Set(prev);
      set.delete("all");
      set.has(id) ? set.delete(id) : set.add(id);
      const next = Array.from(set) as Cat[];
      return next.length ? next : (["all"] as Cat[]);
    });
  };

  const apply = () => {
    onApply({
      categories: draftCats,
      colors: draftColors,
      minPrice: minV,
      maxPrice: maxV,
    });
    onClose();
  };

  const reset = () => {
    setDraftCats(["all"]);
    setDraftColors([]);
    setMinV(undefined);
    setMaxV(undefined);
    onReset?.();
  };

  // 가격 슬라이더
  const RANGE_MIN = 0;
  const RANGE_MAX = 500000;
  const STEP = 1000;
  const clamp = (v: number, lo: number, hi: number) =>
    Math.min(Math.max(v, lo), hi);
  const minVal = clamp(
    minV ?? RANGE_MIN,
    RANGE_MIN,
    (maxV ?? RANGE_MAX) - STEP
  );
  const maxVal = clamp(
    maxV ?? RANGE_MAX,
    (minV ?? RANGE_MIN) + STEP,
    RANGE_MAX
  );
  const span = RANGE_MAX - RANGE_MIN;
  const minPct = ((minVal - RANGE_MIN) / span) * 100;
  const maxPct = ((maxVal - RANGE_MIN) / span) * 100;

  // 스와이프-다운 닫기
  const [dragging, setDragging] = React.useState(false);
  const [dy, setDy] = React.useState(0);
  const startY = React.useRef<number | null>(null);
  const TH = 100;

  const onGrabDown = (e: React.PointerEvent) => {
    startY.current = e.clientY;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onGrabMove = (e: React.PointerEvent) => {
    if (!dragging || startY.current == null) return;
    setDy(Math.max(0, e.clientY - startY.current));
  };
  const onGrabEnd = () => {
    if (!dragging) return;
    const shouldClose = dy > TH;
    setDragging(false);
    setDy(0);
    if (shouldClose) onClose();
  };

  return (
    <div
      aria-hidden={!open}
      className={[
        "fixed inset-0 z-[60] transition",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      <aside
        className={[
          "absolute inset-x-0 bottom-0 mx-auto w-full max-w-[520px]",
          "rounded-t-3xl border bg-[var(--surface-2)] shadow-[var(--shadow-card)] transition-transform will-change-transform",
          open && !dragging ? "translate-y-0" : open ? "" : "translate-y-full",
        ].join(" ")}
        style={{
          borderColor: "var(--line-soft)",
          transform: dragging ? `translateY(${dy}px)` : undefined,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Filter"
      >
        {/* grabber */}
        <div
          className="grid place-items-center pt-3 pb-1 cursor-grab active:cursor-grabbing select-none"
          onPointerDown={onGrabDown}
          onPointerMove={onGrabMove}
          onPointerUp={onGrabEnd}
          onPointerCancel={onGrabEnd}
        >
          <span className="h-1.5 w-12 rounded-full bg-[var(--stone-300)]" />
        </div>

        {/* header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--line-soft)]">
          <h3 className="text-lg font-semibold text-[var(--ink-900)]">
            Filter
          </h3>
          <button
            onClick={reset}
            className="text-[14px] font-medium text-[var(--natural-500)] hover:text-[var(--natural-600)] transition"
          >
            Reset All
          </button>
        </div>

        {/* content */}
        <div className="max-h-[70vh] overflow-y-auto px-5 pb-4">
          {/* Category */}
          <Section title="Category">
            <div className="flex flex-wrap gap-2">
              {CATS.map((c) => {
                const active = draftCats.includes("all")
                  ? c.id === "all"
                  : draftCats.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleCat(c.id)}
                    aria-pressed={active}
                    className={[
                      "h-10 rounded-full border px-4 text-[14px] transition active:scale-95",
                      active
                        ? "bg-[var(--natural-600)] text-white shadow-md"
                        : "bg-[var(--surface-3)] text-[var(--ink-700)] hover:border-[var(--natural-200)]",
                    ].join(" ")}
                    style={{
                      borderColor: active ? "transparent" : "var(--line)",
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Price */}
          <Section title="Price">
            <div className="flex gap-3">
              <InputBox
                label="Min."
                value={minV ?? ""}
                onChange={(v) => {
                  const n = v === "" ? undefined : Number(v);
                  if (n === undefined) return setMinV(undefined);
                  setMinV(clamp(n, RANGE_MIN, (maxV ?? RANGE_MAX) - STEP));
                }}
                placeholder="0"
              />
              <InputBox
                label="Max."
                value={maxV ?? ""}
                onChange={(v) => {
                  const n = v === "" ? undefined : Number(v);
                  if (n === undefined) return setMaxV(undefined);
                  setMaxV(clamp(n, (minV ?? RANGE_MIN) + STEP, RANGE_MAX));
                }}
                placeholder="500,000"
              />
            </div>

            {/* double slider */}
            <div className="mt-4 px-1 relative h-6">
              <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[var(--stone-200)]" />
              <div
                className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${minPct}%`,
                  right: `${100 - maxPct}%`,
                  background: "var(--natural-500)",
                }}
              />
              <input
                type="range"
                min={RANGE_MIN}
                max={RANGE_MAX}
                step={STEP}
                value={minVal}
                onChange={(e) =>
                  setMinV(
                    clamp(Number(e.target.value), RANGE_MIN, maxVal - STEP)
                  )
                }
                className="range-thumb absolute top-0 h-6 appearance-none bg-transparent"
                style={{ left: 0, right: `${100 - maxPct}%` }}
                aria-label="최소 가격"
              />
              <input
                type="range"
                min={RANGE_MIN}
                max={RANGE_MAX}
                step={STEP}
                value={maxVal}
                onChange={(e) =>
                  setMaxV(
                    clamp(Number(e.target.value), minVal + STEP, RANGE_MAX)
                  )
                }
                className="range-thumb absolute top-0 h-6 appearance-none bg-transparent"
                style={{ left: `${minPct}%`, right: 0 }}
                aria-label="최대 가격"
              />
              <style jsx>{`
                .range-thumb::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  height: 18px;
                  width: 18px;
                  border-radius: 9999px;
                  background: var(--natural-600);
                  border: 3px solid #fff;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
                }
                .range-thumb::-moz-range-thumb {
                  height: 18px;
                  width: 18px;
                  border-radius: 9999px;
                  background: var(--natural-600);
                  border: 3px solid #fff;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
                }
              `}</style>
            </div>
          </Section>

          {/* Color */}
          <Section title="Color">
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {COLOR_SWATCHES.map((c) => {
                const active = draftColors.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleColor(c.id)}
                    aria-pressed={active}
                    className="relative h-10 w-10 rounded-full border transition"
                    style={{
                      borderColor: active
                        ? "var(--natural-500)"
                        : "var(--line)",
                      boxShadow: active ? "0 8px 20px rgba(0,0,0,.12)" : "none",
                      background: "#fff",
                    }}
                    title={c.id}
                  >
                    <span
                      className="absolute inset-1 rounded-full ring-1"
                      style={{
                        background: c.bg,
                        boxShadow: c.ring
                          ? `inset 0 0 0 1px ${c.ring}`
                          : undefined,
                      }}
                    />
                    {active && (
                      <span
                        className="absolute right-[-2px] bottom-[-2px] grid h-4 w-4 place-items-center rounded-full text-white text-[10px]"
                        style={{ background: "var(--natural-600)" }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Section>
        </div>

        {/* footer */}
        <div className="sticky inset-x-0 bottom-0 px-5 py-4">
          <button
            onClick={apply}
            className="h-12 w-full rounded-xl text-white font-medium transition active:scale-95"
            style={{
              background: "var(--natural-600)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            Apply
          </button>
        </div>
      </aside>
    </div>
  );
}

/* — parts — */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4">
      <h4 className="mb-2 text-[15px] font-semibold text-[var(--ink-900)]">
        {title}
      </h4>
      {children}
    </section>
  );
}

function InputBox({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: number | string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex-1">
      <div className="mb-1 text-[12px] text-[var(--stone-600)]">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="numeric"
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border bg-[var(--surface-1)] px-3 outline-none focus:border-[var(--natural-400)]"
        style={{ borderColor: "var(--line)" }}
      />
    </label>
  );
}
