/**
 * PLACEHOLDER MEDIA
 * ------------------------------------------------------------------
 * Drawn stand-ins for product photography.
 *
 * Every shot renders a labelled frame reading PLACEHOLDER so nothing on the
 * site passes as a real photograph. To use real assets, pass `src` to
 * <MediaFrame /> — the illustration is replaced by the image and the
 * placeholder badge disappears.
 *
 * kind: bottle | tube | jar | dropper | pump | box | row | label | photo
 */

const SKIN = {
  base: '#FFFFFF',
  line: '#20231F',
};

function Shapes({ kind, fill }) {
  const c = fill;

  switch (kind) {
    case 'tube':
      return (
        <g stroke={SKIN.line} strokeWidth="3" strokeLinejoin="round">
          <path d="M78 46h44v22l6 108c1 12-8 20-20 20H92c-12 0-21-8-20-20l6-108z" fill={c} />
          <path d="M78 46h44v22H78z" fill="#fff" fillOpacity="0.55" />
          <rect x="72" y="30" width="56" height="18" rx="6" fill="#fff" />
          <path d="M76 84h48M76 150h48" strokeOpacity="0.25" strokeWidth="2" />
        </g>
      );
    case 'jar':
      return (
        <g stroke={SKIN.line} strokeWidth="3" strokeLinejoin="round">
          <path d="M56 74h88v78c0 10-8 18-18 18H74c-10 0-18-8-18-18z" fill={c} />
          <path d="M50 52h100v24H50z" fill="#fff" fillOpacity="0.7" />
          <path d="M50 58h100M62 112h76M62 128h52" strokeOpacity="0.25" strokeWidth="2" />
        </g>
      );
    case 'dropper':
      return (
        <g stroke={SKIN.line} strokeWidth="3" strokeLinejoin="round">
          <path d="M74 74h52v78c0 9-7 16-16 16H90c-9 0-16-7-16-16z" fill={c} />
          <path d="M86 30h28v46H86z" fill="#fff" fillOpacity="0.7" />
          <rect x="80" y="18" width="40" height="16" rx="5" fill="#fff" />
          <path d="M84 108h32M84 124h20" strokeOpacity="0.25" strokeWidth="2" />
        </g>
      );
    case 'pump':
      return (
        <g stroke={SKIN.line} strokeWidth="3" strokeLinejoin="round">
          <path d="M76 88h48v66c0 9-7 16-16 16H92c-9 0-16-7-16-16z" fill={c} />
          <rect x="84" y="66" width="32" height="24" rx="4" fill="#fff" fillOpacity="0.7" />
          <path d="M100 66V52h30v8" fill="none" />
          <path d="M88 120h24M88 136h14" strokeOpacity="0.25" strokeWidth="2" />
        </g>
      );
    case 'box':
      return (
        <g stroke={SKIN.line} strokeWidth="3" strokeLinejoin="round">
          <path d="M100 40l48 22v82l-48 22-48-22V62z" fill={c} />
          <path d="M52 62l48 22 48-22" fill="none" />
          <path d="M100 84v82" fill="none" strokeOpacity="0.4" />
          <path d="M72 96h18M72 110h26" strokeOpacity="0.3" strokeWidth="2" />
        </g>
      );
    case 'row':
      return (
        <g stroke={SKIN.line} strokeWidth="3" strokeLinejoin="round">
          <path d="M28 96h30v66H28z" fill="#fff" fillOpacity="0.75" />
          <rect x="32" y="80" width="22" height="18" rx="4" fill="#fff" />
          <path d="M85 78h34v84H85z" fill={c} />
          <rect x="90" y="60" width="24" height="20" rx="5" fill="#fff" />
          <path d="M142 96h30v66h-30z" fill="#fff" fillOpacity="0.75" />
          <rect x="146" y="80" width="22" height="18" rx="4" fill="#fff" />
          <path d="M20 164h160" strokeOpacity="0.35" />
        </g>
      );
    case 'label':
      return (
        <g stroke={SKIN.line} strokeWidth="3" strokeLinejoin="round">
          <rect x="42" y="42" width="116" height="122" rx="10" fill={c} />
          <path d="M42 66h116" strokeOpacity="0.35" />
          <path d="M58 86h84M58 104h70M58 122h84M58 140h44" strokeOpacity="0.4" strokeWidth="2.5" />
          <circle cx="136" cy="136" r="16" fill="none" strokeOpacity="0.5" />
          <path d="M128 136l6 6 10-12" fill="none" strokeOpacity="0.6" />
        </g>
      );
    case 'photo':
      return (
        <g stroke={SKIN.line} strokeWidth="3" strokeLinejoin="round">
          <rect x="40" y="48" width="120" height="104" rx="8" fill={c} fillOpacity="0.5" />
          <path d="M40 126l32-30 26 24 22-18 40 34v16H40z" fill={c} />
          <circle cx="72" cy="76" r="10" fill="#fff" />
          <path d="M28 164h144" strokeOpacity="0.4" />
        </g>
      );
    case 'bottle':
    default:
      return (
        <g stroke={SKIN.line} strokeWidth="3" strokeLinejoin="round">
          <path d="M76 74h48v82c0 9-7 16-16 16H92c-9 0-16-7-16-16z" fill={c} />
          <path d="M88 34h24v42H88z" fill="#fff" fillOpacity="0.7" />
          <rect x="82" y="20" width="36" height="16" rx="5" fill="#fff" />
          <path d="M84 104h32M84 120h20" strokeOpacity="0.25" strokeWidth="2" />
        </g>
      );
  }
}

