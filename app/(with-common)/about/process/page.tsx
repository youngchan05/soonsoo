import { PriceTable } from "@/app/components/PriceTable";

export const metadata = {
  title: "How to Order – SOONSOO",
  description: "주문 절차 안내",
};

export default function ProcessPage() {
  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 py-10">
      <h1 className="text-2xl font-semibold">How To Order</h1>

      {/* 0) 빠른 픽업 주문(원클릭) */}
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <p className="text-sm">
          <b className="text-[#1261a0]">
            복잡한 상담 없이 쉽고 간편하게 주문하고 싶어요. (픽업 ONLY)
          </b>
          <br />
          네이버 예약에서 1분만에 바로 주문!
        </p>
        <a
          href="https://pcmap.place.naver.com" // 실제 네이버 예약/플레이스 URL로 교체
          target="_blank"
          className="mt-3 inline-flex h-11 items-center rounded-xl bg-[#6B7A46] px-4 text-white hover:bg-[#5F6E3F]"
        >
          네이버 예약 바로가기
        </a>
      </section>

      {/* 1) 주문 날짜/시간 확인 */}
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">1) 주문 날짜/시간 확인</h2>
        <div className="mt-3 rounded-xl border bg-[#FFFDF8] p-5">
          <div className="text-center text-sm text-neutral-700">
            <div className="font-semibold">:: 영업시간 ::</div>
            <p className="mt-2">
              <b>평일(월~금)</b> 10:00~19:00
              <br />
              <b>토</b> 변동 운영(커스텀 예약만 가능)
            </p>
            <p className="mt-2 text-neutral-500">
              매주 일, 공휴일, 대체공휴일 휴무 · 기타 임시휴무는 네이버 소식
              체크
            </p>
          </div>
        </div>
      </section>

      {/* 2) 상품 및 가격 정하기 */}
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">2) 상품 및 가격 정하기</h2>
        <p className="mt-2 text-sm text-neutral-700">
          아래 가격표를 확인하신 후 원하시는 상품/가격을 정해 주세요.
          플로리스트초이스, 커스텀, 대형 중 선택 가능합니다.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl">
          <PriceTable />
        </div>
      </section>

      {/* 3) 색감 정하기 */}
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">3) 색감 정하기</h2>
        <div className="mt-2 space-y-3 text-sm text-neutral-700">
          <div>
            <b>플로리스트초이스</b> 주문이라면? <br />
            <span>· 파스텔톤 / 비비드톤 중 선택 (상세 색감 지정은 불가)</span>
          </div>
          <div>
            <b>커스텀 또는 대형</b> 주문이라면? <br />
            <span>
              · 인스타그램에서 마음에 드는 사진을 캡처하여 보내주세요. 특별히
              원하시는 색상/디자인이 있으면 함께 알려주세요.
            </span>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            className="inline-flex h-10 items-center rounded-lg border px-3 hover:bg-neutral-50"
          >
            인스타그램 보기
          </a>
        </div>
      </section>

      {/* 4) 주문서 작성하기(픽업) */}
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">4) 주문서 작성하기 (픽업)</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700 space-y-1">
          <li>픽업일자/시간</li>
          <li>주문자분 성함/연락처</li>
          <li>상품종류</li>
          <li>주문타입(플로리스트초이스 or 커스텀)</li>
          <li>가격</li>
          <li>
            색감: 플로리스트초이스는 <b>파스텔톤/비비드톤</b> 중 택1
          </li>
          <li>
            선물용도/받는분 특성 (예: 50대 어머님 생신선물) — 제작 시 참고용
          </li>
          <li>메시지문구(있으면, 30자 이내)</li>
        </ul>
      </section>

      {/* 5) 주문 예약하기 */}
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">5) 주문 예약하기</h2>
        <p className="mt-2 text-sm text-neutral-700">
          카카오톡 <b>soonsoo0731</b> 로 작성하신 주문서와 참고 이미지를
          보내주세요.
          <br />
          상담 가능 시간은 <b>평일 10:00 ~ 19:00</b> 입니다.
        </p>
      </section>

      {/* 6) 결제하기 */}
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">6) 결제하기</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700 space-y-1">
          <li>최종 안내받은 내용에 따라 결제해 주세요.</li>
          <li>
            모든 상품은 <b>선결제 후 제작</b>되며, 미입금 시 예약 확정되지
            않습니다. (현금영수증 가능)
          </li>
          <li>
            해외 결제는 <b>PayPal</b> 가능 (수수료 10%)
          </li>
          <li>
            생화 상품 특성상 교환/환불이 어려우니 신중한 예약 부탁드립니다.
          </li>
        </ul>
      </section>
    </main>
  );
}
