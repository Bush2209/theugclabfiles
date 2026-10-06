import { useEffect, useRef } from 'react';
import { accent } from '../lib/theme';
import { useEscape, useScrollLock } from '../lib/hooks';

/**
 * VideoModal — lightbox for portfolio items.
 *
 * If `item.src` is set it renders a native <video>. For Instagram / YouTube /
 * TikTok, paste an embed URL into `item.embedUrl` and it will render the
 * provider's iframe instead. Both are intentionally empty in this build, so
 * the modal shows honest instructions rather than a fake player.
 */
export default function VideoModal({ item, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const locked = Boolean(item);

  useScrollLock(locked);
  useEscape(locked, onClose);

  useEffect(() => {
    if (locked) closeRef.current?.focus();
  }, [locked, item]);

  if (!item) return null;

  const a = accent(item.accent ?? 'lime');

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in cursor-default bg-ink/45 backdrop-blur-[2px]"
      />

      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-3xl animate-scale-in overflow-hidden rounded-t-3xl border-2 border-ink
          bg-white shadow-modal sm:rounded-3xl"
      >
        <div className="flex items-center justify-between gap-4 border-b-2 border-ink/10 px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <p className="label-mono text-ink/45">
              {item.ref} · {item.platform}
            </p>
            <h2 className="mt-1 truncate font-display text-lg font-bold text-ink sm:text-xl">{item.title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-white
              font-mono text-sm text-ink transition-colors hover:bg-coral"
            aria-label="Close viewer"
          >
            ✕
          </button>
        </div>

        <div className="p-5 sm:p-7">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-ink/12 bg-ivory">
            {item.embedUrl ? (
              <iframe
                src={item.embedUrl}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <div className={`grid h-full place-items-center ${a.wash} px-6 text-center`}>
                <div className="max-w-sm">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-white">
                    <span className="ml-1 block w-0 h-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-ink" />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold text-ink">No video linked yet</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink/65">
                    Add <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[12px]">embedUrl</code> to this
                    portfolio item in <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[12px]">src/data/services.js</code>{' '}
                    to embed the real reel or short here.
                  </p>
                </div>
              </div>
            )}
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['PLATFORM', item.platform],
              ['ROLE', item.role],
              [item.type === 'video' ? 'LENGTH' : 'FORMAT', item.duration ?? item.views],
            ].map(([term, value]) => (
              <div key={term} className="rounded-2xl border-2 border-ink/10 bg-white p-4">
                <dt className="label-mono text-ink/45">{term}</dt>
                <dd className="mt-1 text-[14px] font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}