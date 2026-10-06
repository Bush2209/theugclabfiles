import { Link } from 'react-router-dom';
import VerdictBadge from './VerdictBadge';
import { accent } from '../lib/theme';

/**
 * IngredientCard — one entry in the ingredient database.
 * `expandable` turns the card into a details/summary disclosure so a
 * short explanation is available without leaving the search results.
 */
/**
 * `as` sets the heading level so the card fits the surrounding outline:
 * h2 when the grid is a top-level section under the page h1, h3 when the
 * grid sits inside another h2 section.
 */
export default function IngredientCard({ ingredient, index = 0, expandable = false, as: Heading = 'h2' }) {
  const a = accent(ingredient.color ?? 'cyan');

  return (
    <article
      className="group relative flex h-full flex-col rounded-3xl border-2 border-ink/12 bg-white
        shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-lift"
    >
      {/* top rule in the ingredient's accent */}
      <div className={`h-2 w-full rounded-t-3xl ${a.bg}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="label-mono text-ink/45">{ingredient.id}</p>
            <p className="label-mono mt-1 text-ink/70">{ingredient.category}</p>
          </div>
          <span
            aria-hidden="true"
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 border-ink ${a.bg} font-mono text-[11px] font-bold text-ink`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </header>

        <Heading className="mt-5 font-display text-[24px] font-bold leading-[1.06] text-ink sm:text-[26px]">
          <Link to={`/ingredients/${ingredient.slug}`} className="after:absolute after:inset-0">
            {ingredient.name}
          </Link>
        </Heading>
        <p className="mt-2 font-sans text-[14px] font-semibold text-ink/60">{ingredient.aka}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {ingredient.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border-2 border-ink/15 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-ink/60"
            >
              {t}
            </span>
          ))}
        </div>

        {expandable ? (
          <details className="group/details mt-5">
            <summary className="label-mono flex cursor-pointer list-none items-center gap-2 text-ink/60 transition-colors hover:text-ink">
              <span className="inline-block transition-transform duration-300 group-open/details:rotate-90">
                ›
              </span>
              Quick read
            </summary>
            <div className="mt-3 space-y-3 border-l-2 border-ink/12 pl-4">
              <p className="text-[14px] leading-relaxed text-ink/75">{ingredient.whatIsIt}</p>
              <VerdictBadge label={ingredient.verdict.label} size="sm" />
            </div>
          </details>
        ) : (
          <p className="mt-5 line-clamp-3 text-[14.5px] leading-relaxed text-ink/70">
            {ingredient.whatIsIt}
          </p>
        )}

        <footer className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Link
            to={`/ingredients/${ingredient.slug}`}
            className="relative z-10 inline-flex items-center gap-2 border-b-2 border-ink pb-0.5
              font-mono text-[11px] font-semibold uppercase tracking-label text-ink transition-colors hover:text-ink/60"
          >
            Investigate
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <VerdictBadge label={ingredient.verdict.label} size="sm" />
        </footer>
      </div>
    </article>
  );
}