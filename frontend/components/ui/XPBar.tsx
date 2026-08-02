interface XPBarProps {
  level: number;
  xp: number;
  xpForNextLevel: number;
}

export function XPBar({ level, xp, xpForNextLevel }: XPBarProps) {
  const pct = Math.min(100, Math.round((xp / xpForNextLevel) * 100));
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-display text-sm font-semibold">
          Level <span className="text-cyan-300">{level}</span>
        </span>
        <span className="font-mono text-xs text-muted">
          {xp.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-surface-2 border border-edge overflow-hidden">
        <div
          className="h-full rounded-full bg-pulse-gradient transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
