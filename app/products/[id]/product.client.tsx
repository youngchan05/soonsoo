"use client";

import { addToCart } from "@/app/lib/cart";
import { supabaseBrowser } from "@/app/lib/supabaseClient";
import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  lead_time_days: number;
  colors: string[];
  thumbnail_url: string | null;
};
type Img = { id: string; url: string; alt: string | null; sort: number };
type Rev = {
  id: string;
  rating: number;
  body: string;
  display_name: string;
  created_at: string;
};

export default function ProductClient({
  product,
  images,
  reviews,
  avgRating,
}: {
  product: Product;
  images: Img[];
  reviews: Rev[];
  avgRating: number | null;
}) {
  const [qty, setQty] = useState(1);
  const pics = images?.length
    ? images
    : product.thumbnail_url
    ? [{ id: "thumb", url: product.thumbnail_url, alt: product.name, sort: 0 }]
    : [];
  const [cur, setCur] = useState(0);
  const total = useMemo(() => product.price * qty, [product.price, qty]);

  const onAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      qty,
      // options: color ? { color } : undefined,
      thumb: product.thumbnail_url ?? undefined,
    });
    alert("장바구니에 담았어요");
  };

  async function buyNow() {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, qty }),
    });
    if (!res.ok) {
      const { message } = await res
        .json()
        .catch(() => ({ message: "주문 생성 실패" }));
      alert(message);
      return;
    }
    const { orderId, orderNo } = await res.json();
    // TODO: 결제/체크아웃 페이지로 라우팅
    window.location.href = `/orders/${orderId}?orderNo=${encodeURIComponent(
      orderNo
    )}`;
  }

  async function submitReview(formData: FormData) {
    const display_name = String(formData.get("name") || "").trim();
    const body = String(formData.get("body") || "").trim();
    const rating = Number(formData.get("rating") || 5);
    if (!display_name || !body)
      return alert("이름과 리뷰 내용을 입력해 주세요.");

    const sb = supabaseBrowser();
    const { error } = await sb.from("reviews").insert({
      product_id: product.id,
      rating,
      body,
      display_name,
    });
    if (error) {
      alert(error.message);
      return;
    }
    alert("리뷰가 등록되었습니다. 승인 후 노출됩니다!");
    (document.getElementById("review-form") as HTMLFormElement | null)?.reset();
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* 갤러리 */}
      <section>
        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100">
          {pics[cur] ? (
            <img
              src={pics[cur].url}
              alt={pics[cur].alt ?? product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-400">
              이미지 없음
            </div>
          )}
        </div>
        {pics.length > 1 && (
          <ul className="mt-3 grid grid-cols-5 gap-2">
            {pics.map((p, i) => (
              <li key={p.id}>
                <button
                  onClick={() => setCur(i)}
                  className={`block overflow-hidden rounded-lg border ${
                    i === cur
                      ? "border-[#6B7A46]"
                      : "border-transparent hover:border-neutral-300"
                  }`}
                >
                  <img
                    src={p.url}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 정보/주문 */}
      <section>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="mt-1 text-lg font-bold">{formatKRW(product.price)}</div>
        <p className="mt-1 text-sm text-neutral-600">
          리드타임 {product.lead_time_days}일
        </p>
        {avgRating != null && (
          <p className="mt-1 text-sm text-neutral-700">
            평점 {avgRating} / 5 ({reviews.length}개)
          </p>
        )}

        {/* 수량 */}
        <div className="mt-5 flex items-center gap-3">
          <label className="text-sm text-neutral-700">수량</label>
          <div className="flex items-center rounded-xl border">
            <button
              className="px-3 py-2 text-lg"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="minus"
            >
              −
            </button>
            <input
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="h-10 w-14 border-x text-center outline-none"
              inputMode="numeric"
            />
            <button
              className="px-3 py-2 text-lg"
              onClick={() => setQty((q) => q + 1)}
              aria-label="plus"
            >
              ＋
            </button>
          </div>
        </div>

        {/* 금액/버튼 */}
        <div className="mt-4 text-sm text-neutral-700">총 금액</div>
        <div className="text-xl font-bold">{formatKRW(total)}</div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={buyNow}
            className="h-12 flex-1 rounded-xl bg-[#6B7A46] text-white hover:bg-[#5F6E3F]"
          >
            지금 구매
          </button>
          <button
            onClick={() => onAdd()}
            className="h-12 flex-1 rounded-xl border hover:bg-neutral-50"
          >
            장바구니
          </button>
        </div>

        {/* 색상 뱃지(있으면) */}
        {product.colors?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {product.colors.map((c) => (
              <span
                key={c}
                className="rounded-full border px-2 py-0.5 text-[11px]"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* 리뷰 목록 */}
      <section className="lg:col-span-2">
        <h2 className="mb-3 text-lg font-semibold">리뷰</h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-neutral-600">아직 리뷰가 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li key={r.id} className="rounded-xl border p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{r.display_name}</span>
                  <span className="text-[#6B7A46]">★ {r.rating}</span>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-[14px]">{r.body}</p>
                <p className="mt-1 text-[12px] text-neutral-500">
                  {new Date(r.created_at).toLocaleDateString("ko-KR")}
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* 리뷰 작성 */}
        <form
          id="review-form"
          className="mt-6 space-y-3 rounded-xl border p-4"
          onSubmit={(e) => {
            e.preventDefault();
            submitReview(new FormData(e.currentTarget));
          }}
        >
          <h3 className="font-medium">리뷰 작성</h3>
          <div className="flex gap-2">
            <input
              name="name"
              placeholder="이름"
              className="h-10 flex-1 rounded-lg border px-3"
            />
            <select
              name="rating"
              defaultValue="5"
              className="h-10 w-28 rounded-lg border px-2"
            >
              {[5, 4, 3, 2, 1].map((v) => (
                <option key={v} value={v}>
                  ★ {v}
                </option>
              ))}
            </select>
          </div>
          <textarea
            name="body"
            placeholder="리뷰 내용을 적어주세요"
            className="min-h-24 w-full rounded-lg border p-3"
          />
          <button className="h-11 rounded-xl bg-[#6B7A46] px-4 text-white hover:bg-[#5F6E3F]">
            등록
          </button>
          <p className="text-xs text-neutral-500">
            * 등록 후 관리자 승인 시 노출됩니다.
          </p>
        </form>
      </section>
    </div>
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
