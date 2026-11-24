import { Badge } from "./Badge";

interface SectionHeaderProps {
  pillText: string;
  title: string | React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  pillText,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignStyles = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignStyles} ${className}`}>
      <Badge variant="default">{pillText}</Badge>

      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl leading-[1.15]">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
