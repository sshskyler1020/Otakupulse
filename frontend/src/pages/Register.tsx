import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/ui/Logo";
import { useAuth } from "../lib/auth";

export default function Register() {
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(username, email, password);
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
          <h1 className="font-display text-2xl font-bold mb-1">Create your account</h1>
          <p className="text-sm text-muted mb-6">Start tracking in under a minute.</p>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted">Username</span>
              <input
                type="text"
                required
                minLength={3}
                maxLength={24}
                pattern="[a-zA-Z0-9_]+"
                title="Letters, numbers, and underscores only"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  clearError();
                }}
                className="rounded-xl border border-edge bg-surface-2 px-3.5 py-2.5 text-sm outline-none focus:border-violet-500/60"
                placeholder="senpai_42"
              />
            </label>
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
                placeholder="At least 8 characters"
              />
            </label>
            <button type="submit" disabled={submitting} className="btn-primary mt-2 disabled:opacity-60">
              {submitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-300 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
