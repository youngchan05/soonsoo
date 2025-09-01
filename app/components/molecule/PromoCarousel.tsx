"use client";

import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";

// node_modules CSS는 컴포넌트에서 import 가능
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Promo = {
  id: string;
  title: string;
  tag?: string;
  href?: string;
  imageUrl?: string;
  subtitle?: string;
};

type Props = {
  items: Promo[];
  className?: string;
  autoplayMs?: number; // 기본 4000
  showArrows?: boolean; // 기본 true (모바일에선 숨김 처리)
};

export default function PromoCarouselSwiper({
  items,
  className = "",
  autoplayMs = 4000,
  showArrows = true,
}: Props) {
  return (
    <section className={["px-4 mt-3", className].join(" ")}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, A11y]}
        slidesPerView={1}
        spaceBetween={16}
        speed={600}
        loop={true}
        autoplay={{
          delay: autoplayMs,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={showArrows}
        // 터치 감도/관성
        threshold={4}
        resistanceRatio={0.85}
        className="promo-swiper"
      >
        {items.map((p) => (
          <SwiperSlide key={p.id}>
            <a
              href={p.href ?? "#"}
              className="relative block w-full h-[180px] overflow-hidden rounded-xl border"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface-2)",
              }}
            >
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              ) : null}

              {/* 좌측 가독성 오버레이 */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0) 75%)",
                }}
              />

              {/* 텍스트 */}
              <div className="relative h-full w-full p-3 flex flex-col justify-between text-white">
                {/* {p.tag ? (
                  <div
                    className="inline-flex items-center gap-2 px-3 h-8 rounded-full text-[13px] font-medium"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      color: "var(--brand-900)",
                      boxShadow: "var(--shadow-soft)",
                    }}
                  >
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ background: "var(--brand-500)" }}
                    />
                    {p.tag}
                  </div>
                ) : (
                  <span />
                )} */}
                <div className="drop-shadow">
                  <div className="text-[20px] font-semibold leading-tight whitespace-pre-line">
                    {p.title}
                  </div>
                  {p.subtitle ? (
                    <div className="mt-1 text-[13px] opacity-90">
                      {p.subtitle}
                    </div>
                  ) : null}
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 내 brand에 맞춘 도트/화살표 커스텀 */}
      <style jsx global>{`
        .promo-swiper {
          --swiper-theme-color: var(--natural-500);
          img {
            width: 100%;
            height: 100%;
          }
        }
        /* 도트 스타일 */
        .promo-swiper .swiper-pagination-bullet {
          background: var(--line);
          opacity: 1;
          width: 6px;
          height: 6px;
          transition: all 200ms ease;
        }
        .promo-swiper .swiper-pagination-bullet-active {
          background: var(--natural-500);
          width: 18px;
          border-radius: 9999px;
        }

        /* 화살표 스타일 */
        .promo-swiper .swiper-button-prev,
        .promo-swiper .swiper-button-next {
          color: var(--stone-800);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
          display: none;
          transition: color 200ms ease;
        }
        .promo-swiper .swiper-button-prev:hover,
        .promo-swiper .swiper-button-next:hover {
          color: var(--terra-400);
        }

        /* 작은 화면에서 화살표 숨김, md 이상만 표시 */
        @media (min-width: 768px) {
          .promo-swiper .swiper-button-prev,
          .promo-swiper .swiper-button-next {
            display: flex;
          }
        }
      `}</style>
    </section>
  );
}
