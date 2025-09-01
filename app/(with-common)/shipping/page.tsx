import { DeliveryTable } from "@/app/components/DeliveryTable";

export const metadata = {
  title: "Shipping & Delivery – SOONSOO",
  description: "배송 안내 및 요금표",
};

export default function ShippingPage() {
  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 py-10">
      <h1 className="text-2xl font-semibold">Delivery</h1>

      {/* 퀵배송 CTA */}
      <section className="mt-4 rounded-2xl border bg-white p-6">
        <a
          href="#order-delivery"
          className="inline-flex h-10 items-center rounded-lg bg-[#1261a0] px-3 text-white"
        >
          퀵배송으로 받고 싶어요
        </a>
      </section>

      {/* 주의사항 */}
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">주의사항</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700 space-y-2">
          <li>
            <b>가능한 픽업을 권장</b>합니다. 차량 배송 중 흔들림으로 꽃이 상할
            우려가 있습니다.
          </li>
          <li>
            배송은 저희가 직접 진행하지 않고 <b>배송업체</b>를 호출합니다. 시간
            지연/꽃 손상/분실 등 사고에 대해서는 순수에서 책임지기 어렵습니다.
            정확한 시간 지정이 꼭 필요하다면 <b>직접 퀵</b>을 섭외해 주셔도
            됩니다.
          </li>
          <li>
            배송지 정보(주소/연락처)를 <b>꼼꼼히 확인</b>해 주세요.
          </li>
          <li>
            배송은 <b>단일상품 5만원 이상</b>만 가능합니다.
          </li>
        </ul>
      </section>

      {/* 배송 안내 상세 */}
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">배송안내</h2>
        <div className="mt-3 space-y-3 text-sm text-neutral-700">
          <div>
            <b>배송방법</b> — 차량/다마스퀵만 배송합니다. 오토바이퀵/택배는
            불가. 도보배송은 진행하지 않습니다(매장 인근 아주 가까운 경우만
            예외적으로 도와드립니다).
          </div>
          <div>
            <b>배송시간대</b> — 원하는 시간 <b>앞뒤 1시간</b>씩 여유를 주세요.
            정확한 시간대를 꼭 맞춰야 하는 경우 <b>직접 퀵</b>을 불러주세요.
            시간대 지정이 없으면 할인 요금 적용됩니다.
          </div>
        </div>
      </section>

      {/* 요금표 이미지 */}
      <section className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">배송 금액표</h2>
        <div className="mt-4 overflow-hidden rounded-xl border">
          <DeliveryTable />
        </div>
      </section>

      {/* 배송 주문서 */}
      <section
        id="order-delivery"
        className="mt-6 rounded-2xl border bg-white p-6"
      >
        <h2 className="text-lg font-semibold">배송 주문서 작성하기</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-neutral-700 space-y-1">
          <li>배송일자</li>
          <li>배송시간대</li>
          <li>배송지 주소</li>
          <li>받는분 성함/연락처</li>
          <li>주문자분 성함/연락처</li>
          <li>상품종류</li>
          <li>주문타입(플로리스트초이스 or 커스텀)</li>
          <li>가격</li>
          <li>
            색감: 플로리스트초이스는 <b>파스텔톤/비비드톤</b> 중 택1
          </li>
          <li>선물용도/받는분 특성 (제작 참고용)</li>
          <li>메시지문구(있으면, 30자 이내)</li>
        </ul>

        <div className="mt-4 rounded-xl border bg-[#FFFDF8] p-4 text-sm text-neutral-700">
          <p>
            주문서와 참고 이미지를 <b>카카오톡 soonsoo0731</b> 로 보내주세요.
            커스텀/대형은 <b>2~3일 전</b> 예약 권장, 플로리스트초이스는{" "}
            <b>당일 주문</b>도 가능합니다.
          </p>
        </div>
      </section>
    </main>
  );
}
