import { site, contentStatus } from '../data/site';

/**
 * PlaceholderNotice — a small, honest banner for demo builds.
 * Delete this component (and its usages) once real content replaces the sample.
 */
export default function PlaceholderNotice({ variant = 'band', className = '' }) {
  if (!contentStatus.isPlaceholder) return null;

  if (variant === 'inline') {
    return (
      <p className={`label-mono flex items-start gap-2 text-ink/45 ${className}`}>
        <span aria-hidden="true">◆</span>
        <span className="normal-case tracking-normal">{contentStatus.notice}</span>
      </p>
    );
  }

  return (
    <aside
      className={`flex flex-col gap-2 rounded-2xl border-2 border-dashed border-ink/25 bg-butter/25 px-5 py-4 ${className}`}
    >
      <p className="label-mono flex items-center gap-2 text-ink/70">
        <span aria-hidden="true">◆</span>
        {contentStatus.shortNotice}
      </p>
      <p className="text-[13.5px] leading-relaxed text-ink/60">{contentStatus.notice}</p>
    </aside>
  );
}

/** Compact source-status strip, used on ingredient and case detail pages. */
export function SourceStatus({ count = 0, className = '' }) {
  return (
    <p className={`label-mono flex items-center gap-2 text-ink/45 ${className}`}>
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${count > 0 ? 'bg-lime' : 'bg-coral'}`}
      />
      {count > 0 ? `${count} source${count === 1 ? '' : 's'} cited` : 'No sources cited yet'}
    </p>
  );
}

/** Footer-wide lab status line. */
export function LabStatusLine() {
  return (
    <span className="label-mono inline-flex items-center gap-2 text-ink/50">
      <span aria-hidden="true" className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-lime ring-2 ring-lime/40" />
      </span>
      {site.status.label} · {site.status.currently}
    </span>
  );
}