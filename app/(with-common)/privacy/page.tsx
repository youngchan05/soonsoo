"use client";

import {
  BRAND,
  OPERATOR,
  PROCESSORS,
  REGION_NOTE,
  POLICY_EFFECTIVE,
} from "../../config/legal";

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 py-10">
      <header className="rounded-2xl border bg-[#FFFDF8] p-8 md:p-12">
        <h1
          className="font-serif text-[34px] md:text-[42px]"
          style={{ color: "#6B7A46" }}
        >
          개인정보처리방침
        </h1>
        <p className="mt-2 text-[15px] text-neutral-700">
          본 방침은 {POLICY_EFFECTIVE}부터 적용됩니다. {BRAND} (운영자:{" "}
          {OPERATOR.company})는 관련 법령과 기준을 준수합니다.
        </p>
      </header>

      <article className="mt-8 space-y-8">
        <Section title="1. 처리하는 개인정보 항목">
          <ul className="ml-4 list-disc space-y-1.5 text-[15px]">
            <li>
              <b>회원/로그인</b>: 이메일(비밀번호식 로그인 또는 이메일 링크
              로그인)
            </li>
            <li>
              <b>주문/배송</b>: 주문자 이름, 이메일/전화, 수령인
              이름/연락처/주소, 주문/결제 내역
            </li>
            <li>
              <b>비회원 주문조회</b>: 주문번호 + 연락처(이메일 또는 전화)
            </li>
            <li>
              <b>고객문의</b>: 문의 내용, 연락처
            </li>
            <li>
              <b>자동수집</b>: 서비스 이용기록, 접속기기/브라우저 정보, IP
              등(보안/로그성)
            </li>
            <li>
              <b>결제</b>: 카드번호 등 민감 결제정보는 <u>PG사에 직접 전송</u>
              되며 당사 서버에 저장하지 않습니다.
            </li>
          </ul>
        </Section>

        <Section title="2. 이용 목적">
          <ul className="ml-4 list-disc space-y-1.5 text-[15px]">
            <li>주문 접수·제작·배송 및 고객지원</li>
            <li>회원 식별, 비회원 주문 조회 검증</li>
            <li>결제 처리 및 정산, 영수증/세금계산 관련 의무 이행</li>
            <li>서비스 개선, 보안 및 부정 이용 방지</li>
          </ul>
        </Section>

        <Section title="3. 보유 및 이용기간">
          <p className="text-[15px]">
            관련 법령에 따른 보존기간 또는 동의/목적 달성 시까지 보관합니다.
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-1.5 text-[15px]">
            <li>
              계약/청약철회 기록: <b>5년</b> (전자상거래법)
            </li>
            <li>
              대금결제 및 재화공급 기록: <b>5년</b> (전자상거래법)
            </li>
            <li>
              소비자 불만/분쟁처리 기록: <b>3년</b> (전자상거래법)
            </li>
            <li>
              표시/광고 기록: <b>6개월</b> (전자상거래법)
            </li>
            <li>그 외는 이용 목적 달성 시 즉시 파기</li>
          </ul>
        </Section>

        <Section title="4. 제3자 제공">
          <p className="text-[15px]">
            법령에 근거하거나, 서비스 이행에 필요한 범위에서 동의 기반으로
            제공될 수 있습니다.
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-1.5 text-[15px]">
            <li>배송업체(차량/다마스퀵): 수령인 정보, 배송지</li>
            <li>결제대행사(PG): 결제에 필요한 최소 정보</li>
          </ul>
        </Section>

        <Section title="5. 처리의 위탁">
          <ul className="ml-4 list-disc space-y-1.5 text-[15px]">
            <li>{PROCESSORS.db}: 인증/데이터 저장·운영</li>
            <li>{PROCESSORS.payment}: 결제 처리</li>
            <li>{PROCESSORS.email}: 알림/이메일 발송</li>
            <li>{PROCESSORS.courier}: 배송 수행</li>
          </ul>
          <p className="mt-2 text-[13px] text-neutral-600">{REGION_NOTE}</p>
        </Section>

        <Section title="6. 이용자의 권리">
          <p className="text-[15px]">
            정보주체는 열람·정정·삭제·처리정지 요청을 할 수 있습니다. 아래
            연락처로 요청 시 신속히 조치합니다.
          </p>
        </Section>

        <Section title="7. 쿠키/로컬스토리지">
          <ul className="ml-4 list-disc space-y-1.5 text-[15px]">
            <li>
              필수 저장소(장바구니 등)만 사용하며, 브라우저 설정으로 삭제/차단
              가능합니다.
            </li>
            <li>마케팅/분석 쿠키 사용 시 별도 동의를 받습니다.</li>
          </ul>
        </Section>

        <Section title="8. 안전성 확보조치">
          <ul className="ml-4 list-disc space-y-1.5 text-[15px]">
            <li>전송 구간 암호화(HTTPS), 접근권한 최소화, 접근기록 보관</li>
            <li>비밀번호/토큰 등 민감정보는 안전한 방식으로 저장/관리</li>
          </ul>
        </Section>

        <Section title="9. 개인정보 보호책임자">
          <ul className="ml-4 list-disc space-y-1.5 text-[15px]">
            <li>성명: {OPERATOR.dpoName}</li>
            <li>이메일: {OPERATOR.dpoEmail}</li>
            <li>전화: {OPERATOR.phone}</li>
            <li>주소: {OPERATOR.address}</li>
          </ul>
        </Section>

        <Section title="10. 변경 고지">
          <p className="text-[15px]">
            방침 내용이 변경될 경우 웹사이트 공지 및 개별 통지(필요 시)를 통해
            안내합니다.
          </p>
        </Section>
      </article>
    </main>
  );
}

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
