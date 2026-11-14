import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  getConsent,
  setConsent,
} from '../lib/signals';

/**
 * ConsentBanner — the one gate between visitor behaviour and the feedback loop.
 *
 * Deliberately small and dismissible: it asks for the least it can, explains
 * the exchange in one sentence, and never blocks the page. Declining is as easy
 * as accepting and is remembered. The footer can reopen it, so withdrawing a
 * choice later is possible without clearing site data.
 */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setOpen(getConsent() === null);
    sync();

    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
    };
  }, []);

  if (!open) return null;

  const decide = (value) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Data and privacy choice"
      className="page-enter fixed inset-x-3 bottom-3 z-40 rounded-2xl border-2 border-ink bg-white p-5 shadow-lift
        sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[23rem]"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 rounded-t-xl bg-lime" />

      <p className="label-mono flex items-center gap-2 text-ink/55">
        <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-coral" />
        Your call
      </p>

      <p className="mt-3 font-display text-[17px] font-bold leading-tight text-ink">
        May I record what you look for?
      </p>

      <p className="mt-2 text-[13.5px] leading-relaxed text-ink/65">
        Anonymous searches, filters and verdict reactions — so the next investigation goes where
        people are actually asking. No ad trackers, no third parties.
      </p>

      <div className="mt-4 flex items-center gap-2">
        <button type="button" onClick={() => decide('granted')} className="btn-primary flex-1 !px-4 !py-2.5">
          Allow
        </button>
        <button
          type="button"
          onClick={() => decide('denied')}
          className="btn flex-1 border-2 border-ink/20 px-4 py-2.5 text-ink/70 hover:border-ink hover:text-ink"
        >
          No thanks
        </button>
      </div>

      <Link
        to="/privacy"
        className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.13em] text-ink/45 underline decoration-ink/20 underline-offset-4 hover:text-ink hover:decoration-ink"
      >
        Exactly what gets recorded →
      </Link>
    </div>
  );
}
