"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const COLOR_OPTIONS: { key: string; label: string; swatch: string }[] = [
  { key: "white", label: "화이트", swatch: "#ffffff" },
  { key: "pink", label: "핑크", swatch: "#f8c8d8" },
  { key: "red", label: "레드", swatch: "#e14242" },
  { key: "yellow", label: "옐로우", swatch: "#ffe26a" },
  { key: "purple", label: "퍼플", swatch: "#a88bd0" },
  { key: "green", label: "그린", swatch: "#9ec891" },
];

export default function ProductsFilters({ selected }: { selected: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const selectedSet = new Set(selected);

  function toggle(key: string) {
    const next = new Set(selectedSet);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    const value = Array.from(next).join(",");
    const sp = new URLSearchParams(params.toString());
    if (value) sp.set("color", value);
    else sp.delete("color");
    router.replace(`${pathname}?${sp.toString()}`);
  }

  function clearAll() {
    const sp = new URLSearchParams(params.toString());
    sp.delete("color");
    router.replace(`${pathname}?${sp.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {COLOR_OPTIONS.map((c) => (
        <button
          key={c.key}
          onClick={() => toggle(c.key)}
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition
            ${
              selectedSet.has(c.key)
                ? "border-[#6B7A46] bg-[#F0F4EC]"
                : "border-[#EAEAEA] bg-white hover:bg-neutral-50"
            }`}
          aria-pressed={selectedSet.has(c.key)}
        >
          <span
            className="inline-block h-3.5 w-3.5 rounded-full border"
            style={{ background: c.swatch }}
          />
          {c.label}
        </button>
      ))}
      {selected.length > 0 && (
        <button
          onClick={clearAll}
          className="ml-2 text-sm text-[#6B7A46] underline"
        >
          전체 해제
        </button>
      )}
    </div>
  );
}
