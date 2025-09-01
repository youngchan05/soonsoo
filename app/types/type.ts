export type Cat = "all" | "bouquet" | "basket" | "Flower Box";

export const CATS: { id: Cat; label: string }[] = [
  { id: "bouquet", label: "Bouquets" },
  { id: "basket", label: "Basket" },
  { id: "Flower Box", label: "Flower Box" },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  lead_time_days: number;
  thumbnail_url: string | null;
};

// types/product.ts
export type ProductColor =
  | "white"
  | "ivory"
  | "pink"
  | "peach"
  | "red"
  | "yellow"
  | "orange"
  | "purple"
  | "lavender"
  | "blue"
  | "green"
  | "pastel"
  | "vivid";

/** 브랜드 팔레트 (ProductColor → 시각 표현) */
export const COLOR_SWATCHES: { id: ProductColor; bg: string; ring?: string }[] =
  [
    { id: "white", bg: "#ffffff", ring: "var(--ink-300)" },
    { id: "ivory", bg: "#F4EFE3" },
    { id: "pink", bg: "#F7C4D9" },
    { id: "peach", bg: "#F6B38E" },
    { id: "red", bg: "#E46B71" },
    { id: "yellow", bg: "#F6D35B" },
    { id: "orange", bg: "#F2994A" },
    { id: "purple", bg: "#9B59B6" },
    { id: "lavender", bg: "#C7A4E0" },
    { id: "blue", bg: "#3498DB" },
    { id: "green", bg: "#6B7A46" },
    // 테마 컬러 믹스 예시(그라디언트)
    {
      id: "pastel",
      bg: "linear-gradient(135deg,#FFE6EA 0%,#FFF6D9 50%,#E8F7FF 100%)",
    },
    {
      id: "vivid",
      bg: "linear-gradient(135deg,#FF4D6D 0%,#FF9F1C 50%,#5BC0EB 100%)",
    },
  ];
