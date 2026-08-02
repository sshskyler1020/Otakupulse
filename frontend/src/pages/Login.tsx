import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/ui/Logo";
import { useAuth } from "../lib/auth";

export default function Login() {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      // error already surfaced via context
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative">
      <div className="absolute inset-0 bg-void-radial pointer-events-none" />
      <div className="w-full max-w-sm relative">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="glass-card p-8">
          <h1 className="font-display text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-sm text-muted mb-6">Log in to pick up where you left off.</p>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError();
                }}
                className="rounded-xl border border-edge bg-surface-2 px-3.5 py-2.5 text-sm outline-none focus:border-violet-500/60"
                placeholder="you@example.com"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted">Password</span>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
                className="rounded-xl border border-edge bg-surface-2 px-3.5 py-2.5 text-sm outline-none focus:border-violet-500/60"
                placeholder="••••••••"
              />
            </label>
            <button type="submit" disabled={submitting} className="btn-primary mt-2 disabled:opacity-60">
              {submitting ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            New here?{" "}
            <Link to="/register" className="text-cyan-300 hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          Google, Discord, Steam & Xbox login are on the roadmap.
        </p>
      </div>
    </div>
  );
}
