// app/Hooks/useInfiniteProducts.ts
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Cat, Product } from "../types/type";

export function useInfiniteProducts(
  params: {
    categories?: Cat[]; // ✅ 배열
    search?: string;
    colors?: string[];
    minPrice?: number;
    maxPrice?: number;
  } = {}
) {
  const {
    categories = ["all"],
    search,
    colors = [],
    minPrice,
    maxPrice,
  } = params;

  // "all"은 서버에 안 보냄
  const catsForQuery = categories.filter((c) => c !== "all");

  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: [
        "products",
        { categories: catsForQuery, search, colors, minPrice, maxPrice },
      ],
      initialPageParam: null as { created_at: string; id: string } | null,
      queryFn: async ({ pageParam }) => {
        const cursorParam = pageParam
          ? `&cursorCreatedAt=${encodeURIComponent(
              pageParam.created_at
            )}&cursorId=${pageParam.id}`
          : "";

        const searchParam = search
          ? `&search=${encodeURIComponent(search)}`
          : "";
        const colorParams = colors
          .map((c) => `&color=${encodeURIComponent(c)}`)
          .join("");
        const catParams = catsForQuery
          .map((c) => `&cat=${encodeURIComponent(c)}`)
          .join("");
        const minParam = minPrice != null ? `&minPrice=${minPrice}` : "";
        const maxParam = maxPrice != null ? `&maxPrice=${maxPrice}` : "";

        const res = await fetch(
          `/api/products?${catParams}${searchParam}${colorParams}${minParam}${maxParam}${cursorParam}`.replace(
            /^\?&/,
            "?"
          ),
          { cache: "no-store" }
        );
        const json = await res.json();
        if (!res.ok) throw new Error("Failed to load products");
        return json;
      },
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor ? lastPage.nextCursor : undefined,
    });

  const items = useMemo(
    () => (data?.pages ?? []).flatMap((p) => p.data ?? []),
    [data]
  ) as Product[];

  return { error, items, fetchNextPage, hasNextPage, isLoading };
}
