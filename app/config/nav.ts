// /config/nav.ts
export type NavItem = {
  label: string;
  href: string;
  groups: Array<
    "header" | "footer" | "support" | "policy" | "company" | "overflow"
  >;
  priority?: number; // 헤더 정렬 우선순위(낮을수록 왼쪽)
};

export const NAV: NavItem[] = [
  // 메인 탐색 (헤더/푸터 공통)
  { label: "Home", href: "/", groups: ["header", "footer"], priority: 1 },
  {
    label: "Shop",
    href: "/products",
    groups: ["header", "footer"],
    priority: 2,
  },
  {
    label: "About",
    href: "/about",
    groups: ["header", "footer", "company"],
    priority: 3,
  },
  { label: "Contact", href: "/contact", groups: ["footer", "company"] },

  // 지원/정책 (헤더에는 직접 노출 안 하고 허브/More에서 접근)
  {
    label: "Support",
    href: "/support",
    groups: ["header", "footer", "support"],
    priority: 50,
  },
  { label: "FAQ", href: "/faq", groups: ["footer", "support"] },
  {
    label: "Shipping & Delivery",
    href: "/shipping",
    groups: ["footer", "support"],
  },
  // {
  //   label: "문의하기",
  //   href: "/contact",
  //   groups: ["footer", "support", "company"],
  // },
  { label: "개인정보처리방침", href: "/privacy", groups: ["footer", "policy"] },
  { label: "이용약관", href: "/terms", groups: ["footer", "policy"] },
];
