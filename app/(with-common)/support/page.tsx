"use client";

import React from "react";

export default function SupportInfoPage() {
  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 py-10">
      {/* Hero */}
      <header className="rounded-2xl border bg-[#FFFDF8] p-6 md:p-10">
        <h1
          className="font-serif text-[32px] leading-tight md:text-[40px]"
          style={{ color: "#6B7A46" }}
        >
          서포트 안내
        </h1>
        <p className="mt-2 text-[15px] text-neutral-700">
          선물포장 · 기타선물 합배송 · 유의사항을 한눈에 확인하세요.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* 본문 */}
        <article className="space-y-8">
          <Section id="gift-wrap" title="선물포장 🎁">
            <ul className="ml-4 list-disc space-y-1.5 text-[15px] text-neutral-700">
              <li>
                선물포장은 <b>꽃을 구매하시는 경우에만</b> 가능한 옵션입니다.
              </li>
              <li>
                저희는 <b>전문 포장샵이 아니며</b>, 요청이 많아{" "}
                <b>간단한 선물포장</b>만 저렴한 가격으로 제공합니다.
              </li>
              <li>
                샘플처럼 <b>세부 색상/디자인 선택</b>을 제공하기 어려운 점 양해
                부탁드립니다. 기본적으로 <b>주문하신 꽃의 색감과 어울리게</b>{" "}
                준비해 드립니다.
              </li>
            </ul>
          </Section>

          <Section id="extra-gifts" title="기타선물(함께 배송) 🎈">
            <p className="text-[15px] text-neutral-700">
              꽃과 함께 보낼 선물은 <b>직접 구매</b> 후{" "}
              <b>매장으로 보내주세요</b>.
            </p>
            <div className="mt-3 rounded-xl border bg-white p-4 text-[15px]">
              <div className="font-medium">보내실 주소</div>
              <div className="mt-1">
                서울 강남구 논현로 412, <b>1층 순수플라워</b>{" "}
                <span className="text-neutral-500">(문의: 010-8685-8635)</span>
              </div>
              <div className="mt-2 text-sm text-neutral-600">
                네이버/지도에서 <q>순수플라워</q>를 검색하셔도 됩니다.
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-[15px] font-semibold">와인 관련</h4>
              <ul className="ml-4 mt-1 list-disc space-y-1.5 text-[15px] text-neutral-700">
                <li>
                  예산 내에서 <b>매장 인근 와인샵 추천</b>을 받아 대행 구매를
                  도와드릴 수 있습니다.
                </li>
                <li>
                  <b>특정 라벨</b>로 정확히 원하시면 직접 구매하여 매장으로
                  보내주세요.
                </li>
              </ul>
            </div>
          </Section>

          <Section id="combined" title="합배송 안내 🚚">
            <ul className="ml-4 list-disc space-y-1.5 text-[15px] text-neutral-700">
              <li>
                직접 구매하신 선물이 있을 경우, 매장으로 보내주시면{" "}
                <b>꽃과 함께 합배송</b>이 가능합니다{" "}
                <span className="text-neutral-500">(배송비 추가)</span>.
              </li>
              <li>
                <b>쇼핑백이 없을 경우</b> 선물을 담는 쇼핑백 비용이 추가될 수
                있습니다.
              </li>
              <li>
                <b>케이크</b>는 이동 중 파손 위험이 있어{" "}
                <b>꽃을 케이크 상자 위에 올려 합배송</b>하는 것을 권하지
                않습니다. <b>각각 안전 포장</b> 후 합배송을 추천드립니다.
              </li>
              <li>
                합배송 물품(케이크/와인/기타 선물)의{" "}
                <b>분실/파손/파손에 대한 배상책임은 당사에서 지지 않습니다.</b>
              </li>
            </ul>
          </Section>

          <Section id="notice" title="유의사항">
            <ul className="ml-4 list-disc space-y-1.5 text-[15px] text-neutral-700">
              <li>
                차량 이동 특성상 흔들림으로 인한 <b>꽃/선물 손상 위험</b>이
                있습니다. 가능하면 <b>픽업을 권장</b>드립니다.
              </li>
              <li>
                저희가 직접 배송하는 것이 아니라, 고객님을 대신해{" "}
                <b>배송업체(차량/다마스퀵)</b>를 호출해 드립니다. 시간 지연·분실
                등 <b>배송 중 발생 가능한 문제</b>는 당사에서 책임지기
                어렵습니다.
              </li>
              <li>
                <b>정확한 배송시간 고정</b>이 필요하면 고객님이 <b>직접 퀵</b>을
                섭외해 주시는 방법을 권장합니다.
              </li>
            </ul>
          </Section>

          <CTA />
        </article>

        {/* 사이드: 요약/바로가기 */}
        <aside className="h-fit rounded-2xl border bg-white p-6">
          <div className="text-base font-semibold">빠른 안내</div>
          <nav className="mt-3 space-y-2 text-[15px]">
            <a
              className="block rounded-lg px-3 py-2 hover:bg-[#F8E8EC]"
              href="#gift-wrap"
            >
              선물포장
            </a>
            <a
              className="block rounded-lg px-3 py-2 hover:bg-[#F8E8EC]"
              href="#extra-gifts"
            >
              기타선물(함께 배송)
            </a>
            <a
              className="block rounded-lg px-3 py-2 hover:bg-[#F8E8EC]"
              href="#combined"
            >
              합배송 안내
            </a>
            <a
              className="block rounded-lg px-3 py-2 hover:bg-[#F8E8EC]"
              href="#notice"
            >
              유의사항
            </a>
          </nav>

          <div className="mt-6 rounded-xl border bg-[#FFFDF8] p-4 text-sm">
            <div className="font-medium">문의</div>
            <div className="mt-1 space-y-1">
              <div>
                전화:{" "}
                <a className="underline" href="tel:01086858635">
                  010-8685-8635
                </a>
              </div>
              <div>
                이메일:{" "}
                <a className="underline" href="mailto:hello@soonsoo.shop">
                  hello@soonsoo.shop
                </a>
              </div>
              <div>카카오톡 채널: 순수플라워</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

/* ---------- 작은 유틸 컴포넌트들 ---------- */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rounded-2xl border bg-white p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function CTA() {
  return (
    <section className="rounded-2xl border bg-[#FFFDF8] p-6">
      <h3 className="text-base font-semibold">합배송 신청 / 문의</h3>
      <p className="mt-1 text-sm text-neutral-700">
        합배송이 필요하면 선물 도착 예정일과 품목을 알려주세요. 일정/배송 방법을
        확인해 드립니다.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <a
          href="mailto:hello@soonsoo.shop?subject=%5B%EC%88%9C%EC%88%98%5D%20%ED%95%A9%EB%B0%B0%EC%86%A1%20%EB%AC%B8%EC%9D%98&body=%E2%80%A2%20%EC%84%A0%EB%AC%BC%20%ED%92%88%EB%AA%A9%3A%0A%E2%80%A2%20%EB%A7%A4%EC%9E%A5%EB%8F%84%EC%B0%A9%EC%9D%BC%2F%EC%8B%9C%EA%B0%84%3A%0A%E2%80%A2%20%ED%95%A9%EB%B0%B0%EC%86%A1%20%EC%9A%94%EC%B2%AD%20%EC%82%AC%ED%95%AD%3A"
          className="inline-flex h-11 items-center justify-center rounded-xl border bg-white px-4 text-sm hover:bg-neutral-50"
        >
          이메일로 문의
        </a>
        <a
          href="tel:01086858635"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-4 text-sm text-white hover:opacity-90"
        >
          전화하기
        </a>
      </div>
    </section>
  );
}
