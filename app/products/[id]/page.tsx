// app/products/[id]/page.tsx

import { supabaseServer } from "@/app/lib/supabaseServer";
import ProductClient from "./product.client";

export const dynamic = "force-dynamic";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  console.log(params, "params");
  const supabase = await supabaseServer();

  const { data: product, error: pErr } = await supabase
    .from("products")
    .select("id,name,price,lead_time_days,colors,thumbnail_url")
    .eq("id", params.id)
    .eq("is_published", true)
    .single();

  if (pErr || !product) {
    return (
      <div className="mx-auto max-w-[1248px] p-6">상품을 찾을 수 없습니다.</div>
    );
  }

  const { data: images } = await supabase
    .from("product_images")
    .select("id,url,alt,sort")
    .eq("product_id", product.id)
    .order("sort", { ascending: true });

  const { data: reviews } = await supabase
    .from("reviews")
    .select("id,rating,body,display_name,created_at")
    .eq("product_id", product.id)
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(20);

  const avg = reviews?.length
    ? Math.round(
        (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10
      ) / 10
    : null;

  return (
    <main className="mx-auto w-full max-w-[1248px] px-4 py-10">
      <ProductClient
        product={product}
        images={images ?? []}
        reviews={reviews ?? []}
        avgRating={avg}
      />
    </main>
  );
}
