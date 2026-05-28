export default function ProfileLoading() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Cover + avatar skeleton */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
          <div className="h-32 sm:h-44 bg-muted" />
          <div className="px-6 pb-6 -mt-12 flex flex-col items-center sm:items-start sm:flex-row gap-4">
            <div className="w-24 h-24 rounded-full bg-muted border-4 border-card" />
            <div className="flex-1 space-y-2 pt-2 text-center sm:text-left">
              <div className="w-40 h-5 bg-muted rounded mx-auto sm:mx-0" />
              <div className="w-56 h-3 bg-muted rounded mx-auto sm:mx-0" />
            </div>
            <div className="w-28 h-9 bg-muted rounded-xl" />
          </div>
        </div>

        {/* Info sections */}
        <div className="mt-6 space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse space-y-4">
              <div className="w-32 h-4 bg-muted rounded" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="space-y-1.5">
                    <div className="w-16 h-2.5 bg-muted rounded" />
                    <div className="w-24 h-3.5 bg-muted rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
