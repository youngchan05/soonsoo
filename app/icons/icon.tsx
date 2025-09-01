export function IconCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
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
export function IconUser(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 21c0-3.314-3.582-6-8-6s-8 2.686-8 6" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}
export function IconHamburger(props: React.SVGProps<SVGSVGElement>) {
  const strokeW = props.strokeWidth ?? 2;
  return (
    <svg
      width={props.width ?? 34}
      height={props.height ?? 34}
      viewBox="0 0 24 24"
      {...props}
      fill="#6b7a46"
    >
      {/* 중심(12,12) 기준 약 -25도 회전 → ↗ 방향으로 기울어짐 */}
      <g stroke="currentColor" strokeLinecap="round">
        {/* 위줄: 중간 길이 */}
        <line x1="5" y1="8" x2="17" y2="8" strokeWidth={strokeW} />
        {/* 가운데: 가장 짧게 */}
        <line x1="5" y1="12" x2="14" y2="12" strokeWidth={strokeW} />
        {/* 아래줄: 가장 길게 */}
        <line x1="5" y1="16" x2="19" y2="16" strokeWidth={strokeW} />
      </g>
    </svg>
  );
}
export function IconClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/** 집(Home) */
export function IconHome(props: React.SVGProps<SVGSVGElement>) {
  const strokeW = props.strokeWidth ?? 2;
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
    >
      <path
        d="M3 10.5 12 4l9 6.5M5 10.5V20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9.5"
        stroke="currentColor"
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 22v-6h5v6"
        stroke="currentColor"
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 상점(Shop) – 쇼핑백 형태 */
export function IconShop(props: React.SVGProps<SVGSVGElement>) {
  const strokeW = props.strokeWidth ?? 2;
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
    >
      <>
        <path
          d="M7 8h10v10a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V8Z"
          stroke="currentColor"
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 8V6a3 3 0 0 1 6 0v2"
          stroke="currentColor"
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    </svg>
  );
}

export function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={filled ? "text-[var(--danger)]" : "text-[var(--ink-800)]"}
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

export function IconChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...props}>
      <path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

// icons.tsx
export function IconBackThin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <path
        d="M14.5 6.5L8.5 12l6 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="9"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// icons.tsx (추가)
export function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      <line
        x1="16.65"
        y1="16.65"
        x2="21"
        y2="21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconSliders(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...props}>
      <line
        x1="4"
        y1="6"
        x2="20"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="9" cy="6" r="2" fill="currentColor" />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="15" cy="12" r="2" fill="currentColor" />
      <line
        x1="4"
        y1="18"
        x2="20"
        y2="18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="18" r="2" fill="currentColor" />
    </svg>
  );
}
