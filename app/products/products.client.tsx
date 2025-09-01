"use client";

import { useEffect, useRef, useState } from "react";
import { supabaseBrowser } from "../../lib/supabaseClient";
import { addToCart } from "@/app/lib/cart";

type Product = {
  id: string;
  name: string;
  price: number;
  lead_time_days: number;
  thumbnail_url: string | null;
  colors: string[];
};

export default function ProductsClient({
  initialItems,
  initialHasMore,
  pageSize,
  selectedColors,
}: {
  initialItems: Product[];
  initialHasMore: boolean;
  pageSize: number;
  selectedColors: string[];
}) {
  const [items, setItems] = useState<Product[]>(initialItems);
  const [page, setPage] = useState(1); // 0번 페이지는 SSR로 로드됨
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  // 🔧 필터 또는 서버 초기 데이터가 바뀌면 리스트/페이지 리셋
  useEffect(() => {
    setItems(initialItems);
    setHasMore(initialHasMore);
    setPage(1);
  }, [initialItems, initialHasMore, selectedColors.join(",")]);
  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    const supabase = supabaseBrowser();

    let query = supabase
      .from("products")
      .select("id,name,price,lead_time_days,thumbnail_url,colors")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (selectedColors?.length) {
      query = query.overlaps("colors", selectedColors);
    }

    const { data, error } = await query;
    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }
    setItems((prev) => [...prev, ...(data ?? [])]);
    setPage((p) => p + 1);
    setHasMore((data?.length ?? 0) === pageSize);
  }

  // 인터섹션 옵저버로 자동 로드 (끝에 닿으면 로드)
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && loadMore()),
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinelRef, hasMore, loading, pageSize, selectedColors.join(",")]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <li
            key={p.id}
            className="rounded-2xl border border-[#EFEFEF] bg-white shadow-sm hover:shadow-md transition"
          >
            <a href={`/products/${p.id}`}>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-neutral-100">
                {p.thumbnail_url ? (
                  // next/image 쓰면 더 좋지만, 여기선 최소 구현
                  <img
                    src={p.thumbnail_url}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-neutral-400">
                    이미지 없음
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-2 text-[15px] font-medium">
                    {p.name}
                  </h3>
                  <div className="shrink-0 text-right text-[15px] font-semibold">
                    {formatKRW(p.price)}
                  </div>
                </div>
                <p className="mt-1 text-[12px] text-neutral-600">
                  리드타임 {p.lead_time_days}일
                </p>
                {/* 색상 뱃지 미니 */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.colors.slice(0, 5).map((c) => (
                    <span
                      key={c}
                      className="inline-block rounded-full border px-2 py-0.5 text-[11px]"
                    >
                      {c}
                    </span>
                  ))}
                  {p.colors.length > 5 && (
                    <span className="text-[11px] text-neutral-500">
                      +{p.colors.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </a>
            <div className="px-4 pb-4">
              <button
                onClick={(e) => {
                  // (안전) 혹시 상위에서 클릭 버블 잡는 경우 대비
                  e.stopPropagation();
                  addToCart({
                    productId: p.id,
                    name: p.name,
                    unitPrice: p.price,
                    qty: 1, // 목록은 1개 기본
                    thumb: p.thumbnail_url ?? undefined,
                  });
                  // 필요하면 토스트 라이브러리 사용: toast.success("장바구니에 담았어요")
                  // 일단 기본 alert:
                  alert("장바구니에 담았어요");
                }}
                className="w-full rounded-full border px-4 py-2 text-sm hover:bg-neutral-50"
                aria-label={`${p.name} 장바구니 담기`}
              >
                담기
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 로드모어/센티넬 */}
      <div className="mt-8 flex flex-col items-center">
        {hasMore ? (
          <>
            <button
              onClick={loadMore}
              disabled={loading}
              className="rounded-full border px-4 py-2 text-sm hover:bg-neutral-50 disabled:opacity-60"
            >
              {loading ? "불러오는 중…" : "더 보기"}
            </button>
            {/* 자동 로드를 위한 센티넬 */}
            <div ref={sentinelRef} className="h-1 w-1" aria-hidden />
          </>
        ) : (
          <p className="text-sm text-neutral-500">마지막 상품까지 다 봤어요.</p>
        )}
      </div>
    </>
  );
}

function formatKRW(v: number) {
  try {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(v);
  } catch {
    return `${v.toLocaleString()}원`;
  }
}
