import { STATUS_META, accent } from '../lib/theme';

/**
 * StatusBadge — the little state pill on every case file.
 * Colour + icon come from STATUS_META so data only stores a plain string.
 */
export default function StatusBadge({
  status,
  size = 'md',
  showIcon = true,
  meaning = false,
  className = '',
}) {
  const meta = STATUS_META[status] ?? { accent: 'ink', icon: '●' };
  const a = accent(meta.accent);
  const sizing =
    size === 'sm' ? 'px-2.5 py-1 text-[9px]' : size === 'lg' ? 'px-4 py-2 text-[11px]' : 'px-3 py-1.5 text-[10px]';

  return (
    <span className={`inline-flex flex-col items-start gap-1 ${className}`}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border-2 border-ink ${a.bg} ${sizing} font-mono font-semibold uppercase tracking-[0.14em] text-ink`}
      >
        {showIcon ? <span className="text-[9px] leading-none">{meta.icon}</span> : null}
        {status}
      </span>
      {meaning ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">
          {meta.meaning}
        </span>
      ) : null}
    </span>
  );
}