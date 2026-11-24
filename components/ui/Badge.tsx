import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "status" | "outline";
  dot?: boolean;
}

export function Badge({
  className = "",
  variant = "default",
  dot = false,
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

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-green)]"></span>
        </span>
      )}
      {children}
    </div>
  );
}
