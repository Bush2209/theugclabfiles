import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { accent, CASE_CATEGORY_ACCENT } from '../lib/theme';
import { Squiggle, Tape } from './Doodles';

/**
 * CaseCard — a physical-feeling case folder in a modern grid.
 * Used on the homepage, the archive and at the bottom of ingredient pages.
 */
/**
 * `as` sets the heading level so the card fits the surrounding outline:
 * h2 when the grid is a top-level section under the page h1, h3 when the
 * grid sits inside another h2 section.
 */
export default function CaseCard({ case: data, variant = 'default', as: Heading = 'h2', className = '' }) {
  const a = accent(data.accent ?? CASE_CATEGORY_ACCENT[data.category]);

  if (variant === 'compact') {
    return (
      <Link
        to={`/case-files/${data.slug}`}
        className={`group relative flex items-center gap-4 rounded-2xl border-2 border-ink/12 bg-white p-4
          transition-all duration-400 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-card ${className}`}
      >
        <span
          className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-ink ${a.bg}`}
        >
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/60">
            CASE
          </span>
          <span className="font-display text-lg font-bold leading-none text-ink">{data.number}</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="label-mono block text-ink/45">{data.category}</span>
          <span className="mt-1 block font-display text-[15px] font-bold leading-tight text-ink">
            {data.title}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-lg text-ink/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink"
        >
          →
        </span>
      </Link>
    );
  }

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ink/12 bg-white
        shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-lift ${className}`}
    >
      {/* coloured evidence band */}
      <div className={`relative h-2 w-full ${a.bg}`} aria-hidden="true" />
      <Tape color={a.bg} />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <header className="flex items-start justify-between gap-3">
          <div>
            <p className="label-mono text-ink/45">CASE #{data.number}</p>
            <p className="label-mono mt-1 text-ink/70">{data.category}</p>
          </div>
          <StatusBadge status={data.status} size="sm" />
        </header>

        <Heading className="mt-5 font-display text-[22px] font-bold leading-[1.08] text-ink sm:text-[25px]">
          <Link to={`/case-files/${data.slug}`} className="after:absolute after:inset-0">
            {data.title}
          </Link>
        </Heading>

        <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
          <span className="font-semibold text-ink">Question:</span> {data.question}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {data.tags?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/55"
            >
              {t}
            </span>
          ))}
        </div>

        <footer className="mt-auto flex items-end justify-between gap-4 pt-7">
          <Link
            to={`/case-files/${data.slug}`}
            className="relative z-10 inline-flex items-center gap-2 border-b-2 border-ink pb-0.5
              font-mono text-[11px] font-semibold uppercase tracking-label text-ink transition-colors hover:text-ink/60"
          >
            Open case
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <span className="label-mono text-ink/35">{data.date}</span>
        </footer>
      </div>

      {/* squiggle flourish that appears on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 left-6 h-3 w-20 text-lime opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      >
        <Squiggle />
      </span>
    </article>
  );
}