/**
 * A single drawn product shot.
 * Use directly inside cards, or via <MediaFrame />.
 */
export default function ProductShot({ kind = 'bottle', color = 'ink', className = '', title = '' }) {
  // Tailwind can't resolve dynamic class names, so map the accent to a literal.
  const wash = {
    lime: '#B8F34A',
    lavender: '#B99CFF',
    coral: '#FF6B6B',
    butter: '#FFD85A',
    cyan: '#7DE3E3',
    ink: '#D9D6CE',
  }[color] ?? '#D9D6CE';

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={title ? `Placeholder illustration of ${title}` : 'Placeholder product illustration'}
    >
      <rect width="200" height="200" fill={wash} fillOpacity="0.28" />
      <ellipse cx="100" cy="176" rx="52" ry="7" fill={SKIN.line} fillOpacity="0.1" />
      <Shapes kind={kind} fill={wash} />
      <rect
        x="4"
        y="4"
        width="192"
        height="192"
        fill="none"
        stroke={SKIN.line}
        strokeOpacity="0.12"
      />
    </svg>
  );
}

/**
 * Framed media with an honest placeholder badge and optional caption.
 * Pass `src` to show real photography instead of the illustration.
 *
 * `frame` controls the chrome, rather than letting callers override the base
 * classes with `className` (Tailwind's utility order decides who wins there):
 *   'card'   — default rounded, fully bordered tile
 *   'flush'  — no radius, only a bottom rule. Use when the media is the top of a card
 *   'plain'  — no chrome at all. Caller is responsible for the frame
 */
const FRAMES = {
  card: 'rounded-2xl border-2 border-ink/12 bg-white',
  flush: 'border-b-2 border-ink/12 bg-white',
  plain: 'bg-ivory',
};

export function MediaFrame({
  kind = 'bottle',
  color = 'ink',
  src = '',
  alt = '',
  title = '',
  refLabel = '',
  ratio = 'aspect-[4/5]',
  frame = 'card',
  className = '',
  tape = false,
}) {
  const showPlaceholder = !src;
  const chrome = FRAMES[frame] ?? FRAMES.card;

  return (
    <div className={`relative overflow-hidden ${chrome} ${ratio} ${className}`}>
      {src ? (
        <img src={src} alt={alt || title} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <ProductShot kind={kind} color={color} title={title} className="h-full w-full" />
      )}

      {refLabel ? (
        <span className="label-mono absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-ink/70">
          {refLabel}
        </span>
      ) : null}

      {showPlaceholder ? (
        <span className="label-mono absolute bottom-3 right-3 rounded-full bg-ink/85 px-2.5 py-1 text-ivory">
          Placeholder
        </span>
      ) : null}

      {tape ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-4 -top-3 h-6 w-24 rotate-[-4deg] rounded-[2px] bg-butter/80 mix-blend-multiply"
        />
      ) : null}
    </div>
  );
}