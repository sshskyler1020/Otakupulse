import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { api, ApiError } from "./api";

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  level: number;
  xp: number;
  isPremium: boolean;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = "otakupulse.session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restore session from localStorage on load, then verify with the API.
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setLoading(false);
      return;
    }
    try {
      const { token: savedToken } = JSON.parse(raw);
      api
        .get<User>("/api/auth/me", savedToken)
        .then((freshUser) => {
          setUser(freshUser);
          setToken(savedToken);
        })
        .catch(() => localStorage.removeItem(STORAGE_KEY))
        .finally(() => setLoading(false));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setLoading(false);
    }
  }, []);

  function persist(res: AuthResponse) {
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: res.token }));
  }

  async function login(email: string, password: string) {
    setError(null);
    try {
      const res = await api.post<AuthResponse>("/api/auth/login", { email, password });
      persist(res);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Try again.");
      throw e;
    }
  }

  async function register(username: string, email: string, password: string) {
    setError(null);
    try {
      const res = await api.post<AuthResponse>("/api/auth/register", { username, email, password });
      persist(res);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Try again.");
      throw e;
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const value = useMemo(
    () => ({ user, token, loading, error, login, register, logout, clearError: () => setError(null) }),
    [user, token, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
