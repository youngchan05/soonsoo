"use client";

import React, { useMemo, useState } from "react";

type FaqItem = {
  category: "주문/제작" | "배송" | "결제" | "계정/문의" | "정책";
  q: string;
  a: React.ReactNode;
};

const FAQS: FaqItem[] = [
  /* ===== 주문/제작 ===== */
  {
    category: "주문/제작",
    q: "플로리스트초이스와 커스텀 주문의 차이가 뭔가요?",
    a: (
      <ul className="ml-4 list-disc space-y-1.5">
        <li>
          <b>플로리스트초이스</b>: 당일도 가능하며 <b>파스텔톤 / 비비드톤</b> 중
          색감만 선택해 주시면, 그날의 생화 상태에 맞춰 예쁘게 제작합니다.
        </li>
        <li>
          <b>커스텀/대형</b>: 원하는 색·무드·레퍼런스 이미지를 주시면 맞춤
          제작합니다 (보통 <b>2–3일 전 예약</b> 권장).
        </li>
      </ul>
    ),
  },
  {
    category: "주문/제작",
    q: "선물포장도 가능한가요?",
    a: (
      <ul className="ml-4 list-disc space-y-1.5">
        <li>꽃을 구매하실 때에만 옵션으로 제공됩니다.</li>
        <li>
          전문 포장샵이 아니므로 <b>간단 포장</b>만 저렴하게 제공해요.
        </li>
        <li>
          세부 색/디자인 지정은 어렵고, <b>주문하신 꽃의 색감과 어울리게</b>{" "}
          준비합니다.
        </li>
      </ul>
    ),
  },
  {
    category: "주문/제작",
    q: "다른 선물(와인/케이크 등)을 꽃과 함께 보낼 수 있나요?",
    a: (
      <ul className="ml-4 list-disc space-y-1.5">
        <li>
          가능합니다. <b>직접 구매 → 매장으로 발송</b>해 주세요. (서울 강남구
          논현로 412, 1층 순수플라워 / 010-8685-8635)
        </li>
        <li>
          케이크는 이동 중 파손 위험이 있어 각각 안전 포장 후 합배송을
          권장합니다.
        </li>
        <li>쇼핑백이 필요하면 추가 비용이 발생할 수 있어요.</li>
      </ul>
    ),
  },

  /* ===== 배송 ===== */
  {
    category: "배송",
    q: "배송 가능 지역과 요금은 어떻게 되나요?",
    a: (
      <p>
        서울/경기/인천 일부 지역에 차량(다마스퀵) 배송을 제공합니다.
        지역·시간대별 금액표는{" "}
        <a className="underline" href="/shipping">
          배송 안내
        </a>
        에서 확인해 주세요.
        <br />
        <span className="text-neutral-600">
          (단일 상품 <b>5만원 이상</b>부터 가능, 오토바이/택배 불가)
        </span>
      </p>
    ),
  },
  {
    category: "배송",
    q: "정확한 시간에 딱 맞춰 배송 가능한가요?",
    a: (
      <p>
        일반 배송은 희망 시간 <b>앞뒤 1시간 여유</b>를 두고 배정됩니다. 정확한
        시각 고정이 필요하면 고객님께서 <b>직접 퀵</b>을 섭외해 주시는 방법을
        권장드려요.
      </p>
    ),
  },

  /* ===== 결제 ===== */
  {
    category: "결제",
    q: "결제는 어떻게 하나요? 해외 결제도 가능한가요?",
    a: (
      <ul className="ml-4 list-disc space-y-1.5">
        <li>온라인 결제(선결제) 후 제작이 진행됩니다.</li>
        <li>
          해외 고객은 PayPal 등 별도 수단으로 결제 가능하며 수수료가 추가될 수
          있습니다.
        </li>
      </ul>
    ),
  },

  /* ===== 계정/문의 ===== */
  {
    category: "계정/문의",
    q: "회원이 아니어도 주문 조회가 가능한가요?",
    a: (
      <p>
        네. <b>주문번호 + 연락처(이메일/전화)</b>로{" "}
        <a className="underline" href="/help">
          Support
        </a>{" "}
        페이지의 ‘주문번호 조회’에서 확인할 수 있어요.
      </p>
    ),
  },
  {
    category: "계정/문의",
    q: "문의는 어디로 하면 되나요?",
    a: (
      <ul className="ml-4 list-disc space-y-1.5">
        <li>
          이메일:{" "}
          <a className="underline" href="mailto:hello@soonsoo.shop">
            hello@soonsoo.shop
          </a>
        </li>
        <li>
          전화/문자:{" "}
          <a className="underline" href="tel:01086858635">
            010-8685-8635
          </a>
        </li>
        <li>카카오톡 채널: 순수플라워</li>
      </ul>
    ),
  },

  /* ===== 정책 ===== */
  {
    category: "정책",
    q: "교환/환불 기준이 궁금해요.",
    a: (
      <p>
        생화 특성상 제작 착수 후에는 취소/환불이 어렵습니다. 상세 기준은{" "}
        <a className="underline" href="/refund">
          환불/취소 정책
        </a>
        을 확인해 주세요.
      </p>
    ),
  },
  {
    category: "정책",
    q: "배송 중 발생한 문제는 어떻게 되나요?",
    a: (
      <p>
        당사는 고객님을 대신해 <b>배송업체를 호출</b>합니다. 이 과정에서 발생할
        수 있는 시간 지연·파손·분실 등에 대해서는 <b>책임지기 어려운 점</b> 양해
        부탁드립니다. 안전이 중요한 물품은 직접 퀵 섭외를 권장합니다.
      </p>
    ),
  },
];

