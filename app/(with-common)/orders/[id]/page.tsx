import { supabaseAdmin, supabaseServer } from "@/app/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { orderNo?: string };
}) {
  const sbAdmin = supabaseAdmin();
  const { data: order, error } = await sbAdmin
    .from("orders")
    .select(
      "id, order_no, user_id, status, total_amount, contact_email, contact_phone, created_at, order_items:order_items(product_id, qty, unit_price, subtotal)"
    )
    .eq("id", params.id)
    .single();

  if (error || !order)
    return <div className="p-6">주문을 찾을 수 없습니다.</div>;

  // 접근 가드: 로그인 소유자 or URL의 orderNo 일치
  const sbServer = await supabaseServer();
  const { data: userData } = await sbServer.auth
    .getUser()
    .catch(() => ({ data: { user: null } as any }));
  const isOwner = !!userData?.user?.id && order.user_id === userData.user.id;
  const byOrderNo =
    !!searchParams?.orderNo && searchParams.orderNo === order.order_no;

  if (!isOwner && !byOrderNo) {
    return (
      <div className="p-6">
        접근 권한이 없습니다. (주문번호와 함께 접근하거나 로그인하세요)
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[720px] px-4 py-10">
      <h1 className="text-2xl font-semibold">주문 {order.order_no}</h1>
      <p className="mt-1 text-sm text-neutral-600">
        상태: {order.status} · 생성일{" "}
        {new Date(order.created_at).toLocaleString("ko-KR")}
      </p>

      <section className="mt-6 rounded-xl border p-4">
        <h2 className="font-medium">연락처</h2>
        <p className="mt-2 text-sm">이메일: {order.contact_email ?? "-"}</p>
        <p className="text-sm">전화: {order.contact_phone ?? "-"}</p>
      </section>

      <section className="mt-6 rounded-xl border p-4">
        <h2 className="font-medium">아이템</h2>
        <ul className="mt-2 space-y-2">
          {order.order_items?.map((it: any, i: number) => (
            <li key={i} className="flex justify-between text-sm">
              <span>
                상품 {it.product_id} × {it.qty}
              </span>
              <span>{it.subtotal.toLocaleString()}원</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 border-t pt-3 text-right font-semibold">
          총액 {order.total_amount.toLocaleString()}원
        </div>
      </section>
    </main>
  );
}
