// app/lib/repos/products.ts
import { Cat, Product } from "@/app/types/type";
import { SupabaseClient } from "@supabase/supabase-js";

export type ListProductsParams = {
  category?: Cat;
  search?: string;
  limit?: number; // 페이지 크기 (기본 12)
  cursor?: string | null; // keyset 커서: created_at ISO 문자열
  publishedOnly?: boolean; // 기본 true
};

export const PRODUCTS_SELECT =
  "id,name,price,sale_price,thumbnail_url,lead_time_days,stock,category,colors,created_at";

export async function listProducts(
  sb: SupabaseClient,
  {
    category = "all",
    search,
    limit = 12,
    cursor,
    publishedOnly = true,
  }: ListProductsParams
): Promise<{ items: Product[]; nextCursor: string | null }> {
  let q = sb
    .from("products")
    .select(PRODUCTS_SELECT)
    .order("created_at", { ascending: false });

  if (publishedOnly) q = q.eq("is_published", true);
  if (category && category !== "all") q = q.eq("category", category);
  if (search) q = q.ilike("name", `%${search}%`);

  // keyset pagination: 현재 커서(created_at)보다 이전 것만
  if (cursor) q = q.lt("created_at", cursor);

  q = q.limit(limit);

  const { data, error } = await q;
  if (error) throw error;

  // 다음 커서: 마지막 아이템의 created_at
  const nextCursor =
    data && data.length === limit ? data[data.length - 1].created_at : null;

  return { items: (data as Product[]) || [], nextCursor };
}
