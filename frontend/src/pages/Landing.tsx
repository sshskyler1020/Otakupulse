import { Link } from "react-router-dom";
import {
  Clapperboard,
  BookOpen,
  Gamepad2,
  Trophy,
  Users,
  CalendarDays,
  Check,
} from "lucide-react";
import { Logo } from "../components/ui/Logo";
import { PulseMark } from "../components/ui/PulseMark";
import { XPBar } from "../components/ui/XPBar";

const FEATURES = [
  {
    icon: Clapperboard,
    title: "Anime, tracked properly",
    body: "Log every episode, rate every season, and let your seasonal calendar fill itself in.",
  },
  {
    icon: BookOpen,
    title: "Manga, chapter by chapter",
    body: "Pick up exactly where you left off across every series you're reading.",
  },
  {
    icon: Gamepad2,
    title: "One library for every platform",
    body: "PlayStation, Xbox, Steam, Epic, GOG — your whole backlog, finally in one place.",
  },
  {
    icon: Trophy,
    title: "Trophies and achievements, unified",
    body: "Stop checking four different apps. See your full completion history in one feed.",
  },
  {
    icon: CalendarDays,
    title: "Never miss a release",
    body: "A single calendar for episodes, chapters, game launches, and community events.",
  },
  {
    icon: Users,
    title: "Built for a community",
    body: "Clubs, forums, fan art, and a friends list that actually shows what people are into.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-edge bg-void/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-muted">
            <a href="#features" className="hover:text-paper transition-colors">Features</a>
            <a href="#pricing" className="hover:text-paper transition-colors">Pricing</a>
            <a href="#community" className="hover:text-paper transition-colors">Community</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-muted hover:text-paper transition-colors">
              Log in
            </Link>
            <Link to="/register" className="btn-primary !px-4 !py-2 text-sm">
              Create Account
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-void-radial pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-14 items-center relative">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <PulseMark size="md" />
              <span className="eyebrow">One feed for everything you love</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-[1.05] mb-6">
              Every episode.<br />
              Every chapter.<br />
              <span className="bg-pulse-gradient bg-clip-text text-transparent">Every trophy.</span>
            </h1>
            <p className="text-lg text-muted max-w-md mb-8">
              Otaku Pulse pulls your anime, manga, and games into one living profile —
              so your progress finally has a heartbeat.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary">Create Account</Link>
              <Link to="/anime" className="btn-secondary">Explore Anime</Link>
              <Link to="/games" className="btn-secondary">Track Games</Link>
            </div>
          </div>

          {/* Mock dashboard preview */}
          <div className="relative animate-float">
            <div className="glass-card p-6 shadow-glow">
              <div className="flex items-center justify-between mb-5">
                <span className="font-display font-semibold">Your Pulse</span>
                <span className="eyebrow">Live Preview</span>
              </div>
              <XPBar level={34} xp={7420} xpForNextLevel={9000} />
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { label: "Watching", value: "12" },
                  { label: "Reading", value: "7" },
                  { label: "Playing", value: "5" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-edge bg-surface-2 p-3 text-center">
                    <div className="font-display text-2xl font-bold text-cyan-300">{s.value}</div>
                    <div className="text-xs text-muted mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-edge bg-surface-2 p-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Rare Unlock</span>
                  <span className="text-violet-400 font-mono text-xs">2.1% of players</span>
                </div>
                <div className="text-sm text-muted">"Platinum Complete" — Elden Ring</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Feature showcase */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 max-w-xl">
          <span className="eyebrow">What you get</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Five apps' worth of tracking, one profile.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass-card p-6">
              <div className="h-11 w-11 rounded-xl bg-pulse-gradient flex items-center justify-center mb-4">
                <Icon size={20} className="text-void" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section id="community" className="max-w-7xl mx-auto px-6 py-20">
        <div className="glass-card p-10 lg:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow">Community</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Fans first. Always.
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Join clubs built around the shows and games you're already obsessed with.
              Share fan art, compare trophy shelves with friends, and argue about
              seasonal rankings in a forum that's actually built for it.
            </p>
            <Link to="/register" className="btn-primary">Join the Community</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Active Clubs", value: "1,240+" },
              { label: "Tracked Titles", value: "48,000+" },
              { label: "Trophies Logged", value: "2.3M" },
              { label: "Community Posts", value: "310K" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-edge bg-surface-2 p-5 text-center">
                <div className="font-display text-2xl font-bold text-violet-400">{s.value}</div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="eyebrow">Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">Free forever. Premium when you want it.</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="glass-card p-8">
            <h3 className="font-display text-xl font-bold mb-1">Free</h3>
            <p className="text-muted text-sm mb-6">Everything you need to start tracking.</p>
            <div className="font-display text-4xl font-bold mb-6">$0</div>
            <ul className="space-y-3 mb-8 text-sm">
              {["Full anime, manga & game tracking", "Community & forum access", "Basic profile customization"].map(
                (f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={16} className="text-cyan-400 mt-0.5 shrink-0" /> {f}
                  </li>
                )
              )}
            </ul>
            <Link to="/register" className="btn-secondary w-full">Create Free Account</Link>
          </div>

          <div className="glass-card p-8 border-violet-500/60 shadow-glow relative">
            <span className="absolute -top-3 right-6 bg-pulse-gradient text-void text-xs font-bold px-3 py-1 rounded-full">
              Most Popular
            </span>
            <h3 className="font-display text-xl font-bold mb-1">Premium</h3>
            <p className="text-muted text-sm mb-6">For fans who want the full HUD.</p>
            <div className="font-display text-4xl font-bold mb-6">
              $4.99<span className="text-base font-normal text-muted">/mo</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm">
              {[
                "Ad-free experience",
                "Premium profile themes & badges",
                "Increased screenshot & clip uploads",
                "Exclusive community features",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={16} className="text-violet-400 mt-0.5 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link to="/register" className="btn-primary w-full">Go Premium</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="glass-card p-12 text-center bg-void-radial">
          <PulseMark size="lg" className="justify-center mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Give your backlog a pulse.</h2>
          <p className="text-muted max-w-md mx-auto mb-8">
            It takes thirty seconds to start tracking. Your first trophy is one search away.
          </p>
          <Link to="/register" className="btn-primary">Create Account</Link>
        </div>
      </section>

      <footer className="border-t border-edge py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-xs text-muted">© {new Date().getFullYear()} Otaku Pulse. Not affiliated with any studio, publisher, or platform holder.</p>
        </div>
      </footer>
    </div>
  );
}
