export const metadata = {
  title: "About – SOONSOO",
  description: "순수플라워 소개",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 py-10">
      {/* Hero */}
      <section className="rounded-2xl border bg-[#FFFDF8] p-8 md:p-12">
        <h1 className="font-serif text-[34px] leading-tight md:text-[42px]">
          안녕하세요. 순수플라워 입니다.
        </h1>
        <p className="mt-4 text-[15px] text-neutral-700">
          순수는 <b>서울 서초구 반포동</b>에 위치한 플라워샵입니다.
          <br />
          <b>크고 풍성한 대형꽃다발, 대형꽃바구니</b>가 시그니처 상품이며,
          연예인 서포트 플라워로 전 세계에서 많이 찾아주시는 샵입니다.
          <br />
          <span className="text-neutral-500">
            * 화환이나 동서양난, 식물은 취급하지 않습니다.
          </span>
        </p>
      </section>

      {/* What we do */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold">무엇을 제공하나요</h2>
          <ul className="mt-2 space-y-2 text-sm text-neutral-700">
            <li>• 대형 꽃다발/꽃바구니, 커스텀&대형 제작</li>
            <li>• 해외 주문/영문 커뮤니케이션 지원</li>
            <li>• 픽업 또는 지역별 지정일 배송</li>
          </ul>
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold">운영 안내</h2>
          <ul className="mt-2 space-y-2 text-sm text-neutral-700">
            <li>• 평일(월–금) 10:00–19:00</li>
            <li>• 토요일 변동 운영(커스텀 예약만 가능)</li>
            <li>
              • 매주 일/공휴일/대체공휴일 휴무 (임시 휴무는 네이버 소식 확인)
            </li>
          </ul>
        </div>
      </section>

      {/* Quick links */}
      <section className="mt-10 flex flex-wrap gap-3">
        <a
          href="/about/process"
          className="inline-flex h-11 items-center rounded-xl border px-4 hover:bg-neutral-50"
        >
          주문 절차 보기
        </a>
        <a
          href="/shipping"
          className="inline-flex h-11 items-center rounded-xl bg-[#6B7A46] px-4 text-white hover:bg-[#5F6E3F]"
        >
          배송 안내 보기
        </a>
      </section>

      {/* Note */}
      <section className="mt-8 rounded-2xl border bg-white p-6">
        <h3 className="text-base font-semibold">안내</h3>
        <p className="mt-2 text-sm text-neutral-700">
          꽃 상품 주문 및 배송 관련 안내와 가격표는 아래 페이지에서 확인하실 수
          있습니다. 편하게 주문해 주세요 :)
        </p>
      </section>
    </main>
  );
}
