import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../../lib/auth";
import { PulseMark } from "../ui/PulseMark";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PulseMark size="lg" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
