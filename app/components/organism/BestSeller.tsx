"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types/type";
import { PostgrestError } from "@supabase/supabase-js";
import ProductSkeletonCard from "../molecule/ProductSkeletonCard";
import ProductCard from "../molecule/ProductCard";
import { supabaseBrowser } from "@/app/lib/supabaseClient";

export default function BestSeller() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState<PostgrestError | null>(null);

  // supabaseBrowser는 동기 함수
  const supabase = supabaseBrowser();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_published", true)
        .limit(6);

      if (error) {
        console.error(error);
        setIsError(error);
      }
      setData(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, [supabase]);

  if (isError) {
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
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <li key={`sk-${i}`}>
              <ProductSkeletonCard />
            </li>
          ))
        : data.map((p) => (
            <li key={p.id}>
              <ProductCard p={p} />
            </li>
          ))}
    </ul>
  );
}
