"use client";
import React from "react";
import CategoryFilter from "../components/molecule/CategoryFilter";
import PromoCarousel from "../components/molecule/PromoCarousel";
import ProductGridInfinite from "../components/molecule/ProductGridInfinite";
import BestSeller from "../components/organism/BestSeller";
import { useSearchParams } from "next/navigation";
import { Cat } from "../types/type";

const client = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as Cat; // 예: /products?cat=bouquet

  return (
    <>
      {/* Hero / Promo */}
      <PromoCarousel
        items={[
          {
            id: "tips",
            title: "Give The Best Care\nFor Your Plants",
            tag: "Plant Tips",
            imageUrl: "/images/banner-plant-1.jpg",
            href: "/tips",
          },
          {
            id: "bouquet",
            title: "New Spring Bouquets",
            tag: "Seasonal",
            imageUrl: "/images/banner-plant-1.jpg",
            href: "/products?cat=bouquet",
          },
          {
            id: "custom",
            title: "Custom Flower Box",
            tag: "Custom Order",
            imageUrl: "/images/banner-plant-1.jpg",
            href: "/custom",
          },
        ]}
      />

      {/* 추천 섹션 */}
      <section className="px-4 mt-8">
        <BestSeller />
      </section>

      {/* 프로모션 / 신뢰 배지 */}
      <section className="px-4 py-4">
        <div className="rounded-3xl bg-[var(--surface-2)] p-6 md:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: "🚚",
                bg: "var(--natural-100)",
                title: "지정일 배송 & 픽업 서비스",
                highlight: "지정일 배송",
                color: "var(--natural-700)",
              },
              {
                icon: "🌍",
                bg: "var(--terra-100)",
                title: "해외 주문 지원 / 영문 커뮤니케이션 가능",
                highlight: "해외 주문",
                color: "var(--terra-600)",
              },
              {
                icon: "💐",
                bg: "var(--accent-100)",
                title: "대형 꽃다발 · 커스텀 제작 전문 플라워샵",
                highlight: "대형 꽃다발",
                color: "var(--accent-600)",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative group rounded-2xl bg-white p-6 text-center shadow-[var(--shadow-soft)] hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden"
              >
                {/* 🌸 패턴 배경 */}
                <div
                  className="absolute inset-0 opacity-5 group-hover:opacity-10 transition"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%239eb894' stroke-width='0.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2c2 4-2 8 0 12s2 8 0 12'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "repeat",
                  }}
                />
                {/* 컨텐츠 */}
                <div className="relative z-10">
                  <div
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-[24px] group-hover:scale-110 transition"
                    style={{ background: item.bg }}
                  >
                    {item.icon}
                  </div>
                  <p className="mt-3 text-[15px] font-serif text-[var(--stone-800)] leading-snug">
                    <span
                      className="font-semibold"
                      style={{ color: item.color }}
                    >
                      {item.highlight}
                    </span>{" "}
                    {item.title.replace(item.highlight, "")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <CategoryFilter />
      {/* 전체 상품 */}
      <ProductGridInfinite categories={category ? [category] : ["all"]} />
      {/* Footer */}
      <footer className="mt-16 px-4 py-10 border-t text-center text-sm text-[var(--stone-500)]">
        <p>© 2025 SOONSOO Flower. All rights reserved.</p>
        <p className="mt-2">Instagram @soonsoo_flower</p>
      </footer>
    </>
  );
};

export default client;
