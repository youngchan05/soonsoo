// app/lib/cart.ts
export type CartItem = {
  productId: string;
  name: string;
  unitPrice: number; // 담을 당시 가격 스냅샷
  qty: number;
  thumb?: string;
  options?: Record<string, string>; // 예: { color: "red" }
};

const KEY = "cart:v1";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  // 헤더/다른 탭 동기화용 이벤트
  window.dispatchEvent(new CustomEvent("cart:changed"));
}

function sameKey(a: CartItem, b: CartItem) {
  return (
    a.productId === b.productId &&
    JSON.stringify(a.options || {}) === JSON.stringify(b.options || {})
  );
}

export function addToCart(newItem: CartItem) {
  const cart = readCart();
  const i = cart.findIndex((c) => sameKey(c, newItem));
  if (i >= 0) cart[i].qty += newItem.qty;
  else cart.push(newItem);
  writeCart(cart);
  return cart;
}

export function cartCount() {
  return readCart().reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
}
