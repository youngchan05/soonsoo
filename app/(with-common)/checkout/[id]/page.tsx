import { supabaseAdmin, supabaseServer } from "@/app/lib/supabaseServer";
import CheckoutClient from "./client";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
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
      "id, order_no, user_id, status, total_amount, contact_email, contact_phone, order_items:order_items(product_id, qty, unit_price, subtotal)"
    )
    .eq("id", params.id)
    .single();

  if (error || !order)
    return <div className="p-6">주문을 찾을 수 없습니다.</div>;

  // 접근 가드
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
      <h1 className="text-2xl font-semibold">체크아웃</h1>
      <p className="mt-1 text-sm text-neutral-600">주문번호 {order.order_no}</p>

      <section className="mt-6 rounded-xl border p-4">
        <h2 className="font-medium">연락처</h2>
        <CheckoutClient
          orderId={order.id}
          defaultEmail={order.contact_email ?? ""}
          defaultPhone={order.contact_phone ?? ""}
          total={order.total_amount}
        />
      </section>
      {/* 주문 요약 렌더는 그대로 */}
    </main>
  );
}
