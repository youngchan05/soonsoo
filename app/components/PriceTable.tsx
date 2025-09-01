// components/PriceTable.tsx
import React from "react";

export function PriceTable() {
  return (
    <section id="price-table" className="my-8">
      <div className="rounded-2xl border bg-[#FFFDF8] p-6">
        <h2 className="text-lg font-semibold">
          순수FLOWER 가격표{" "}
          <span className="font-normal text-neutral-500">
            · 배송은 5만원부터 가능
          </span>
        </h2>

        {/* 플로리스트초이스 */}
        <Table
          caption={
            <>
              플로리스트초이스{" "}
              <span className="text-neutral-500">
                (당일 주문 가능 · 색상은 파스텔톤/비비드톤 중 택1)
              </span>
            </>
          }
          head={["구분", "꽃다발", "꽃바구니"]}
          rows={[
            ["미니", "35,000 ~ 45,000", "70,000 ~ 90,000"],
            ["기본", "50,000 ~ 65,000", "100,000 ~ 120,000"],
            ["풍성", "70,000 ~ 90,000", "150,000 ~ 180,000"],
            ["풍성+", "100,000 ~ 150,000", "200,000 ~ 250,000"],
          ]}
        />

        {/* 커스텀/대형 */}
        <p className="mt-3 text-sm text-neutral-600">
          커스텀/대형은 2~3일 전 예약 권장
        </p>
        <Table
          className="mt-2"
          caption={
            <>
              커스텀 / 대형{" "}
              <span className="text-neutral-500">
                (원하는 색·무드 레퍼런스 전달)
              </span>
            </>
          }
          head={["구분", "꽃다발", "꽃바구니"]}
          rows={[
            ["기본", "80,000 ~ 120,000", "120,000 ~ 150,000"],
            ["대형", "150,000 ~ 180,000", "170,000 ~ 200,000"],
            ["프리미엄", "200,000 ~ 280,000", "220,000 ~ 300,000"],
            ["자이언트", "400,000 ~ 600,000", "600,000 ~ 1,000,000"],
          ]}
        />

        {/* 기타 상품 */}
        <Table
          className="mt-4"
          caption={
            <>
              기타 상품{" "}
              <span className="text-neutral-500">
                (10만원부터 색상 선택 가능)
              </span>
            </>
          }
          head={["품목", "가격대", "비고"]}
          rows={[
            ["용돈박스", "60,000 ~ (현금 별도)", "현금 별도"],
            ["센터피스", "60,000 ~ 100,000+", "행사/테이블"],
            ["와인박스", "별도 문의", "와인 별도"],
            ["기타(현수막/장구/리본 등)", "별도 문의", "옵션, 사이즈별"],
          ]}
        />

        <p className="mt-3 text-sm text-neutral-600">
          * 모든 금액은 자재·시세/시즌에 따라 변동될 수 있습니다.
          <br />* 화환/동서양난/식물은 취급하지 않습니다.
        </p>
      </div>
    </section>
  );
}

function Table({
  caption,
  head,
  rows,
  className = "",
}: {
  caption?: React.ReactNode;
  head: string[];
  rows: (string | React.ReactNode)[][];
  className?: string;
}) {
  return (
    <div className={className}>
      {caption ? (
        <div className="mb-2 text-[15px] font-semibold">{caption}</div>
      ) : null}
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-[640px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#FAF7F3]">
              {head.map((h, i) => (
                <th
                  key={i}
                  className="border px-3 py-2 text-center font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                {r.map((c, i) => (
                  <td key={i} className="border px-3 py-2 text-center">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
