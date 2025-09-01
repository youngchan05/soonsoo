export default function ValueBar() {
  const items = [
    { title: "Global Delivery", desc: "해외 주문 · 한국 배송", icon: "🌍" },
    { title: "Fresh Guarantee", desc: "시들면 100% 재제작", icon: "🌿" },
    { title: "Same-day in Seoul", desc: "오전 주문 당일 가능", icon: "⚡" },
  ];
  return (
    <ul className="grid grid-cols-1 gap-3 rounded-2xl border bg-white p-4 md:grid-cols-3">
      {items.map((it) => (
        <li key={it.title} className="flex items-center gap-3 rounded-xl p-3">
          <span className="text-2xl">{it.icon}</span>
          <div>
            <div className="text-[14px] font-medium">{it.title}</div>
            <div className="text-[13px] text-neutral-600">{it.desc}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
