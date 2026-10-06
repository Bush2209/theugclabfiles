import Reveal from './Reveal';
import { PlusMark, DotMark } from './Doodles';

/**
 * SectionHeading — consistent editorial section header.
 * `label` is the mono eyebrow, `title` the display heading.
 */
export default function SectionHeading({
  label,
  title,
  body = '',
  align = 'left',
  aside = null,
  count = null,
  className = '',
}) {
  const centred = align === 'center';

  return (
    <Reveal
      className={`relative flex flex-col gap-5 ${centred ? 'items-center text-center' : 'items-start'} ${className}`}
    >
      {label ? (
        <p className="label-mono flex items-center gap-2 text-ink/50">
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-lime ring-4 ring-lime/25" />
          {label}
          {count !== null ? <span className="text-ink/35">{count}</span> : null}
        </p>
      ) : null}

      <div className={`flex w-full flex-col gap-6 ${centred ? 'items-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
        <div className={centred ? 'max-w-3xl' : 'max-w-3xl'}>
          <h2 className="font-display text-[clamp(1.9rem,5.2vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink">
            {title}
          </h2>
          {body ? (
            <p className="mt-4 max-w-prose2 text-[16px] leading-relaxed text-ink/65 sm:text-[17px]">{body}</p>
          ) : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>

      {/* ruled notebook line */}
      <span aria-hidden="true" className="mt-2 block h-px w-full bg-ink/15" />
      {centred ? (
        <span aria-hidden="true" className="absolute -bottom-1 left-1/2 h-px w-24 -translate-x-1/2 bg-ink/40" />
      ) : (
        <>
          <PlusMark className="absolute -right-2 -top-2 h-7 w-7 text-ink/20" />
          <DotMark className="absolute -bottom-3 right-8 h-3 w-8 text-ink/20" />
        </>
      )}
    </Reveal>
  );
}