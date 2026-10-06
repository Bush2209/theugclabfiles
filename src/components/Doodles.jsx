/**
 * HAND-DRAWN ANNOTATION LIBRARY
 * ------------------------------------------------------------------
 * Small inline SVGs used as evidence doodles, arrows, circles and stamps.
 * All strokes are deliberately imperfect to read as hand-drawn rather than
 * geometric. `currentColor` keeps them themeable from Tailwind text classes.
 */

/** Curved arrow that loops under a headline. */
export function ArrowCurve({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={`h-auto w-24 ${className}`}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M4 8c28 2 62 10 92 34"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="240"
        strokeDashoffset="240"
        className="animate-draw-line"
      />
      <path
        d="M96 42c-4 1-9 2-13 4l7-13c1 3 3 6 6 9z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Straight hand-drawn down arrow. */
export function ArrowDown({ className = '', length = 34 }) {
  return (
    <svg
      viewBox="0 0 24 48"
      className={`h-auto ${className}`}
      style={{ width: length / 2.2 }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3v40"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="60"
        strokeDashoffset="60"
        className="animate-draw-line"
      />
      <path
        d="M5 34l7 9 7-9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="60"
        strokeDashoffset="60"
        className="animate-draw-line"
      />
    </svg>
  );
}

/** Messy hand-drawn circle used to ring a detail. */
export function CircleMark({ className = '', label = '' }) {
  return (
    <svg
      viewBox="0 0 160 90"
      preserveAspectRatio="none"
      className={`h-full w-full ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M118 14C92 3 38 5 18 26c-16 17-9 44 18 54 30 11 84 8 108-12 17-14 14-40-6-51"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M126 22c-24-8-70-6-88 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      {label ? (
        <text
          x="80"
          y="52"
          textAnchor="middle"
          className="fill-current font-hand"
          fontSize="17"
        >
          {label}
        </text>
      ) : null}
    </svg>
  );
}

/** Magnifying glass — also used as the cursor follower. */
export function Magnifier({ className = '', strokeWidth = 5 }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle
        cx="27"
        cy="27"
        r="14"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M38 38 L52 52"
        stroke="currentColor"
        strokeWidth={strokeWidth + 2}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Rubber-stamp style ring used for verdicts. */
export function Stamp({ className = '', label = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border-[3px] border-current px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-label ${className}`}
    >
      {label}
    </div>
  );
}

/** Masking-tape strip for the top of paper cards. */
export function Tape({ className = '', color = 'bg-butter' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -top-3 left-6 h-6 w-20 rotate-[-3deg] rounded-[2px] ${color} opacity-80 mix-blend-multiply ${className}`}
    >
      <span className="block h-full w-full bg-[repeating-linear-gradient(115deg,rgba(32,35,31,0.10)_0_1px,transparent_1px_6px)]" />
    </span>
  );
}

/** Paperclip / pin used on case folders. */
export function Pin({ className = '' }) {
  return (
    <svg viewBox="0 0 32 32" className={`h-7 w-7 ${className}`} fill="none" aria-hidden="true">
      <path
        d="M11 15l6.5-6.5a4.6 4.6 0 016.5 6.5L14 25a2.3 2.3 0 01-3.2-3.2l9.5-9.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------- Process step doodles ---------------- */

const doodleProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function QuestionDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...doodleProps} aria-hidden="true">
      <path d="M40 22c0 8-7.2 15-16 15S8 30 8 22 15.2 7 24 7c5 0 9 2 12 5" />
      <path d="M30 3h10v10" />
      <path d="M24 15c-3.4 0-6 2.2-6 5.2 0 2 1.4 3.1 3.2 4.4 1.8 1.3 2.8 2.3 2.8 4.2" />
      <path d="M24 33.5v.4" strokeWidth="3" />
    </svg>
  );
}

function BoxDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...doodleProps} aria-hidden="true">
      <path d="M6 17l18-9 18 9-18 9z" />
      <path d="M6 17v18l18 9 18-9V17" />
      <path d="M24 26v18" />
      <path d="M15 13l18 9" />
    </svg>
  );
}

function BookDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...doodleProps} aria-hidden="true">
      <path d="M7 9h13a6 6 0 016 6v25a5 5 0 00-5-5H7z" />
      <path d="M41 9H28a6 6 0 00-6 6v25a5 5 0 015-5h14z" />
      <path d="M12 18h7M12 24h7M31 18h6M31 24h6" />
    </svg>
  );
}

function GlassDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...doodleProps} aria-hidden="true">
      <path d="M13 6h22v15a11 11 0 01-22 0z" />
      <path d="M13 6H8v15a11 11 0 0010 10M35 6h5v15a11 11 0 01-10 10" />
      <path d="M19 22v14M29 20v16" />
      <path d="M9 40h30" />
    </svg>
  );
}

function StampDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...doodleProps} aria-hidden="true">
      <path d="M14 34l-3 10h26l-3-10" />
      <path d="M17 31h14v4H17z" />
      <path d="M20 31v-8a4 4 0 118 0v8" />
      <path d="M20 13h8" />
    </svg>
  );
}

const STEP_DOODLES = {
  question: QuestionDoodle,
  box: BoxDoodle,
  book: BookDoodle,
  glass: GlassDoodle,
  stamp: StampDoodle,
};

export function StepDoodle({ name, className = '' }) {
  const Cmp = STEP_DOODLES[name] ?? QuestionDoodle;
  return <Cmp className={className} />;
}

/* ---------------- Misc scrapbook marks ---------------- */

/** Squiggly underline for emphasis words. */
export function Squiggle({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 120 14"
      preserveAspectRatio="none"
      className={`h-3 w-full ${className}`}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <path
        d="M2 9c10-6 20 4 30-2s20-6 30 0 20 6 30-2 16-4 26 2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small cross / plus mark used to fill empty grid space. */
export function PlusMark({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...doodleProps} aria-hidden="true">
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}

/** Dot cluster, like pencil dots used for emphasis. */
export function DotMark({ className = '' }) {
  return (
    <svg viewBox="0 0 40 16" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="8" r="3" />
      <circle cx="20" cy="8" r="4" />
      <circle cx="35" cy="8" r="3" />
    </svg>
  );
}

/** Simple X mark — used for "we don't do this" lists. */
export function CrossMark({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...doodleProps} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Circular rubber-stamp seal, used next to claim / finding headings. */
export function StampSeal({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={`h-7 w-7 ${className}`} fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="3" strokeDasharray="5 4" />
      <path d="M15 25l6 6 12-13" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Circle with a slash — used next to finding headings. */
export function SealSlash({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={`h-7 w-7 ${className}`} fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="3" />
      <path d="M12 12l24 24" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

/** Check mark — used for "we do this". */
export function CheckMark({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...doodleProps} aria-hidden="true">
      <path d="M4 13l5 5L20 6" />
    </svg>
  );
}

/** Downward timeline connector used between investigation steps on mobile. */
export function StepConnector({ className = '', active = false }) {
  return (
    <div className={`relative my-1 h-12 w-px sm:h-16 ${className}`} aria-hidden="true">
      <span className="absolute inset-0 bg-ink/20" />
      <span
        className={`absolute left-0 top-0 w-px origin-top bg-ink ${
          active ? 'animate-line-grow' : ''
        }`}
        style={{ height: '100%' }}
      />
      <span className="absolute -left-[3px] bottom-0 h-[7px] w-[7px] rounded-full bg-ink" />
    </div>
  );
}