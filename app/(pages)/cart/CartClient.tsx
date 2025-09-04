"use client";

import CartItem from "@/app/components/molecule/CartItem";
import { IconEmpty } from "@/icons/Icon";
import { supabaseBrowser } from "@/app/lib/supabaseClient";
import { useEffect, useMemo, useState } from "react";

type CartItem = { productId: string; qty: number };
type Product = {
  id: string;
  name: string;
  price: number;
  lead_time_days: number;
  thumbnail_url: string | null;
  is_published?: boolean;
};

const CART_KEY = "cart:v1";

export const dynamic = "force-dynamic"; // ✅ 프리렌더링 방지

// 안전한 파서
function readCartLS(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);

    // 배열 형태: [{productId, qty}]
    if (Array.isArray(parsed)) {
      return parsed
        .map((i) => ({
          productId: String(i.productId || i.id || ""),
          qty: Math.max(1, Number(i.qty) || 1),
        }))
        .filter((i) => i.productId);
    }

    // 객체 형태: { [productId]: qty }
    if (parsed && typeof parsed === "object") {
      return Object.entries(parsed).map(([productId, qty]) => ({
        productId,
        qty: Math.max(1, Number(qty) || 1),
      }));
    }

    return [];
  } catch (e) {
    console.warn("[cart] invalid JSON:", e);
    return [];
  }
}

export default function CartClient() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 1) 첫 로드 + 스토리지/커스텀 이벤트 동기화
  useEffect(() => {
    const sync = () => setCart(readCartLS());
    sync();

    // 다른 탭에서 바뀔 때
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) sync();
    };
    window.addEventListener("storage", onStorage);

    // 같은 탭 내 다른 컴포넌트에서 알림 보낼 때
    const onCustom = () => sync();
    window.addEventListener("cart:changed", onCustom as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart:changed", onCustom as EventListener);
    };
  }, []);

  // 2) 상품 상세 조회
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const ids = Array.from(new Set(cart.map((i) => i.productId)));
        if (!ids.length) {
          setProducts([]);
          return;
        }
        const sb = supabaseBrowser();
        const { data, error } = await sb
          .from("products")
          .select("id,name,price,lead_time_days,thumbnail_url,is_published")
          .in("id", ids)
          .eq("is_published", true);

        if (error) throw error;
        setProducts(data ?? []);
      } catch (e) {
        console.error("[cart] fetch products error:", e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    })();
    // cart의 제품 id 목록이 바뀌면 다시 조회
  }, [cart.map((c) => c.productId).join(",")]);

  // 3) 합치기/정렬
  const rows = useMemo(() => {
    const map = new Map(products.map((p) => [p.id, p]));
    return cart
      .map((ci) => {
        const p = map.get(ci.productId);
        if (!p) return null; // 비공개/삭제된 상품은 스킵
        return { product: p, qty: ci.qty, subtotal: p.price * ci.qty };
      })
      .filter(Boolean) as { product: Product; qty: number; subtotal: number }[];
  }, [cart, products]);

  const total = useMemo(() => rows.reduce((s, r) => s + r.subtotal, 0), [rows]);

  function saveCart(next: CartItem[]) {
    setCart(next);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      // 같은 탭에서도 즉시 반응하도록 커스텀 이벤트 발행
      window.dispatchEvent(
        new CustomEvent("cart:changed", {
          detail: {
            count: next.reduce((s, i) => s + (Number(i.qty) || 0), 0),
            total: next.reduce((s, i) => s + (Number(i.qty) || 0), 0), // 필요하면 금액 계산으로 교체
          },
        })
      );
    } catch {}
  }

  function setQty(productId: string, qty: number) {
    qty = Math.max(1, Math.floor(qty || 1));
    const next = cart.map((i) =>
      i.productId === productId ? { ...i, qty } : i
    );
    saveCart(next);
  }

  function remove(productId: string) {
    const next = cart.filter((i) => i.productId !== productId);
    saveCart(next);
  }

  function clearAll() {
    saveCart([]);
  }

  async function checkout() {
    if (!rows.length) {
      alert("장바구니가 비어있습니다.");
      return;
    }
    try {
      const res = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: rows.map((r) => ({ productId: r.product.id, qty: r.qty })),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ message: "주문 생성 실패" }));
        throw new Error(j.message);
      }
      const { orderId, orderNo } = await res.json();
      clearAll();
      window.location.href = `/checkout/${orderId}?orderNo=${encodeURIComponent(
        orderNo
      )}`;
    } catch (e: any) {
      alert(e?.message ?? "주문 생성에 실패했습니다.");
    }
  }

  // (나머지 렌더는 동일)
  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 pb-28 bg-[var(--surface-1)]">
      {!loading && rows.length === 0 && (
        <div className="mt-20 text-center">
          <IconEmpty className="w-20 h-20 mb-6" />
          <p className="text-[var(--stone-600)] mb-6">
            장바구니가 비어 있어요 🌸
          </p>
          <a
            href="/products"
            className="inline-block rounded-lg bg-[var(--natural-700)] px-6 py-3 text-white text-sm font-medium hover:bg-[var(--natural-600)] transition"
          >
            상품 보러가기
          </a>
        </div>
      )}

      {rows.length > 0 && (
        <>
          {/* 상품 리스트 */}
          <section className="space-y-3 mt-[30px]">
            {rows.map(({ product, qty, subtotal }) => (
              <CartItem
                key={product.id}
                product={product}
                qty={qty}
                subtotal={subtotal}
                remove={remove}
                setQty={setQty}
              />
            ))}

            <div className="flex justify-between pt-2">
              <button
                onClick={clearAll}
                className="text-[12px] text-[var(--stone-500)] hover:text-[var(--terra-500)] hover:underline"
              >
                전체 삭제
              </button>
              <a
                href="/products"
                className="text-[12px] text-[var(--natural-600)] hover:underline"
              >
                계속 쇼핑
              </a>
            </div>
          </section>

          {/* 주문 상세 내역 */}
          <section className="mt-8 rounded-xl border border-[var(--line-soft)] bg-[var(--surface-2)] p-5">
            <h2 className="text-base font-semibold text-[var(--natural-700)] mb-4">
              주문 상세 내역
            </h2>
            <div className="space-y-2 text-sm text-[var(--stone-700)]">
              <div className="flex justify-between">
                <span>상품 합계</span>
                <span>{formatKRW(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>배송비</span>
                <span>{formatKRW(0)}</span>
              </div>
            </div>
            <div className="mt-3 border-t border-[var(--line-soft)] pt-3 flex justify-between text-sm font-semibold text-[var(--stone-800)]">
              <span>총 결제금액</span>
              <span>{formatKRW(total)}</span>
            </div>
          </section>

          {/* 하단 고정 Checkout 버튼 */}
          <div className="fixed bottom-0 left-0 bottom-[20px] right-0 ">
            <div className="mx-auto flex max-w-[1248px] items-center justify-end px-4">
              <button
                onClick={checkout}
                className="w-full h-11 rounded-lg bg-[var(--natural-700)] px-6 text-white text-sm font-medium shadow-[var(--shadow-soft)] hover:bg-[var(--natural-600)] transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

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
