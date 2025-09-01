"use client";

import { BRAND, OPERATOR, POLICY_EFFECTIVE } from "../../config/legal";

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 py-10">
      <header className="rounded-2xl border bg-[#FFFDF8] p-8 md:p-12">
        <h1
          className="font-serif text-[34px] md:text-[42px]"
          style={{ color: "#6B7A46" }}
        >
          이용약관
        </h1>
        <p className="mt-2 text-[15px] text-neutral-700">
          본 약관은 {POLICY_EFFECTIVE}부터 적용됩니다. {BRAND}는 아래 약관에
          따라 서비스를 제공합니다.
        </p>
      </header>

      <article className="mt-8 space-y-8">
        <TSection n="1" t="목적">
          본 약관은 {BRAND} 서비스의 이용조건과 권리·의무 및 책임사항을 규정함을
          목적으로 합니다.
        </TSection>

        <TSection n="2" t="정의">
          ‘회원’은 계정을 생성한 자, ‘비회원’은 계정 없이 주문/조회하는 자를
          말합니다.
        </TSection>

        <TSection n="3" t="약관의 게시와 변경">
          약관은 서비스 화면에 게시합니다. 관련 법령 개정 또는 서비스 정책 변경
          시 사전 고지 후 변경할 수 있습니다.
        </TSection>

        <TSection n="4" t="회원계정">
          회원은 정확한 정보를 제공해야 하며, 계정 보안 유지는 회원의
          책임입니다. 부정 사용이 의심되면 즉시 연락해 주세요.
        </TSection>

        <TSection n="5" t="주문 및 계약의 성립">
          상품 페이지의 ‘주문하기’를 통해 청약이 이루어지며, 당사의 수락 또는
          제작/배송 진행으로 계약이 성립합니다.
        </TSection>

        <TSection n="6" t="가격/결제">
          가격·수수료·할인은 페이지 표시 또는 개별 안내 기준이며, 결제 완료 후
          제작이 진행됩니다. 해외 결제 시 수수료가 부과될 수 있습니다.
        </TSection>

        <TSection n="7" t="취소/환불">
          생화 특성상 <b>제작 착수 후 취소·환불이 제한</b>될 수 있습니다.
          전자상거래법 등 관계 법령을 따르며, 상세 기준은 ‘환불/취소 정책’
          문서를 따릅니다.
        </TSection>

        <TSection n="8" t="배송/픽업">
          차량(다마스퀵) 배송을 이용하며, 시간대 지정은 앞뒤 1시간 여유
          기준입니다. 정확 시각 고정이 필요하면 직접 퀵 섭외를 권장합니다.
        </TSection>

        <TSection n="9" t="이용자 의무(금지행위)">
          타인의 권리 침해, 허위 정보 제공, 시스템 무단 접근/스크래핑, 비정상
          결제 시도 등을 금지합니다.
        </TSection>

        <TSection n="10" t="지식재산권">
          서비스 내 게시물/이미지/디자인의 권리는 {OPERATOR.company} 또는 정당한
          권리자에게 있으며 무단 사용을 금지합니다.
        </TSection>

        <TSection n="11" t="면책 및 책임 제한">
          불가항력(천재지변, 통신장애, 외부 결제/배송사의 사정 등) 또는 이용자
          귀책 사유로 인한 손해에 대해 당사는 책임을 지지 않습니다.
        </TSection>

        <TSection n="12" t="분쟁 해결 및 관할">
          본 약관은 대한민국 법률을 준거법으로 하며, 분쟁은 민사소송법상의
          관할법원에 제소합니다.
        </TSection>

        <TSection n="13" t="고객센터">
          문의: {OPERATOR.email} / {OPERATOR.phone} (주소: {OPERATOR.address})
        </TSection>
      </article>
    </main>
  );
}

function TSection({
  n,
  t,
  children,
}: {
  n: string;
  t: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-white p-6">
      <h2 className="text-lg font-semibold">
        {n}. {t}
      </h2>
      <div className="mt-3 text-[15px]">{children}</div>
    </section>
  );
}
