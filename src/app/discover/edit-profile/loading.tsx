export default function EditProfileLoading() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-10 h-10 bg-muted rounded-xl" />
          <div className="space-y-1.5">
            <div className="w-28 h-5 bg-muted rounded" />
            <div className="w-20 h-3 bg-muted rounded" />
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="flex gap-2 overflow-hidden animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-9 w-20 rounded-lg bg-muted shrink-0" />
          ))}
        </div>

        {/* Form card skeleton */}
        <div className="bg-card border border-border rounded-2xl animate-pulse">
          <div className="p-5 space-y-1.5">
            <div className="w-32 h-4 bg-muted rounded" />
            <div className="w-48 h-3 bg-muted rounded" />
          </div>
          <div className="h-px bg-border" />
          <div className="p-6 space-y-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="w-20 h-2.5 bg-muted rounded" />
                <div className="h-11 bg-muted rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
