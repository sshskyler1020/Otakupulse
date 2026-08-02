import { Clapperboard, BookOpen, Gamepad2, Trophy, Sparkles } from "lucide-react";
import { AppLayout } from "../components/layout/AppLayout";
import { GlassCard } from "../components/ui/GlassCard";
import { XPBar } from "../components/ui/XPBar";
import { useAuth } from "../lib/auth";

// NOTE: Phase 1 ships the dashboard shell with representative sample data.
// Once the Anime/Manga/Games/Trophy APIs land (Phase 2), swap these arrays
// for `api.get()` calls against /api/dashboard.
const RECENT_ANIME = [
  { title: "Frieren: Beyond Journey's End", progress: "Ep 18/28" },
  { title: "Solo Leveling S2", progress: "Ep 9/13" },
];
const RECENT_MANGA = [
  { title: "Chainsaw Man", progress: "Ch 172" },
  { title: "Kagurabachi", progress: "Ch 45" },
];
const RECENT_GAMES = [
  { title: "Elden Ring: Nightreign", progress: "62% complete" },
  { title: "Balatro", progress: "14h played" },
];
const UPCOMING = [
  { title: "Chainsaw Man Movie", date: "Sep 12" },
  { title: "Silksong", date: "TBA" },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <AppLayout title={`Welcome back, ${user?.username ?? "friend"}`}>
      <div className="grid lg:grid-cols-3 gap-5">
        {/* XP + level */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <span className="font-display font-semibold">Your Progress</span>
            <span className="eyebrow flex items-center gap-1.5">
              <Sparkles size={14} /> Daily login streak: 6 days
            </span>
          </div>
          <XPBar level={user?.level ?? 1} xp={user?.xp ?? 0} xpForNextLevel={((user?.level ?? 1) + 1) * 250} />
        </GlassCard>

        <GlassCard className="flex flex-col justify-center">
          <span className="eyebrow mb-1">Achievement Progress</span>
          <div className="font-display text-3xl font-bold text-violet-400">128 / 340</div>
          <p className="text-sm text-muted mt-1">Across all connected platforms</p>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <DashboardList icon={Clapperboard} title="Recently Watched" items={RECENT_ANIME} accent="text-violet-400" />
        <DashboardList icon={BookOpen} title="Recently Read" items={RECENT_MANGA} accent="text-cyan-300" />
        <DashboardList icon={Gamepad2} title="Recently Played" items={RECENT_GAMES} accent="text-violet-400" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={18} className="text-cyan-300" />
            <span className="font-display font-semibold">Upcoming Releases</span>
          </div>
          <ul className="flex flex-col gap-3">
            {UPCOMING.map((u) => (
              <li key={u.title} className="flex items-center justify-between text-sm">
                <span>{u.title}</span>
                <span className="font-mono text-xs text-muted">{u.date}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-violet-400" />
            <span className="font-display font-semibold">Recommended For You</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Isekai", "Roguelike", "Seinen", "Metroidvania", "Slice of Life"].map((tag) => (
              <span key={tag} className="rounded-full border border-edge bg-surface-2 px-3 py-1.5 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppLayout>
  );
}

function DashboardList({
  icon: Icon,
  title,
  items,
  accent,
}: {
  icon: typeof Clapperboard;
  title: string;
  items: { title: string; progress: string }[];
  accent: string;
}) {
  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className={accent} />
        <span className="font-display font-semibold">{title}</span>
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.title} className="flex items-center justify-between text-sm">
            <span className="truncate pr-2">{item.title}</span>
            <span className="font-mono text-xs text-muted shrink-0">{item.progress}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
