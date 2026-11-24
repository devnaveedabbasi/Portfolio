interface SectionPillProps {
  text: string;
}

export function SectionPill({ text }: SectionPillProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] shadow-sm">
      {text}
    </div>
  );
}
