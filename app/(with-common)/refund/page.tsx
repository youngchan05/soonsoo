"use client";

import Link from "next/link";
import { BRAND, OPERATOR, POLICY_EFFECTIVE } from "../legal/config"; // 경로: app/(with-common)/legal/config.ts

export default function RefundPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 py-10">
      {/* Hero */}
      <header className="rounded-2xl border bg-[#FFFDF8] p-8 md:p-12">
        <h1
          className="font-serif text-[34px] md:text-[42px]"
          style={{ color: "#6B7A46" }}
        >
          환불/취소 정책
        </h1>
        <p className="mt-2 text-[15px] text-neutral-700">
          본 정책은 {POLICY_EFFECTIVE}부터 적용됩니다. 생화 상품의 특성을 고려해
          최선을 안내드리며, 상세한 배송 주의사항은{" "}
          <Link className="underline" href="/shipping">
            배송 안내
          </Link>
          를, 주문 전 전체 흐름은{" "}
          <Link className="underline" href="/about/process">
            주문·제작 프로세스
          </Link>
          를 참고해 주세요.
        </p>
      </header>

      <article className="mt-8 space-y-8">
        <Section title="1. 적용 대상">
          <ul className="ml-4 list-disc space-y-1.5 text-[15px]">
            <li>
              본 문서는 {BRAND}가 판매·제작·배송하는{" "}
              <b>생화(꽃다발/꽃바구니/스탠드 등)</b> 및 관련 옵션·포장 서비스에
              적용됩니다.
            </li>
            <li>
              비회원 주문도 본 정책이 동일하게 적용됩니다(주문번호+연락처 기준).
            </li>
          </ul>
        </Section>

        <Section title="2. 주문 취소(제작 착수 전/후)">
          <ul className="ml-4 list-disc space-y-1.5 text-[15px]">
            <li>
              <b>제작 착수 전</b>: 전액 환불 가능합니다. (원 결제 수단 기준)
            </li>
            <li>
              <b>제작 착수 후</b>: 생화 원재료가 준비되거나 디자인이 시작되면{" "}
              <u>취소/전액 환불이 어렵습니다</u>. 실제 비용(자재·인건비)이
              발생합니다.
            </li>
            <li>
              <b>당일/플로리스트초이스</b>는 즉시 착수되는 경우가 많아 취소
              가능시간이 짧습니다. 문의는{" "}
              <a className="underline" href={`mailto:${OPERATOR.email}`}>
                {OPERATOR.email}
              </a>{" "}
              또는{" "}
              <a className="underline" href={`tel:${OPERATOR.phone}`}>
                {OPERATOR.phone}
              </a>
              로 바로 연락 주세요.
            </li>
          </ul>
        </Section>

        <Section title="3. 단순 변심(교환/환불 불가)">
          <p className="text-[15px]">
            생화 상품은 <b>맞춤 제작/주문형</b> 및{" "}
            <b>부패·변질 우려가 있는 재화</b>에 해당하여, <u>단순 변심</u>에
            의한 교환/환불은 어렵습니다. (전자상거래법 예외 조항)
          </p>
        </Section>

        <Section title="4. 당사 귀책 시 보상 기준(요약)">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="bg-[#F8E8EC] text-left">
                  <Th>상황</Th>
                  <Th>인정 요건</Th>
                  <Th>조치</Th>
                </tr>
              </thead>
              <tbody>
                <Tr>
                  <Td>명백한 제작 오류</Td>
                  <Td>주문서/안내 대비 구성의 중대한 불일치</Td>
                  <Td>재제작 또는 전액/부분 환불 협의</Td>
                </Tr>
                <Tr>
                  <Td>약속한 날짜·시간대 미이행(당사 과실)</Td>
                  <Td>배정·운영상의 명백한 실수</Td>
                  <Td>배송비 환급 + 부분 환불 또는 재배송 협의</Td>
                </Tr>
                <Tr>
                  <Td>파손·심각한 신선도 문제(수령 직후)</Td>
                  <Td>
                    수령 <b>2시간 이내</b> 사진/영상 증빙 및 보관 상태 적정
                  </Td>
                  <Td>재제작/교체 우선, 불가 시 환불</Td>
                </Tr>
                <Tr>
                  <Td>외부 배송업체 사고(차량/다마스퀵)</Td>
                  <Td>당사가 호출 대행(위탁) — 상세는 배송 안내 정책</Td>
                  <Td>업체와의 보상 범위 내 지원, 자체 배상은 제한</Td>
                </Tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[13px] text-neutral-600">
            ※ 수령 후 실내 보관/수분 관리 등 관리 소홀로 인한 문제는 보상 대상에
            해당하지 않습니다. 케이크·와인 등 타 물품 합배송은{" "}
            <Link className="underline" href="/support">
              서포트 안내
            </Link>
            의 유의사항을 따릅니다.
          </p>
        </Section>

        <Section title="5. 접수·증빙 방법">
          <ol className="ml-4 list-decimal space-y-1.5 text-[15px]">
            <li>
              문제 발견 즉시 <b>2시간 이내</b> 연락 (
              <a className="underline" href={`tel:${OPERATOR.phone}`}>
                {OPERATOR.phone}
              </a>{" "}
              /{" "}
              <a className="underline" href={`mailto:${OPERATOR.email}`}>
                {OPERATOR.email}
              </a>
              ).
            </li>
            <li>
              <b>전체 샷/상세 샷</b> 등 상태가 드러나는 사진·영상 제출
              (박스/포장 포함).
            </li>
            <li>수거 또는 재제작/교체 일정 협의.</li>
          </ol>
        </Section>

        <Section title="6. 환불 처리 기한">
          <ul className="ml-4 list-disc space-y-1.5 text-[15px]">
            <li>
              승인 후 원 결제 수단 기준 <b>영업일 3–7일</b> 내 처리(카드사·PG에
              따라 차이).
            </li>
            <li>부분 환불/재제작은 사례별로 안내드립니다.</li>
          </ul>
        </Section>

        <Section title="7. 기타">
          <ul className="ml-4 list-disc space-y-1.5 text-[15px]">
            <li>
              정확 <b>시각 고정 배송</b>이 필요한 경우, 고객의{" "}
              <b>직접 퀵 섭외</b>를 권장합니다(일반 배송은 앞뒤 1시간 유예).
            </li>
            <li>
              주소/연락처 오기재로 인한 오배송·지연은 보상 대상이 아닙니다.
            </li>
          </ul>
        </Section>

        <Section title="문의">
          <div className="rounded-2xl border bg-white p-5 text-[15px]">
            <div className="font-medium">{OPERATOR.company}</div>
            <div className="mt-1 space-y-1">
              <div>이메일: {OPERATOR.email}</div>
              <div>전화: {OPERATOR.phone}</div>
              <div>주소: {OPERATOR.address}</div>
            </div>
          </div>
        </Section>
      </article>
    </main>
  );
}

/* ---------- 작은 컴포넌트 ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-white p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="p-3 text-sm font-semibold">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="border-t p-3 text-sm align-top">{children}</td>;
}
function Tr({ children }: { children: React.ReactNode }) {
  return <tr className="even:bg-[#FAFAFA]">{children}</tr>;
}
