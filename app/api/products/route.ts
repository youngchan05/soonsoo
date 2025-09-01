// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/app/lib/supabaseServer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // ✅ 여러 카테고리: ?cat=bouquet&cat=basket ...
  const cats = searchParams.getAll("cat"); // []면 전체
  const cursorCreatedAt = searchParams.get("cursorCreatedAt");
  const cursorId = searchParams.get("cursorId");

  const search = searchParams.get("search") || undefined;
  const colors = searchParams.getAll("color"); // 여러 색상
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const PAGE_SIZE = 12;

  try {
    const sb = await supabaseServer();
    let q = sb
      .from("products")
      .select(
        "id,name,price,thumbnail_url,lead_time_days,category,created_at,colors"
      )
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(PAGE_SIZE + 1);

    // ✅ 카테고리 다중(in)
    if (cats.length > 0) q = q.in("category", cats);

    if (search) q = q.ilike("name", `%${search}%`);

    // ✅ 색상 배열 컬럼은 overlaps 사용 (하나라도 겹치면)
    if (colors.length > 0) q = q.overlaps("colors", colors as string[]);

    if (minPrice != null) q = q.gte("price", Number(minPrice));
    if (maxPrice != null) q = q.lte("price", Number(maxPrice));

    // 커서
    if (cursorCreatedAt && cursorId) {
      q = q.or(
        `created_at.lt.${cursorCreatedAt},and(created_at.eq.${cursorCreatedAt},id.lt.${cursorId})`
      );
    }

    const { data, error } = await q;
    if (error) throw error;

    let items = data ?? [];
    let hasNext = false;

    if (items.length > PAGE_SIZE) {
      hasNext = true;
      items = items.slice(0, PAGE_SIZE);
    }

    const last = items[items.length - 1];
    const nextCursor = last
      ? { created_at: last.created_at, id: last.id }
      : null;

    return NextResponse.json(
      { data: items, nextCursor, hasNext },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message ?? "Failed to load products" },
      { status: 500 }
    );
  }
}