export default function FaqPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<FaqItem["category"] | "전체">("전체");

  const categories: ("전체" | FaqItem["category"])[] = [
    "전체",
    "주문/제작",
    "배송",
    "결제",
    "계정/문의",
    "정책",
  ];

  const filtered = useMemo(() => {
    const key = q.trim().toLowerCase();
    return FAQS.filter((item) => {
      const catOk = cat === "전체" || item.category === cat;
      if (!catOk) return false;
      if (!key) return true;
      return (
        item.q.toLowerCase().includes(key) ||
        (typeof item.a === "string"
          ? item.a.toLowerCase().includes(key)
          : // ReactNode인 경우 대충 텍스트 키워드 매칭만
            false)
      );
    });
  }, [q, cat]);

  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 py-10">
      {/* Hero */}
      <section className="rounded-2xl border bg-[#FFFDF8] p-8 md:p-12">
        <h1
          className="font-serif text-[34px] leading-tight md:text-[42px]"
          style={{ color: "#6B7A46" }}
        >
          FAQ
        </h1>
        <p className="mt-2 text-[15px] text-neutral-700">
          자주 묻는 질문을 모았어요. 검색 또는 카테고리로 빠르게 찾아보세요.
        </p>

        {/* 검색/카테고리 */}
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-2xl border bg-white p-2">
            <SearchIcon />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="예) 배송, 포장, 환불, 주문번호…"
              className="h-11 flex-1 rounded-xl px-2 outline-none"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="h-9 rounded-lg px-3 text-sm text-neutral-600 hover:bg-neutral-50"
              >
                지우기
              </button>
            )}
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={[
                  "h-11 rounded-xl border px-3 text-sm",
                  cat === c
                    ? "border-[#6B7A46] bg-[#F0F4EC]"
                    : "border-[#EAEAEA] bg-white hover:bg-neutral-50",
                ].join(" ")}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 리스트 */}
      <section className="mt-8 space-y-3">
        {filtered.map((item, i) => (
          <details
            key={i}
            className="group rounded-2xl border bg-white p-5 open:shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <div>
                <div className="text-xs text-[#6B7A46]">{item.category}</div>
                <h3 className="mt-0.5 text-[15px] font-semibold">{item.q}</h3>
              </div>
              <span className="mt-1 select-none rounded-full border px-2 py-0.5 text-xs text-neutral-600 group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="mt-3 text-[15px] text-neutral-700">{item.a}</div>
          </details>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border bg-white p-6 text-sm text-neutral-600">
            검색 결과가 없어요. 다른 키워드나 카테고리를 선택해 보세요.
          </div>
        )}
      </section>

      {/* 추가 문의/빠른 작업 */}
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <a
          href="/help"
          className="rounded-2xl border bg-white p-5 hover:shadow-sm"
        >
          <div className="text-base font-semibold">Support 허브</div>
          <p className="mt-1 text-sm text-neutral-600">
            주문번호 조회, 배송/프로세스, 정책 문서 모음
          </p>
        </a>
        <a
          href="/shipping"
          className="rounded-2xl border bg-white p-5 hover:shadow-sm"
        >
          <div className="text-base font-semibold">배송 안내</div>
          <p className="mt-1 text-sm text-neutral-600">
            지역별 금액표 · 시간대/주의사항
          </p>
        </a>
        <a
          href="mailto:hello@soonsoo.shop"
          className="rounded-2xl border bg-[#FFFDF8] p-5 hover:shadow-sm"
        >
          <div className="text-base font-semibold">추가 문의</div>
          <p className="mt-1 text-sm text-neutral-600">
            hello@soonsoo.shop / 010-8685-8635
          </p>
        </a>
      </section>
    </main>
  );
}

/* ===== 아이콘 (간단) ===== */
function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="text-neutral-500"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="20" y1="20" x2="16.65" y2="16.65" />
    </svg>
  );
}
