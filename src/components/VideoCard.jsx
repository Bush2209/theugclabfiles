import { accent } from '../lib/theme';

/**
 * VideoCard — portfolio tile. Clicking opens the lightbox.
 * `aspect` lets the grid mix portrait reels with landscape stills.
 */
export default function VideoCard({ item, onOpen, className = '' }) {
  const a = accent(item.accent ?? 'lime');
  const isVideo = item.type === 'video';
  const ratio = item.type === 'video' ? 'aspect-[4/5]' : 'aspect-square';

  return (
    <article className={`group relative ${className}`}>
      <button
        type="button"
        onClick={() => onOpen?.(item)}
        aria-label={`Open ${item.title}`}
        className="block w-full text-left"
      >
        <div className="relative overflow-hidden rounded-3xl border-2 border-ink/12 bg-white shadow-card transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-ink/25 group-hover:shadow-lift">
          <div className={`relative w-full overflow-hidden ${ratio}`}>
            {item.src ? (
              <img src={item.src} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <span className="block h-full w-full">
                <PlaceholderPoster shape={item.shape} fallbackKind={item.poster?.kind} />
              </span>
            )}

            {/* tint wash */}
            <span
              aria-hidden="true"
              className={`absolute inset-0 ${a.wash} mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0`}
            />

            {/* play control */}
            {isVideo ? (
              <span
                className="absolute inset-0 grid place-items-center"
                aria-hidden="true"
              >
                <span
                  className="grid h-16 w-16 place-items-center rounded-full border-2 border-ink bg-white
                    shadow-lift transition-all duration-400 group-hover:scale-110 group-hover:bg-lime"
                >
                  <span className="ml-1 block w-0 h-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-ink" />
                </span>
              </span>
            ) : null}

            {/* duration */}
            {item.duration ? (
              <span className="label-mono absolute right-3 top-3 rounded-full border-2 border-ink bg-white px-2.5 py-1 text-ink">
                {item.duration}
              </span>
            ) : null}

            <span className="label-mono absolute left-3 top-3 rounded-full border-2 border-ink bg-white px-2.5 py-1 text-ink/75">
              {item.ref}
            </span>
          </div>

          <div className="border-t-2 border-ink/10 p-5">
            <p className="label-mono text-ink/45">{item.category}</p>
            <h3 className="mt-2 font-display text-[17px] font-bold leading-tight text-ink">{item.title}</h3>
            <div className="mt-4 flex items-center justify-between gap-3 font-mono text-[9.5px] uppercase tracking-[0.13em] text-ink/50">
              <span>{item.platform}</span>
              <span>{item.views}</span>
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}

/**
 * Drawn stand-in for a video poster or a product photograph.
 * Rather than grey skeleton bars, this sketches the scene itself — a phone
 * frame with a vertical reel, or a shelf of products — so the grid still
 * communicates what belongs there once real media is dropped in.
 */
function PlaceholderPoster({ shape, fallbackKind }) {
  const kind = shape ?? (fallbackKind === 'photo' ? 'shelf' : 'reel');

  if (kind === 'label') {
    return (
      <span className="relative block h-full w-full bg-white">
        <span className="absolute inset-0 grid-lab-soft" aria-hidden="true" />
        {/* back-of-bottle label close-up */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <rect x="38" y="22" width="124" height="156" rx="10" fill="#fff" stroke="#20231F" strokeWidth="2.6" />
          <path d="M38 46h124" stroke="#20231F" strokeWidth="2.2" opacity="0.35" />
          <path
            d="M54 66h92M54 80h78M54 94h92M54 108h64M54 122h84"
            stroke="#20231F"
            strokeWidth="3.4"
            strokeLinecap="round"
            opacity="0.32"
          />
          <rect x="54" y="140" width="42" height="20" rx="10" fill="#B8F34A" stroke="#20231F" strokeWidth="2.2" />
          <path d="M112 150h40" stroke="#20231F" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
        </svg>
        <span className="label-mono absolute bottom-5 right-5 rounded-full bg-ink/85 px-2.5 py-1 text-ivory">
          Placeholder photo
        </span>
      </span>
    );
  }

  if (kind === 'shelf') {
    return (
      <span className="relative block h-full w-full bg-white">
        <span className="absolute inset-0 grid-lab-soft" aria-hidden="true" />
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M14 128h172" stroke="#20231F" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
          <g stroke="#20231F" strokeWidth="2.4" strokeLinejoin="round">
            <rect x="30" y="58" width="28" height="70" rx="4" fill="#fff" fillOpacity="0.6" />
            <rect x="35" y="46" width="18" height="14" rx="3" fill="#fff" />
            <path d="M72 50h32v78H72z" fill="#fff" fillOpacity="0.32" />
            <rect x="77" y="36" width="22" height="16" rx="4" fill="#fff" />
            <rect x="118" y="62" width="34" height="66" rx="6" fill="#fff" fillOpacity="0.6" />
            <path d="M135 48h18v16h-18z" fill="#fff" />
            <rect x="164" y="70" width="22" height="58" rx="4" fill="#fff" fillOpacity="0.45" />
          </g>
          <path d="M18 128h164l-12 56H30z" fill="#20231F" opacity="0.06" />
          <circle cx="166" cy="40" r="14" fill="none" stroke="#20231F" strokeWidth="2.4" />
          <path d="M177 51l9 9" stroke="#20231F" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span className="label-mono absolute bottom-5 right-5 rounded-full bg-ink/85 px-2.5 py-1 text-ivory">
          Placeholder photo
        </span>
      </span>
    );
  }

  return (
    <span className="relative block h-full w-full bg-white">
      <span className="absolute inset-0 grid-lab-soft" aria-hidden="true" />
      {/* phone frame with a vertical reel inside */}
      <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect
          x="66"
          y="26"
          width="68"
          height="126"
          rx="10"
          fill="#fff"
          stroke="#20231F"
          strokeWidth="2.6"
        />
        <rect x="72" y="40" width="56" height="98" rx="4" fill="#20231F" opacity="0.08" />
        <circle cx="100" cy="146" r="5" fill="none" stroke="#20231F" strokeWidth="2" opacity="0.5" />
        <path d="M88 70h24M88 82h16" stroke="#20231F" strokeWidth="3" strokeLinecap="round" opacity="0.22" />
        <rect x="34" y="164" width="46" height="58" rx="7" fill="#fff" stroke="#20231F" strokeWidth="2.4" />
        <rect x="120" y="176" width="46" height="46" rx="7" fill="#fff" stroke="#20231F" strokeWidth="2.4" />
        <path d="M44 178h26M44 186h16" stroke="#20231F" strokeWidth="3" strokeLinecap="round" opacity="0.2" />
        <path d="M130 190h26M130 198h14" stroke="#20231F" strokeWidth="3" strokeLinecap="round" opacity="0.2" />
      </svg>
      <span className="label-mono absolute bottom-5 right-5 rounded-full bg-ink/85 px-2.5 py-1 text-ivory">
        Placeholder poster
      </span>
    </span>
  );
}