// 공통 정보 (한 곳만 수정하면 두 문서에 반영)
export const BRAND = "SOONSOO";
export const OPERATOR = {
  company: "순수플라워", // 상호/법인명
  owner: "대표자명", // 대표자
  bizRegNo: "000-00-00000", // 사업자등록번호(있다면)
  address: "서울시 00구 00로 00, 1층",
  email: "hello@soonsoo.shop",
  phone: "010-8685-8635",
  // 데이터 보호 책임자(동일해도 됨)
  dpoName: "담당자명",
  dpoEmail: "privacy@soonsoo.shop",
};
export const PROCESSORS = {
  db: "Supabase (Auth/DB)", // 실제 사용 중인 곳 적기
  payment: "결제대행사명", // 추후 PG 연동 시
  email: "이메일/SMS 발송 서비스", // 사용 시
  courier: "차량/다마스퀵 업체", // 합배송 호출 시
};
export const REGION_NOTE =
  "데이터는 서비스 제공을 위해 해외 리전에 저장/전송될 수 있습니다(예: Supabase 선택 리전).";
export const POLICY_EFFECTIVE = "2025-08-01"; // 발효일
