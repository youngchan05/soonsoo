"use client";

export default function HeroGlassy() {
  return (
    <section className="relative overflow-hidden">
      {/* 전폭 배경: 핑크 톤 그라데이션 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        style={{
          background:
            "radial-gradient(1200px 600px at 18% -10%, #F8E8EC 24%, transparent 60%)",
        }}
      />
      <div className="mx-auto w-full max-w-[1248px] px-4 md:px-6 py-10 md:py-14">
        <div className="grid items-center gap-6 md:grid-cols-2">
          {/* Left: 카피 + CTA */}
          <div>
            <h1
              className="font-serif text-[30px] leading-tight md:text-[40px]"
              style={{ color: "#2A2A2A" }}
            >
              오늘, 꽃으로 전하는 <span style={{ color: "#6B7A46" }}>마음</span>
            </h1>
            <p className="mt-2 text-sm md:text-[15px] text-neutral-700">
              플로리스트가 그날의 생화로 정성껏 제작합니다. 서울/수도권 당일
              배송, 맞춤 제작 가능.
            </p>

            <div className="mt-4 flex gap-2">
              <a
                href="/products"
                className="h-11 md:h-12 w-full md:w-40 rounded-xl bg-[#6B7A46] text-white grid place-items-center hover:bg-[#5F6E3F]"
              >
                바로 쇼핑
              </a>
              <a
                href="/custom"
                className="h-11 md:h-12 w-full md:w-40 rounded-xl border grid place-items-center hover:bg-neutral-50"
              >
                맞춤 제작
              </a>
            </div>

            {/* USP 필 */}
            <div className="mt-4 flex flex-wrap gap-2 text-[12px] md:text-[13px]">
              {["당일 배송", "시즌 생화", "안전 포장", "메시지 카드 무료"].map(
                (t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-[#EAEAEA] bg-white/80 px-3 py-1 backdrop-blur"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Right: 비주얼 카드(글래스) */}
          <div className="relative">
            <div className="rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur p-3 md:p-4">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
                {/* 샘플 이미지 — 교체 가능 */}
                <img
                  src="https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1200&auto=format&fit=crop"
                  alt="Floral arrangement"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>

              {/* 오버레이 태그 */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-[12px]">
                <div className="rounded-xl border bg-white/70 p-2 text-center">
                  파스텔
                </div>
                <div className="rounded-xl border bg-white/70 p-2 text-center">
                  플로리스트 초이스
                </div>
                <div className="rounded-xl border bg-white/70 p-2 text-center">
                  리드타임 1–2일
                </div>
              </div>
            </div>

            {/* 떠 있는 미니 카드 */}
            <div className="absolute -left-2 -bottom-3 hidden md:block">
              <div className="rounded-2xl border bg-white/80 backdrop-blur px-3 py-2 shadow-sm">
                <div className="text-[12px] text-neutral-600">
                  오늘의 베스트
                </div>
                <div className="text-[14px] font-semibold">Pastel Bouquet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
