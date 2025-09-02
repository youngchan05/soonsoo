import { Product } from "@/app/types/type";
import React from "react";

type Props = {
  product: Product;
  qty: number;
  subtotal: number;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
};

function formatKRW(v: number) {
  try {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(v);
  } catch {
    return `${v.toLocaleString()}원`;
  }
}

const CartItem = ({ product, remove, setQty, qty, subtotal }: Props) => {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-[var(--line-soft)] bg-[var(--surface-2)] p-3">
      <div className="h-20 w-20 overflow-hidden rounded-md bg-[var(--surface-3)] flex-shrink-0">
        {product.thumbnail_url ? (
          <img
            src={product.thumbnail_url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--stone-400)] text-xs">
            이미지 없음
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-[14px] font-medium text-[var(--stone-800)]">
          {product.name}
        </h3>
        <p className="mt-0.5 text-[12px] text-[var(--stone-500)]">
          리드타임 {product.lead_time_days}일
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center rounded-md border border-[var(--line)] bg-[var(--surface-1)]">
            <button
              onClick={() => setQty(product.id, qty - 1)}
              className="px-2 py-1 text-sm text-[var(--stone-700)] hover:bg-[var(--surface-2)]"
            >
              −
            </button>
            <input
              value={qty}
              onChange={(e) => setQty(product.id, Number(e.target.value))}
              className="h-8 w-10 border-x border-[var(--line-soft)] bg-[var(--surface-1)] text-center text-[13px] text-[var(--stone-800)] outline-none"
            />
            <button
              onClick={() => setQty(product.id, qty + 1)}
              className="px-2 py-1 text-sm text-[var(--stone-700)] hover:bg-[var(--surface-2)]"
            >
              ＋
            </button>
          </div>

          <div className="text-right">
            <div className="text-[12px] text-[var(--stone-500)]">
              단가 {formatKRW(product.price)}
            </div>
            <div className="text-[14px] font-semibold text-[var(--stone-800)]">
              {formatKRW(subtotal)}
            </div>
          </div>
        </div>

        <button
          onClick={() => remove(product.id)}
          className="mt-1 text-[12px] text-[var(--stone-500)] hover:text-[var(--terra-500)] hover:underline"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
