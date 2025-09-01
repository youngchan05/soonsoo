// components/DeliveryTable.tsx
import React from "react";

type Row = {
  area: string;
  base: string;
  noTime?: string;
  peak?: string;
  extra?: string;
  special?: string;
};

export function DeliveryTable() {
  const commonExtra =
    "쇼핑백 1개당 +3,000 / 일반대형 +5,000 / 자이언트 +10,000";
  const commonSpecial = "대학로·행사장 +1,000 / 기타 특수요청 +3,000";

  const seoul: Row[] = [
    {
      area: "근거리(5km 이내)",
      base: "10,000",
      noTime: "−2,000",
      peak: "+5,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "강남·서초구",
      base: "12,000",
      noTime: "−2,000",
      peak: "+5,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "송파구",
      base: "14,000",
      noTime: "−2,000",
      peak: "+5,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "성동구",
      base: "15,000",
      noTime: "−2,000",
      peak: "+5,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "용산·광진·동작",
      base: "18,000",
      noTime: "−2,000",
      peak: "+5,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "관악·강동·동대문·중랑",
      base: "17,000",
      noTime: "−2,000",
      peak: "+5,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "영등포·금천·서대문",
      base: "19,000",
      noTime: "−2,000",
      peak: "+5,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "마포·중구",
      base: "20,000",
      noTime: "−2,000",
      peak: "+5,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "양천·구로",
      base: "20,000",
      noTime: "−2,000",
      peak: "+7,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "강서·노원·은평·강북",
      base: "23,000",
      noTime: "−3,000",
      peak: "+7,000",
      extra: commonExtra,
      special: commonSpecial,
    },
  ];

  const gyeonggi: Row[] = [
    {
      area: "성남(분당 제외)·과천",
      base: "18,000",
      noTime: "−2,000",
      peak: "+5,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "안양·구리",
      base: "20,000",
      noTime: "−2,000",
      peak: "+5,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "판교·광명",
      base: "20,000",
      noTime: "−2,000",
      peak: "+10,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "하남·군포·의왕",
      base: "22,000",
      noTime: "−3,000",
      peak: "+10,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "일산·고양",
      base: "33,000",
      noTime: "−4,000",
      peak: "+15,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "안산·김포·양주·수원",
      base: "39,000",
      noTime: "−4,000",
      peak: "+15,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "용인·파주·동두천·동탄",
      base: "45,000",
      noTime: "−5,000",
      peak: "+15,000",
      extra: commonExtra,
      special: commonSpecial,
    },
  ];

  const incheon: Row[] = [
    {
      area: "계양구",
      base: "34,000",
      noTime: "−4,000",
      peak: "+15,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "부평·남동",
      base: "36,000",
      noTime: "−4,000",
      peak: "+15,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "미추홀·연수",
      base: "42,000",
      noTime: "−5,000",
      peak: "+20,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "중구",
      base: "48,000",
      noTime: "−5,000",
      peak: "+25,000",
      extra: commonExtra,
      special: commonSpecial,
    },
    {
      area: "동구",
      base: "50,000",
      noTime: "−5,000",
      peak: "+25,000",
      extra: commonExtra,
      special: commonSpecial,
    },
  ];

  return (
    <section id="delivery-table" className="my-8">
      {/* 안내/주의 */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">배송 안내 및 주의사항</h2>
        <ul className="ml-4 mt-2 list-disc text-sm text-neutral-700 space-y-1.5">
          <li>
            <b>가능하면 픽업</b>을 권장합니다. 차량 이동 중 흔들림로 꽃이 상할
            수 있습니다.
          </li>
          <li>
            당사는 배송업체(차량/다마스퀵)를 <b>호출</b>하며, 시간
            지연·손상·분실 등 사고는 책임지기 어렵습니다. 정확한 시각 고정이
            필요하면 <b>직접 퀵</b>을 섭외해 주세요.
          </li>
          <li>
            배송정보(주소/연락처)를 <b>정확히</b> 기입해 주세요. 오기입/부재로
            인한 환불은 어렵습니다.
          </li>
          <li>
            배송은 <b>단일 상품 5만원 이상</b>부터 가능합니다.
          </li>
          <li>
            <b>배송시간대</b>: 희망 시간 <b>앞뒤 1시간</b> 여유. 시간 고정 원할
            시 직접 퀵 권장. 시간대 미지정 시 할인 적용.
          </li>
          <li>
            오토바이 퀵/택배 불가. 도보배송은 원칙적으로 진행하지 않습니다.
          </li>
        </ul>
      </div>

      {/* 금액표 */}
      <div className="mt-4 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">지역별 배송 금액표</h2>

        <RegionTable title="서울" rows={seoul} />
        <RegionTable title="경기도" rows={gyeonggi} className="mt-6" />
        <RegionTable title="인천" rows={incheon} className="mt-6" />

        <p className="mt-3 text-sm text-neutral-600">
          * 할증시간대 예: 출퇴근(7~10시, 17~19시), 주말/우천/악천후 등
          <br />* 시간 미지정 선택 시 지정 시간대 할인 적용. 정확한 시각 고정은
          직접 퀵 호출 권장.
        </p>
      </div>
    </section>
  );
}

function RegionTable({
  title,
  rows,
  className = "",
}: {
  title: string;
  rows: Row[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-2 text-[15px] font-semibold">{title}</div>
      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-[880px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#FAF7F3]">
              <th className="border px-3 py-2 text-center">도착지</th>
              <th className="border px-3 py-2 text-center">기본료</th>
              <th className="border px-3 py-2 text-center">시간 미지정</th>
              <th className="border px-3 py-2 text-center">할증 시간</th>
              <th className="border px-3 py-2 text-center">개수/무게 추가</th>
              <th className="border px-3 py-2 text-center">특별요청</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="border px-3 py-2 text-left">{r.area}</td>
                <td className="border px-3 py-2 text-center">{r.base}</td>
                <td className="border px-3 py-2 text-center">
                  {r.noTime ?? "-"}
                </td>
                <td className="border px-3 py-2 text-center">
                  {r.peak ?? "-"}
                </td>
                <td className="border px-3 py-2 text-center">
                  {r.extra ?? "-"}
                </td>
                <td className="border px-3 py-2 text-center">
                  {r.special ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
