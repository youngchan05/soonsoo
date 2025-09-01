// components/Footer.tsx
import Link from "next/link";
import { NAV } from "../config/nav";

type SimpleLink = { href: string; label: string };

// 그룹별 링크 뽑기
const SHOP: SimpleLink[] = NAV.filter(
  (i) =>
    i.groups.includes("footer") &&
    !i.groups.some((g) => ["support", "policy", "company"].includes(g))
).map(({ href, label }) => ({ href, label }));

const SUPPORT: SimpleLink[] = NAV.filter((i) =>
  i.groups.includes("support")
).map(({ href, label }) => ({ href, label }));

const POLICY_BASE: SimpleLink[] = NAV.filter((i) =>
  i.groups.includes("policy")
).map(({ href, label }) => ({ href, label }));

// 필요 시 '환불/취소'가 NAV에 없다면 아래 한 줄로 임시 추가 (권장: NAV에 정식으로 추가)
const POLICY: SimpleLink[] = POLICY_BASE; // [...POLICY_BASE, { href: "/refund", label: "환불/취소" }];

export default function Footer() {
  const year = new Date().getFullYear();

  const COLS: { title: string; links: SimpleLink[] }[] = [
    {
      title: "Shop",
      links: SHOP.length
        ? SHOP
        : [
            { href: "/products?cat=bouquet", label: "Bouquet" },
            { href: "/products?cat=stand", label: "Flower Stand" },
            { href: "/custom", label: "Custom Order" },
          ],
    },
    {
      title: "Support",
      links: SUPPORT.length
        ? SUPPORT
        : [
            { href: "/faq", label: "FAQ" },
            { href: "/shipping", label: "Shipping & Delivery" },
            { href: "/contact", label: "Contact" },
          ],
    },
    {
      title: "Policy",
      links: POLICY.length
        ? POLICY
        : [
            { href: "/terms", label: "이용약관" },
            { href: "/privacy", label: "개인정보처리방침" },
            { href: "/refund", label: "환불/취소" },
          ],
    },
  ];

  return (
    <footer className="mt-16 w-full border-t border-[#EDE7DF] bg-[#FFFDF8] text-[#2a2a2a]">
      <div className="mx-auto w-full max-w-[1248px] px-4 py-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr_1.2fr]">
          {/* Brand + Social */}
          <section aria-label="브랜드 소개">
            <div className="font-serif text-2xl text-[#6B7A46]">SOONSOO</div>
            <p className="mt-2 text-sm text-neutral-600">
              해외에서 주문, 한국에서 배송. 신선한 플로럴을 가장 간단하게.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E6E1D9] hover:bg-neutral-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="#6B7A46"
                  />
                  <circle cx="12" cy="12" r="4" stroke="#6B7A46" />
                  <circle cx="17" cy="7" r="1.2" fill="#6B7A46" />
                </svg>
              </a>
              <a
                href="mailto:hello@soonsoo.shop"
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E6E1D9] hover:bg-neutral-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="#6B7A46"
                  />
                  <path d="M4 7l8 6 8-6" stroke="#6B7A46" />
                </svg>
              </a>
            </div>
          </section>

          {/* Link columns (NAV 기반) */}
          <nav
            aria-label="바로가기"
            className="grid grid-cols-2 gap-6 md:grid-cols-3"
          >
            {COLS.map((col) => (
              <div key={col.title}>
                <h3 className="text-[15px] font-semibold">{col.title}</h3>
                <ul className="mt-3 space-y-2 text-[14px] text-neutral-700">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link className="hover:underline" href={l.href}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Contact */}
          <section aria-label="연락처" className="space-y-4">
            <div className="text-[14px] text-neutral-700">
              <p>월–금 10:00–17:00 (KST)</p>
              <p className="mt-1">
                이메일{" "}
                <a className="underline" href="mailto:hello@soonsoo.shop">
                  hello@soonsoo.shop
                </a>
              </p>
              <p className="mt-1">카카오톡 채널: 순수플라워</p>
            </div>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#EFE7E0] pt-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-neutral-500">
            © {year} SOONSOO. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-neutral-600">
            {POLICY.map((l) => (
              <Link key={l.href} href={l.href} className="hover:underline">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
