import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import IngredientCard from '../components/IngredientCard';
import CTA from '../components/CTA';
import PlaceholderNotice from '../components/PlaceholderNotice';
import { DotMark, PlusMark, Squiggle } from '../components/Doodles';
import { INGREDIENT_CATEGORIES, ingredients } from '../data/ingredients';
import { INGREDIENT_CATEGORY_ACCENT } from '../lib/theme';
import { useDebounced } from '../lib/hooks';

/** Matches name, aka, category, tags and description copy. */
function matches(ingredient, query) {
  if (!query) return true;
  const q = query.toLowerCase().trim();
  const haystack = [
    ingredient.name,
    ingredient.aka,
    ingredient.akaSub,
    ingredient.category,
    ...ingredient.tags,
    ...(ingredient.alsoMentioned ?? []),
    ingredient.whatIsIt,
    ingredient.usedFor,
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}

export default function Ingredients() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('ALL');
  const debounced = useDebounced(query);

  const counts = useMemo(() => {
    const map = { ALL: ingredients.length };
    INGREDIENT_CATEGORIES.forEach((cat) => {
      const n = ingredients.filter((i) => i.category === cat).length;
      if (n) map[cat] = n;
    });
    return map;
  }, []);

  const results = useMemo(() => {
    return ingredients
      .filter((i) => matches(i, debounced))
      .filter((i) => filter === 'ALL' || i.category === filter)
      .sort((a, b) => a.id.localeCompare(b.id));
  }, [debounced, filter]);

  const searching = Boolean(debounced.trim());

  return (
    <>
      {/* ---------------- Header ---------------- */}
      <section className="relative overflow-hidden pb-12 pt-12 sm:pb-14 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 grid-lab-soft opacity-70 [mask-image:radial-gradient(ellipse_75%_75%_at_50%_0%,#000_20%,transparent_78%)]" />
          <span className="absolute left-6 top-14 text-ink/12">
            <DotMark className="h-4 w-12" />
          </span>
          <span className="absolute right-10 top-24 text-ink/12">
            <PlusMark className="h-9 w-9" />
          </span>
        </div>

        <div className="section">
          <Reveal>
            <p className="label-mono flex items-center gap-2 text-ink/50">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-cyan ring-4 ring-cyan/30" />
              Ingredient database · {String(ingredients.length).padStart(2, '0')} entries
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,8.2vw,5.4rem)] font-extrabold leading-[0.9] tracking-[-0.035em] text-ink">
              The ingredient database
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="mt-6 max-w-prose2 text-[17px] leading-relaxed text-ink/70 sm:text-[19px]">
              You&rsquo;ve seen the name. Now find out what it actually does.
            </p>
          </Reveal>

          <Reveal delay={190} className="mt-10">
            <SearchBar
              value={query}
              onChange={setQuery}
              resultCount={results.length}
              className="max-w-3xl"
            />
          </Reveal>

          <Reveal delay={240} className="mt-9">
            <CategoryFilter
              options={INGREDIENT_CATEGORIES}
              value={filter}
              onChange={setFilter}
              counts={counts}
              accentMap={INGREDIENT_CATEGORY_ACCENT}
              label="Filter by function"
            />
          </Reveal>

          <Reveal delay={290} className="mt-8">
            <PlaceholderNotice />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Results ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-14 sm:py-20">
        <div className="section">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="label-mono text-ink/40">
              {searching ? (
                <>
                  Search results for{' '}
                  <span className="text-ink">&ldquo;{debounced.trim()}&rdquo;</span>
                </>
              ) : filter !== 'ALL' ? (
                <>
                  Showing <span className="text-ink">{filter}</span>
                </>
              ) : (
                'All entries, sorted by reference'
              )}
            </p>
            <p className="label-mono text-ink/40">
              {String(results.length).padStart(2, '0')} / {String(ingredients.length).padStart(2, '0')}
            </p>
          </div>

          {results.length ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((ing, i) => (
                <Reveal key={ing.slug} delay={Math.min(i, 7) * 55}>
                  <IngredientCard ingredient={ing} index={i} expandable />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border-2 border-dashed border-ink/25 bg-white/60 p-12 text-center">
              <span aria-hidden="true" className="mx-auto block h-10 w-56 text-ink/25">
                <Squiggle />
              </span>
              <p className="mt-5 font-display text-xl font-bold text-ink">Nothing under that name yet</p>
              <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-ink/60">
                {searching
                  ? 'Nothing in the database matches that search. Try the common name instead of the INCI name — or send it to the lab and it gets investigated next.'
                  : 'No ingredients logged in this category yet.'}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {searching ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setFilter('ALL');
                    }}
                    className="btn-secondary"
                  >
                    Clear search
                  </button>
                ) : null}
                <Link to="/submit" className="btn-primary">
                  Submit it to the lab
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- Category legend ---------------- */}
      <section className="rule border-t-2 border-ink/12 py-14 sm:py-20">
        <div className="section">
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink">
              What the categories mean
            </h2>
            <p className="mt-3 max-w-prose2 text-[15.5px] leading-relaxed text-ink/65">
              One ingredient can sit in more than one shelf in a real shop. These categories are
              about the job an ingredient is usually doing in a formula — not a judgement about it.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INGREDIENT_CATEGORIES.map((cat, i) => {
              const n = ingredients.filter((ing) => ing.category === cat).length;
              const accentCls = {
                cyan: 'bg-cyan',
                lime: 'bg-lime',
                butter: 'bg-butter',
                coral: 'bg-coral',
                lavender: 'bg-lavender',
              }[INGREDIENT_CATEGORY_ACCENT[cat]];
              return (
                <Reveal key={cat} delay={i * 45}>
                  <button
                    type="button"
                    onClick={() => {
                      setFilter(cat);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl border-2 border-ink/12 bg-white px-4 py-3.5 text-left
                      transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-card"
                  >
                    <span className={`h-8 w-1.5 shrink-0 rounded-full ${accentCls}`} aria-hidden="true" />
                    <span className="min-w-0 flex-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink">
                      {cat}
                    </span>
                    <span className="label-mono shrink-0 text-ink/40">{n}</span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Missing an ingredient?"
        title="Add it to the database"
        body="Found a name you cannot decode? Send it in and it becomes the next ingredient file — and probably the next case."
        primary={{ to: '/submit', label: 'Submit a case' }}
        secondary={{ to: '/case-files', label: 'See the case files' }}
        tone="cyan"
      />
    </>
  );
}