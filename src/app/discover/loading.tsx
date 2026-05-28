export default function DiscoverLoading() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-muted/30">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Mobile stats skeleton */}
        <div className="lg:hidden mb-4">
          <div className="flex gap-3 overflow-x-auto -mx-3 px-3 pb-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-card border border-border shadow-sm shrink-0 animate-pulse">
                <div className="w-4 h-4 bg-muted rounded" />
                <div className="w-16 h-3 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-4 sm:gap-6">
          {/* Sidebar skeleton */}
          <aside className="hidden lg:block space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 animate-pulse">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-muted" />
                <div className="w-24 h-4 bg-muted rounded" />
                <div className="w-32 h-3 bg-muted rounded" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 animate-pulse space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="w-20 h-3 bg-muted rounded" />
                  <div className="w-8 h-5 bg-muted rounded" />
                </div>
              ))}
            </div>
          </aside>

          {/* Feed skeleton */}
          <main className="space-y-5 min-w-0">
            {/* Recently active */}
            <div className="bg-card border border-border rounded-2xl p-4 animate-pulse">
              <div className="w-28 h-4 bg-muted rounded mb-3" />
              <div className="flex gap-3 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-14 h-14 rounded-full bg-muted shrink-0" />
                ))}
              </div>
            </div>

            {/* Filter bar */}
            <div className="flex gap-2 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-9 w-20 rounded-full bg-muted animate-pulse" />
              ))}
            </div>

            {/* Feed cards */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 animate-pulse space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted" />
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-muted rounded" />
                    <div className="w-48 h-3 bg-muted rounded" />
                  </div>
                </div>
                <div className="h-48 bg-muted rounded-xl" />
                <div className="flex gap-3">
                  <div className="w-20 h-8 bg-muted rounded-full" />
                  <div className="w-20 h-8 bg-muted rounded-full" />
                </div>
              </div>
            ))}
          </main>

          {/* Right sidebar skeleton */}
          <aside className="hidden lg:block space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 animate-pulse space-y-3">
              <div className="w-24 h-4 bg-muted rounded" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="space-y-1.5 flex-1">
                    <div className="w-20 h-3 bg-muted rounded" />
                    <div className="w-28 h-2.5 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
