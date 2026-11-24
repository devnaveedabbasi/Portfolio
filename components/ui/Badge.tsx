import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "status" | "outline";
  dot?: boolean;
  dotColor?: "black" | "green" | "primary";
}

export function Badge({
  className = "",
  variant = "default",
  dot = false,
  dotColor = "black",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider transition-colors";

  const variantStyles = {
    default:
      "bg-[var(--accent-badge-bg)] text-[var(--accent-badge-text)] border border-[var(--accent-badge-border)] shadow-sm",
    status:
      "bg-[var(--accent-badge-bg)] text-[var(--accent-badge-text)] border border-[var(--accent-badge-border)] shadow-sm font-semibold normal-case text-xs",
    outline:
      "bg-transparent text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--text-primary)]",
  };

  const isGreen = dotColor === "green";

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {dot && (
        <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-30 animate-ping",
              isGreen ? "bg-[var(--accent-green)]" : "bg-[var(--text-primary)]"
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-2 w-2 rounded-full",
              isGreen ? "bg-[var(--accent-green)]" : "bg-[var(--text-primary)]"
            )}
          />
        </span>
      )}
      {children}
    </div>
  );
}
