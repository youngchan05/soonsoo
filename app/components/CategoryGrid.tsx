const cats = [
  {
    href: "/products?cat=bouquet",
    name: "Bouquet",
    desc: "기성 부케",
    icon: "💐",
  },
  {
    href: "/products?cat=stand",
    name: "Flower Stand",
    desc: "기성 화환/스탠드",
    icon: "🏵️",
  },
  { href: "/custom", name: "Custom", desc: "맞춤 제작", icon: "✨" },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1248px] px-4">
      <h2 className="mb-3 text-lg font-semibold">Shop by category</h2>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
        {cats.map((c) => (
          <li key={c.name}>
            <a
              href={c.href}
              className="block rounded-2xl bg-[#fffdf8] p-5 transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-semibold">{c.name}</div>
                  <div className="mt-1 text-sm text-neutral-600">{c.desc}</div>
                </div>
                <div className="text-3xl">{c.icon}</div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
