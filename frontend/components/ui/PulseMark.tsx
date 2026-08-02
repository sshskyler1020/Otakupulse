interface PulseMarkProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const HEIGHTS: Record<string, number[]> = {
  sm: [6, 12, 18, 10, 14],
  md: [10, 20, 32, 16, 24],
  lg: [16, 32, 52, 26, 40],
};

const DELAYS = ["0s", "0.15s", "0.3s", "0.45s", "0.6s"];

// The "Pulse" in Otaku Pulse — a five-bar waveform that breathes like a
// heartbeat monitor. Used as the brand mark in the nav, and stretched
// full-width as a section divider elsewhere.
export function PulseMark({ size = "md", className = "" }: PulseMarkProps) {
  const heights = HEIGHTS[size];
  return (
    <div className={`pulse-bars ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <span key={i} style={{ height: `${h}px`, animationDelay: DELAYS[i] }} />
      ))}
    </div>
  );
}
