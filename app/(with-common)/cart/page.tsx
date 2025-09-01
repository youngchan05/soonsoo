"use client";

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

export default function CartPage() {
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
    <main className="mx-auto w-full max-w-[1248px] px-4 py-10">
      <h1 className="text-2xl font-semibold">장바구니</h1>

      {!loading && rows.length === 0 && (
        <div className="mt-8 rounded-xl border bg-white p-6 text-center text-neutral-600">
          장바구니가 비어 있어요.{" "}
          <a href="/products" className="text-[#6B7A46] underline">
            상품 보러가기
          </a>
        </div>
      )}

      {rows.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-3">
            {rows.map(({ product, qty, subtotal }) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-2xl border bg-white p-4"
              >
                <div className="h-24 w-32 overflow-hidden rounded-xl bg-neutral-100">
                  {product.thumbnail_url ? (
                    <img
                      src={product.thumbnail_url}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-400 text-sm">
                      이미지 없음
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-medium">{product.name}</h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    리드타임 {product.lead_time_days}일
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {/* 수량 */}
                    <div className="flex items-center rounded-xl border">
                      <button
                        className="px-3 py-2 text-lg"
                        onClick={() => setQty(product.id, qty - 1)}
                        aria-label="minus"
                      >
                        −
                      </button>
                      <input
                        value={qty}
                        onChange={(e) =>
                          setQty(product.id, Number(e.target.value))
                        }
                        className="h-10 w-14 border-x text-center outline-none"
                        inputMode="numeric"
                      />
                      <button
                        className="px-3 py-2 text-lg"
                        onClick={() => setQty(product.id, qty + 1)}
                        aria-label="plus"
                      >
                        ＋
                      </button>
                    </div>

                    <div className="ml-auto text-right">
                      <div className="text-sm text-neutral-600">
                        단가 {formatKRW(product.price)}
                      </div>
                      <div className="text-base font-semibold">
                        소계 {formatKRW(subtotal)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => remove(product.id)}
                    className="mt-2 text-sm text-neutral-500 hover:underline"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <button
                onClick={clearAll}
                className="text-sm text-neutral-500 hover:underline"
              >
                전체 삭제
              </button>
              <a
                href="/products"
                className="text-sm text-[#6B7A46] hover:underline"
              >
                계속 쇼핑
              </a>
            </div>
          </section>

          {/* 합계/CTA */}
          <aside className="h-fit rounded-2xl border bg-white p-5">
            <h2 className="text-lg font-semibold">주문 요약</h2>
            <div className="mt-3 flex justify-between text-sm">
              <span>상품 합계</span>
              <span>{formatKRW(total)}</span>
            </div>
            {/* 배송비/할인 등은 추후 */}
            <div className="mt-3 border-t pt-3 flex justify-between text-base font-semibold">
              <span>총 결제금액</span>
              <span>{formatKRW(total)}</span>
            </div>
            <button
              onClick={checkout}
              className="mt-4 h-12 w-full rounded-xl bg-[#6B7A46] text-white hover:bg-[#5F6E3F]"
            >
              주문하기
            </button>
          </aside>
        </div>
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
