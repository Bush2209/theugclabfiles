import { accent } from '../lib/theme';

/**
 * CategoryFilter — pill row for case and ingredient categories.
 * Scrolls horizontally on mobile; wraps from `sm` upwards.
 */
export default function CategoryFilter({
  options,
  value,
  onChange,
  accentMap = {},
  counts = {},
  label = 'Filter by category',
  allLabel = 'ALL',
  className = '',
}) {
  return (
    <div className={className}>
      <p className="label-mono mb-3 text-ink/45">{label}</p>

      <div
        role="group"
        aria-label={label}
        className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
      >
        {[{ key: 'ALL', label: allLabel }, ...options.map((o) => (typeof o === 'string' ? { key: o, label: o } : o))].map(
          (opt) => {
            const active = value === opt.key;
            const a = accent(accentMap[opt.key] ?? (opt.key === 'ALL' ? 'ink' : 'lime'));
            const count = counts[opt.key];

            return (
              <button
                key={opt.key}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(opt.key)}
                className={`shrink-0 snap-start rounded-full border-2 px-4 py-2 font-mono text-[10px] font-semibold
                  uppercase tracking-[0.13em] transition-all duration-300 sm:px-5 sm:text-[11px]
                  ${
                    active
                      ? `${a.bg} border-ink text-ink shadow-card`
                      : 'border-ink/15 bg-white text-ink/60 hover:border-ink/40 hover:text-ink'
                  }`}
              >
                {opt.label}
                {count !== undefined ? (
                  <span className={`ml-2 text-[9px] ${active ? 'text-ink/55' : 'text-ink/35'}`}>{count}</span>
                ) : null}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}