import { useEffect, useRef, useState } from 'react';

/**
 * SearchBar — the ingredient database search field.
 * Keeps its own local query state so typing stays instant, and calls
 * `onChange` with the raw value (debounce if you need it).
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = '🔍 Search an ingredient...',
  resultCount = null,
  className = '',
  id = 'ingredient-search',
}) {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  // "/" focuses the field — a small shortcut people expect in a database.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey) return;
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="label-mono mb-3 flex items-center justify-between text-ink/50">
        <span>Search the database</span>
        <span className="hidden normal-case tracking-normal sm:inline">
          Press <kbd className="rounded border border-ink/20 bg-white px-1.5 py-0.5 font-mono text-[10px]">/</kbd> to jump here
        </span>
      </label>

      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[18px]"
        >
          🔍
        </span>

        <input
          ref={inputRef}
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full rounded-2xl border-2 bg-white py-5 pl-14 pr-28 font-sans text-base text-ink
            transition-all duration-300 placeholder:text-ink/35 sm:py-6 sm:pr-36 sm:text-lg
            ${focused ? 'border-ink shadow-lift' : 'border-ink/15 hover:border-ink/30'}`}
        />

        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {resultCount !== null ? (
            <span className="label-mono hidden text-ink/45 sm:inline">
              {resultCount} {resultCount === 1 ? 'result' : 'results'}
            </span>
          ) : null}
          {value ? (
            <button
              type="button"
              onClick={() => onChange('')}
              aria-label="Clear search"
              className="grid h-8 w-8 place-items-center rounded-full border-2 border-ink/15 text-ink/50 transition-colors hover:border-ink hover:bg-butter hover:text-ink"
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}