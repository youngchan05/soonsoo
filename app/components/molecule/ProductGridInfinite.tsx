// app/components/molecule/ProductGridInfinite.tsx
"use client";

import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import ProductSkeletonCard from "./ProductSkeletonCard";
import { Cat } from "@/app/types/type";
import { useInfiniteProducts } from "@/app/Hooks/useInfiniteProducts";

export default function ProductGridInfinite({
  categories,
  search,
  colors,
  minPrice,
  maxPrice,
}: {
  categories?: Cat[]; // ✅ 배열로 변경
  search?: string;
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
}) {
  const { items, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteProducts({ categories, search, colors, minPrice, maxPrice });

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // 무한 스크롤 옵저버
  useEffect(() => {
    if (!hasNextPage) return;
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && fetchNextPage(),
      { rootMargin: "200px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (error) {
    return (
      <section className="rounded-xl border border-[var(--line-soft)] bg-[var(--surface-2)] p-6 shadow-[var(--shadow-soft)] text-center">
        <h2 className="text-[16px] font-semibold text-[var(--natural-700)]">
          Products
        </h2>
        <p className="mt-2 text-[13px] text-[var(--stone-600)]">
          상품을 불러오지 못했습니다.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 inline-block rounded-lg bg-[var(--natural-700)] px-4 py-2 text-white text-sm font-medium hover:bg-[var(--natural-600)] transition"
        >
          다시 시도
        </button>
      </section>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {items?.map((p) => (
          <li key={p.id}>
            <ProductCard p={p} />
          </li>
        ))}

        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <li key={`sk-${i}`}>
              <ProductSkeletonCard />
            </li>
          ))}
      </ul>

      <div ref={sentinelRef} className="h-10 w-full" />
      {!hasNextPage && !isLoading && (
        <p className="mt-4 text-center text-sm text-neutral-500">
          {/* 마지막 상품까지 다 봤어요. */}
        </p>
      )}
    </>
  );
}
