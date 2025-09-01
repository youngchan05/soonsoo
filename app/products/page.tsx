"use client";

import { useMemo, useState } from "react";
import { Cat, ProductColor } from "@/app/types/type";
import ProductGridInfinite from "@/app/components/molecule/ProductGridInfinite";
import BottomSheetFilter from "@/app/components/molecule/BottomSheetFilter";
import SearchFilterBar from "../components/molecule/SearchFilterBar";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Cat[]>(["all"]);
  const [colors, setColors] = useState<ProductColor[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const activeCount = useMemo(() => {
    let c = 0;
    if (!(categories.length === 1 && categories[0] === "all")) c++;
    if (colors.length) c++;
    if (minPrice != null) c++;
    if (maxPrice != null) c++;
    if (search.trim()) c++; // 검색도 필터로 간주
    return c;
  }, [categories, colors, minPrice, maxPrice, search]);

  return (
    <>
      {/* 헤더 영역… (검색 인풋은 그대로) */}
      <section className="px-4 pt-3 pb-2 flex items-center gap-2">
        {/* 검색 + 필터 바 */}
        <SearchFilterBar
          value={search}
          onChange={setSearch}
          onOpenFilter={() => setOpen(true)}
          activeCount={activeCount}
          placeholder="상품명으로 검색…"
          className="mb-3"
        />
      </section>

      {/* 상품 그리드 */}
      <div className="px-4 pb-12">
        <ProductGridInfinite
          categories={categories}
          search={search}
          colors={colors}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>

      {/* 바텀시트 필터 */}
      <BottomSheetFilter
        open={open}
        onClose={() => setOpen(false)}
        categories={categories}
        colors={colors}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onApply={({ categories, colors, minPrice, maxPrice }) => {
          setCategories(categories);
          setColors(colors);
          setMinPrice(minPrice);
          setMaxPrice(maxPrice);
          // 여기서 refetch 해주면 끝!
        }}
      />
    </>
  );
}
