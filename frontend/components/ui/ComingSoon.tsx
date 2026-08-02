import { PulseMark } from "./PulseMark";

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="glass-card p-10 flex flex-col items-center text-center gap-4 max-w-xl mx-auto mt-10">
      <PulseMark size="md" />
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <p className="text-muted">{description}</p>
      <span className="eyebrow">Landing in Phase 2</span>
    </div>
  );
}
