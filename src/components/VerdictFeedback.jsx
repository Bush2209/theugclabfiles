import { useState } from 'react';
import { Link } from 'react-router-dom';
import { track } from '../lib/signals';

const OPTIONS = [
  { key: 'answered', label: 'That answered it' },
  { key: 'partly', label: 'Partly' },
  { key: 'open', label: 'Still open' },
];

/**
 * VerdictFeedback — one tap on whether a verdict actually landed.
 *
 * Deliberately not a star rating or a comment box: the useful signal is
 * "did this close the question", not "how many stars". The follow-up link
 * sends anyone with a gap straight into the intake form, already attributed
 * to this case, which is how the loop closes.
 */
export default function VerdictFeedback({ caseSlug, verdict }) {
  const [answer, setAnswer] = useState(null);

  function choose(key) {
    if (answer) return;
    setAnswer(key);
    track('verdict_feedback', { case: caseSlug, verdict, answer: key });
  }

  return (
    <div className="rounded-3xl border-2 border-ivory/20 bg-ivory/5 p-6 text-left sm:p-7">
      {answer ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] leading-relaxed text-ivory/75">
            Logged — thank you. That is how the next investigation gets sharper.
          </p>
          <Link
            to={`/submit?case=${caseSlug}&type=EXPERIENCE`}
            className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime"
          >
            Add what you know →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="label-mono text-ivory/50">Filed a question here?</p>
            <p className="mt-1.5 font-display text-[16.5px] font-bold leading-tight text-ivory">
              Did this verdict answer it?
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => choose(option.key)}
                className="rounded-full border-2 border-ivory/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em]
                  text-ivory/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime hover:bg-lime hover:text-ink"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
