// app/components/ProductSkeletonCard.tsx
export default function ProductSkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-1)] shadow-[var(--shadow-soft)]">
      {/* 이미지 자리 */}
      <div className="aspect-[4/3] w-full bg-[var(--surface-2)]" />

      {/* 텍스트 자리 */}
      <div className="space-y-2 p-3">
        <div className="h-4 w-3/4 rounded bg-[var(--stone-200)]" />
        <div className="h-3 w-1/2 rounded bg-[var(--stone-200)]" />
        <div className="mt-2 h-4 w-1/3 rounded bg-[var(--stone-300)]" />
      </div>
    </div>
  );
}
