import { VERDICT_META, INGREDIENT_VERDICT_META, accent } from '../lib/theme';

/**
 * VerdictBadge — used at the end of a case file and on ingredient profiles.
 * Falls back to the ingredient verdict palette if the label is an
 * ingredient-level verdict.
 */
export default function VerdictBadge({ label, size = 'md', className = '' }) {
  const meta = VERDICT_META[label] ?? INGREDIENT_VERDICT_META[label] ?? { accent: 'ink', icon: '●' };
  const a = accent(meta.accent);
  const sizing = size === 'lg' ? 'px-5 py-2.5 text-xs' : 'px-3.5 py-1.5 text-[10px]';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 border-ink ${a.bg} ${sizing} font-mono font-semibold uppercase tracking-label text-ink ${className}`}
    >
      <span className="text-[10px] leading-none">{meta.icon}</span>
      {label}
    </span>
  );
}