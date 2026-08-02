import { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
}

const PADDING = { sm: "p-4", md: "p-6", lg: "p-8" };

export function GlassCard({ children, padding = "md", className = "", ...rest }: GlassCardProps) {
  return (
    <div className={`glass-card ${PADDING[padding]} ${className}`} {...rest}>
      {children}
    </div>
  );
}
