import { Link } from "react-router-dom";
import { PulseMark } from "./PulseMark";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <PulseMark size="sm" />
      <span className="font-display text-lg font-bold tracking-tight">
        Otaku<span className="text-violet-400">Pulse</span>
      </span>
    </Link>
  );
}
