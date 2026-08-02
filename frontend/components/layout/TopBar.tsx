import { Search, Bell } from "lucide-react";

export function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-edge bg-void/80 backdrop-blur-xl px-4 lg:px-8 py-4">
      <h1 className="font-display text-xl font-bold">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-edge bg-surface px-3 py-2 w-64">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            placeholder="Search anime, manga, games..."
            className="bg-transparent text-sm outline-none placeholder:text-muted w-full"
          />
        </div>
        <button
          aria-label="Notifications"
          className="relative rounded-xl border border-edge bg-surface p-2.5 hover:border-cyan-400/50 transition-colors"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </button>
      </div>
    </header>
  );
}
