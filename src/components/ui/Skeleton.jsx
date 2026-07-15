export function SkeletonBlock({ className = "" }) {
  return <div className={`animate-pulse bg-white/10 rounded-xl ${className}`} />;
}

export function SkeletonCard({ className = "" }) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse ${className}`}>
      <div className="h-48 bg-white/10" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
        <div className="h-3 bg-white/10 rounded w-full" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="bg-white/5 p-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-white/10 rounded flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="p-4 flex gap-4 border-t border-white/5">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="h-3 bg-white/10 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-white/10" />
      </div>
      <div className="h-7 bg-white/10 rounded w-16 mb-2" />
      <div className="h-3 bg-white/10 rounded w-24" />
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-32 bg-white/10" />
      <div className="pt-16 px-8 pb-8 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-6 bg-white/10 rounded w-40" />
            <div className="h-3 bg-white/10 rounded w-28" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-white/10" />
              <div className="flex-1 space-y-2">
                <div className="h-2 bg-white/10 rounded w-16" />
                <div className="h-3 bg-white/10 rounded w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
