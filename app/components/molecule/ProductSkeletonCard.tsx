// app/components/ProductSkeletonCard.tsx
export default function ProductSkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl bg-white">
      <div className="aspect-[4/3] w-full bg-neutral-100" />
      <div className="space-y-2 p-3">
        <div className="h-4 w-3/4 rounded bg-neutral-200" />
        <div className="h-3 w-1/2 rounded bg-neutral-200" />
        <div className="mt-2 h-4 w-1/3 rounded bg-neutral-200" />
      </div>
    </div>
  );
}
