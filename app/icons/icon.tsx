import * as React from "react";

/** 🛒 Cart */
export function IconCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M3 3h2l2.5 12h11l1.5-8H6" />
    </svg>
  );
}

/** 👤 User */
export function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 21c0-3.314-3.582-6-8-6s-8 2.686-8 6" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

/** ☰ Hamburger */
export function IconHamburger(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      {...props}
    >
      <line x1="5" y1="7" x2="19" y2="7" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="5" y1="17" x2="19" y2="17" />
    </svg>
  );
}

/** ✕ Close */
export function IconClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/** 🏠 Home */
export function IconHome(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 10.5 12 4l9 6.5M5 10.5V20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9.5" />
      <path d="M9.5 22v-6h5v6" />
    </svg>
  );
}

/** 🛍️ Shop (Shopping Bag) */
export function IconShop(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 8h10v10a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

/** ❤️ Heart */
export function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={filled ? "text-[var(--danger)]" : "text-[var(--ink-800)]"}
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

/** ◀ Chevron Left */
export function IconChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

/** ◀ Back Thin */
export function IconBackThin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 6.5L8.5 12l6 5.5" />
      <line x1="9" y1="12" x2="20" y2="12" />
    </svg>
  );
}

/** 🔍 Search */
export function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" />
    </svg>
  );
}

/** 🎚 Sliders */
export function IconSliders(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <circle cx="9" cy="6" r="2" fill="currentColor" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="15" cy="12" r="2" fill="currentColor" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="12" cy="18" r="2" fill="currentColor" />
    </svg>
  );
}

/** 🛒 Empty Cart Illustration */
export function IconEmpty({
  className = "w-24 h-24 mx-auto",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cart outline */}
      <path
        d="M8 16h4l4 28h28l6-20H18"
        stroke="var(--stone-500)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Wheels */}
      <circle cx="24" cy="52" r="3" fill="var(--stone-400)" />
      <circle cx="42" cy="52" r="3" fill="var(--stone-400)" />

      {/* Flower stem */}
      <path
        d="M32 16v12"
        stroke="var(--natural-600)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Flower center */}
      <circle cx="32" cy="14" r="3" fill="var(--terra-400)" />
      {/* Petals */}
      <circle cx="28.5" cy="14" r="2" fill="var(--terra-200)" />
      <circle cx="35.5" cy="14" r="2" fill="var(--terra-200)" />
      <circle cx="32" cy="10.5" r="2" fill="var(--terra-200)" />
      <circle cx="32" cy="17.5" r="2" fill="var(--terra-200)" />
    </svg>
  );
}
