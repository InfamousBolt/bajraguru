export function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-sage-light/30 ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <SkeletonBlock className="aspect-[3/4] rounded-none" />
      <div className="px-4 py-4 space-y-2">
        <SkeletonBlock className="h-5 w-3/4" />
        <SkeletonBlock className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4, columns = 'sm:grid-cols-2 lg:grid-cols-4' }) {
  return (
    <div className={`grid gap-6 ${columns}`}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-11 w-11 rounded-full" />
        <SkeletonBlock className="h-9 w-16" />
      </div>
      <SkeletonBlock className="mt-3 h-4 w-20" />
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <section className="bg-offwhite py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SkeletonBlock className="mb-8 h-4 w-48" />
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SkeletonBlock className="aspect-square rounded-3xl" />
            <div className="mt-4 flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-20 w-20 shrink-0 rounded-xl" />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-10 w-3/4" />
            <SkeletonBlock className="h-8 w-1/3" />
            <SkeletonBlock className="h-20 w-full" />
            <SkeletonBlock className="h-4 w-20" />
            <div className="flex gap-4 pt-4">
              <SkeletonBlock className="h-12 w-48 rounded-full" />
              <SkeletonBlock className="h-12 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReviewSkeleton({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-white p-6 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <SkeletonBlock className="h-4 w-28" />
              <SkeletonBlock className="h-5 w-20 rounded-full" />
            </div>
            <SkeletonBlock className="h-4 w-20" />
          </div>
          <SkeletonBlock className="h-12 w-full" />
          <SkeletonBlock className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}
