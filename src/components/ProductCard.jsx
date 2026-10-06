import { Link } from 'react-router-dom';
import { MediaFrame } from './MediaPlaceholder';
import IngredientTag from './IngredientTag';
import { accent } from '../lib/theme';

/**
 * ProductCard — a product under investigation, shown as physical evidence.
 */
export default function ProductCard({ product, index = 0, className = '' }) {
  const a = accent(product.shot?.color ?? 'ink');

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ink/12 bg-white
        shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      <div className="relative">
        <MediaFrame
          kind={product.shot?.kind ?? 'bottle'}
          color={product.shot?.color ?? 'ink'}
          title={product.name}
          refLabel={`EVIDENCE ${String(index + 1).padStart(2, '0')}`}
          ratio="aspect-[16/10]"
          frame="flush"
        />
        <span
          className={`absolute bottom-3 left-3 rounded-full border-2 border-ink px-2.5 py-1 font-mono text-[10px] font-semibold ${a.bg} text-ink`}
        >
          {product.price}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="label-mono text-ink/45">{product.category}</p>
        <h3 className="mt-2 font-display text-xl font-bold leading-tight text-ink">{product.name}</h3>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45">
          {product.brand} · {product.size}
        </p>

        <p className="mt-4 text-[14.5px] leading-relaxed text-ink/75">{product.info}</p>

        {product.note ? (
          <p className="mt-4 border-l-2 border-ink/20 pl-3 text-[13px] italic leading-relaxed text-ink/60">
            {product.note}
          </p>
        ) : null}

        {product.ingredients?.length ? (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {product.ingredients.map((slug) => (
              <IngredientTag key={slug} slug={slug} size="sm" />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

/** Slimmer row version used inside the case file evidence grid. */
export function ProductRow({ product, index = 0 }) {
  return (
    <Link
      to="#evidence-01"
      className="group flex items-center gap-4 rounded-2xl border-2 border-ink/12 bg-white p-3 transition-all duration-300 hover:border-ink/30 hover:shadow-card"
    >
      <MediaFrame
        kind={product.shot?.kind ?? 'bottle'}
        color={product.shot?.color ?? 'ink'}
        title={product.name}
        ratio="aspect-square"
        frame="plain"
        className="w-16 shrink-0 rounded-xl border-2 border-ink/12"
      />
      <span className="min-w-0 flex-1">
        <span className="label-mono block text-ink/40">
          EVIDENCE {String(index + 1).padStart(2, '0')} · {product.price}
        </span>
        <span className="mt-0.5 block truncate font-display text-[15px] font-bold text-ink">
          {product.name}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="font-mono text-ink/30 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink"
      >
        →
      </span>
    </Link>
  );
}