import { Link } from 'react-router-dom';
import { ingredientBySlug } from '../data/ingredients';

/**
 * IngredientTag — a small chip that links an ingredient to its database page.
 * Pass `slug` for a link, `name` for a non-navigating chip.
 */
export default function IngredientTag({ slug, name, tone = 'default', size = 'md', className = '' }) {
  const ingredient = slug ? ingredientBySlug[slug] : null;
  const label = ingredient ? ingredient.name : name ?? slug ?? '';
  const isLink = Boolean(ingredient);

  const tones = {
    default: 'bg-white text-ink border-ink/20 hover:border-ink hover:bg-butter',
    active: 'bg-ink text-ivory border-ink',
    soft: 'bg-cyan/25 text-ink border-cyan/60',
    muted: 'bg-transparent text-ink/55 border-ink/15',
  };

  const sizing =
    size === 'sm' ? 'px-2 py-0.5 text-[9px]' : size === 'lg' ? 'px-3.5 py-2 text-[11px]' : 'px-2.5 py-1 text-[10px]';

  const cls = `inline-flex items-center gap-1.5 rounded-full border font-mono font-medium uppercase tracking-[0.12em] transition-all duration-200 ${tones[tone]} ${sizing} ${className}`;

  if (!isLink) {
    return <span className={cls}>{label}</span>;
  }

  return (
    <Link
      to={`/ingredients/${slug}`}
      className={`${cls} hover:-translate-y-0.5 hover:shadow-card`}
      title={ingredient.aka}
    >
      {label}
      <span aria-hidden="true" className="text-ink/40">
        ↗
      </span>
    </Link>
  );
}