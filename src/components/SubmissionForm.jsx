import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { site, submissionTypes } from '../data/site';
import { track } from '../lib/signals';
import { CrossMark, Squiggle } from './Doodles';

/**
 * SubmissionForm — the "send it to the lab" form.
 *
 * Validation runs in the browser. On success it POSTs to
 * `site.forms.endpoint` if one is configured; otherwise it runs in demo mode
 * and the success state says plainly that nothing was transmitted.
 *
 * The form can be pre-filled from the URL (see SubmitCase) so that "add your
 * experience" on a case file arrives already attributed to that case.
 */
export default function SubmissionForm({ initial = null, caseSlug = '' }) {
  const [values, setValues] = useState(() => ({
    name: '',
    contact: '',
    type: initial?.type ?? 'PRODUCT',
    product: initial?.product ?? '',
    question: '',
    image: null,
    why: initial?.why ?? '',
  }));
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [failure, setFailure] = useState('');

  const set = (key) => (value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const imageName = useMemo(
    () => (values.image ? `${values.image.name} · ${(values.image.size / 1024).toFixed(0)} KB` : ''),
    [values.image]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setFailure('');

    const next = {};

    if (values.question.trim().length < 12) {
      next.question = 'Give us a little more to work with — at least a full sentence.';
    }
    if (!values.product.trim()) {
      next.product = 'Which product or brand is this about?';
    }
    if (!agreed) {
      next.agreed = 'Confirm you are happy for this to be read and stored.';
    }

    setErrors(next);
    if (Object.keys(next).length) {
      track('case_submit_invalid', { fields: Object.keys(next) });
      // move focus to the first problem so keyboard users land on it
      const first = document.querySelector('[data-error="true"]');
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    setSubmitting(true);

    const endpoint = site.forms.endpoint;
    const draft = {
      name: values.name.trim(),
      contact: values.contact.trim(),
      type: values.type,
      product: values.product.trim(),
      question: values.question.trim(),
      why: values.why.trim(),
      hasImage: Boolean(values.image),
      case: caseSlug || null,
    };

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(draft),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
      } else {
        // Demo mode: keep the interaction realistic without pretending to send.
        await new Promise((resolve) => setTimeout(resolve, 700));
      }

      track('case_submitted', {
        type: values.type,
        has_contact: Boolean(draft.contact),
        has_image: draft.hasImage,
        case: draft.case,
        delivered: Boolean(endpoint),
      });

      setSubmitted({
        ref: `INTAKE #${Math.floor(100 + Math.random() * 899)}`,
        demo: !endpoint,
        draft,
      });
    } catch {
      track('case_submit_failed', { type: values.type });
      setFailure(
        "The lab didn't receive that — the connection failed. Try again in a moment, or use the direct line in the footer."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <SuccessState caseRef={submitted.ref} demo={submitted.demo} draft={submitted.draft} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      {/* notebook paper */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-white p-6 shadow-lift sm:p-9">
        <div className="pointer-events-none absolute inset-0 paper opacity-70" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-y-0 left-12 hidden border-l border-coral/30 sm:block"
          aria-hidden="true"
        />

        <div className="relative space-y-7">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              id="name"
              label="Your name"
              optional
              value={values.name}
              onChange={set('name')}
              placeholder="Optional"
              error={errors.name}
            />
            <Field
              id="contact"
              label="Email or Instagram"
              optional
              value={values.contact}
              onChange={set('contact')}
              placeholder="Optional"
              error={errors.contact}
            />
          </div>

          {/* Type selector */}
          <fieldset>
            <legend className="field-label">What should we investigate?</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {submissionTypes.map((t) => {
                const active = values.type === t;
                return (
                  <label
                    key={t}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border-2 px-3.5 py-3 transition-all duration-300 ${
                      active
                        ? 'border-ink bg-lime text-ink'
                        : 'border-ink/15 bg-white text-ink/60 hover:border-ink/40 hover:text-ink'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={t}
                      checked={active}
                      onChange={() => set('type')(t)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 border-ink ${
                        active ? 'bg-ink' : 'bg-white'
                      }`}
                    >
                      {active ? <span className="h-1.5 w-1.5 rounded-full bg-lime" /> : null}
                    </span>
                    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.1em]">{t}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <Field
            id="product"
            label="Product or brand"
            value={values.product}
            onChange={set('product')}
            placeholder="e.g. The moisturiser on the top shelf"
            error={errors.product}
          />

          <div>
            <label htmlFor="question" className="field-label">
              The question{' '}
              <span className="text-coral">·</span>
            </label>
            <textarea
              id="question"
              rows={4}
              value={values.question}
              onChange={(e) => set('question')(e.target.value)}
              data-error={Boolean(errors.question)}
              aria-invalid={Boolean(errors.question)}
              aria-describedby={errors.question ? 'question-error' : undefined}
              placeholder="What is actually being asked here? The more specific, the better the investigation."
              className={`field resize-none ${errors.question ? 'border-coral' : ''}`}
            />
            {errors.question ? (
              <p id="question-error" className="mt-2 flex items-start gap-2 text-[13px] text-coral">
                <span aria-hidden="true">▲</span>
                {errors.question}
              </p>
            ) : null}
          </div>

          {/* Image upload */}
          <div>
            <label htmlFor="image" className="field-label">
              Upload product image
              <span className="normal-case tracking-normal text-ink/35"> · optional</span>
            </label>
            <label
              htmlFor="image"
              className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-ink/25 bg-ivory/70 px-5 py-5
                transition-colors duration-300 hover:border-ink hover:bg-butter/20"
            >
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-ink bg-white font-mono text-lg text-ink"
              >
                ↑
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                  {imageName || 'Attach evidence'}
                </span>
                <span className="mt-0.5 block text-[13px] text-ink/55">
                  A photo of the product and its ingredient list speeds things up a lot.
                </span>
              </span>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => set('image')(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <div>
            <label htmlFor="why" className="field-label">
              Why should we investigate this?
              <span className="normal-case tracking-normal text-ink/35"> · optional</span>
            </label>
            <textarea
              id="why"
              rows={3}
              value={values.why}
              onChange={(e) => set('why')(e.target.value)}
              placeholder="Context, history, or a hunch. Sometimes the best cases start with a hunch."
              className="field resize-none"
            />
          </div>

          {/* Consent — explicit, because this is the one place personal details
              can be shared. Never pre-checked. */}
          <div>
            <label
              htmlFor="agreed"
              className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-ink/65"
            >
              <input
                id="agreed"
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  setErrors((prev) => ({ ...prev, agreed: undefined }));
                }}
                aria-invalid={Boolean(errors.agreed)}
                aria-describedby={errors.agreed ? 'agreed-error' : undefined}
                className="mt-0.5 h-4 w-4 shrink-0 accent-ink"
              />
              <span>
                I&rsquo;m happy for this to be read and stored so the case can be investigated.
                <span className="text-ink/40"> · </span>
                <Link
                  to="/privacy"
                  className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                >
                  What that means
                </Link>
              </span>
            </label>
            {errors.agreed ? (
              <p id="agreed-error" className="mt-2 flex items-start gap-2 text-[13px] text-coral">
                <span aria-hidden="true">▲</span>
                {errors.agreed}
              </p>
            ) : null}
          </div>

          {/* Honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" type="text" tabIndex={-1} autoComplete="off" name="company" />
          </div>

          {failure ? (
            <p role="alert" className="flex items-start gap-2 rounded-xl border-2 border-coral bg-coral/10 px-4 py-3 text-[13px] leading-relaxed text-ink">
              <span aria-hidden="true" className="mt-0.5">▲</span>
              {failure}
            </p>
          ) : null}

          <div className="flex flex-col gap-4 border-t-2 border-ink/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="label-mono max-w-xs text-ink/45">
              No obligation. Cases are queued and prioritised by how many people ask.
            </p>
            <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
              {submitting ? 'Sending to the lab…' : 'Send to the lab'}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <span aria-hidden="true" className="mx-auto mt-6 block h-3 w-40 text-ink/30">
        <Squiggle />
      </span>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  optional = false,
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional ? <span className="normal-case tracking-normal text-ink/35"> · optional</span> : null}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`field ${error ? 'border-coral' : ''}`}
      />
      {error ? (
        <p className="mt-2 flex items-start gap-2 text-[13px] text-coral">
          <span aria-hidden="true">▲</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Playful success state. Honest about whether anything was actually sent. */
function SuccessState({ caseRef, demo, draft }) {
  const mailtoHref = demo
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Case submission — ${draft.product}`)}&body=${encodeURIComponent(
        [
          `Product: ${draft.product}`,
          `Type: ${draft.type}`,
          '',
          draft.question,
          '',
          draft.why ? `Why it matters: ${draft.why}` : '',
          draft.case ? `Related case: ${draft.case}` : '',
        ]
          .filter(Boolean)
          .join('\n')
      )}`
    : '';

  return (
    <Reveal className="relative">
      <div className="relative overflow-hidden rounded-3xl border-2 border-ink bg-lime p-8 shadow-lift sm:p-14">
        <div className="pointer-events-none absolute inset-0 dot-lab opacity-40" aria-hidden="true" />

        <div className="relative text-center">
          {/* magnifier with a drawn line */}
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border-2 border-ink bg-white shadow-card">
            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="6.4" stroke="#20231F" strokeWidth="2" />
              <path d="M15 15l5.5 5.5" stroke="#20231F" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M7.4 10.2l2 2 3.6-4" stroke="#FF6B6B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <p className="label-mono mt-6 text-ink/60">
            {demo ? 'Draft ready' : 'Evidence received'}
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,6vw,3.6rem)] font-extrabold leading-[0.96] tracking-[-0.03em] text-ink">
            {demo ? 'Case drafted. 🔎' : 'Case received. 🔎'}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-ink/75">
            {demo
              ? 'Your case is composed and valid — but this build has nothing connected to receive it yet.'
              : 'Evidence successfully entered the lab.'}
          </p>

          <div className="mx-auto mt-8 inline-flex flex-col items-center gap-2 rounded-2xl border-2 border-ink bg-white px-6 py-4">
            <span className="label-mono text-ink/45">Case status</span>
            <span className="font-mono text-sm font-bold uppercase tracking-[0.16em] text-ink">
              <span
                aria-hidden="true"
                className={`mr-2 inline-block h-2 w-2 rounded-full ${
                  demo ? 'bg-butter' : 'animate-pulse-dot bg-coral'
                }`}
              />
              {demo ? 'Not sent' : 'Queued'}
            </span>
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">
            Your reference: {caseRef}
          </p>

          {demo ? (
            <div className="mx-auto mt-7 max-w-md rounded-2xl border-2 border-ink bg-white p-5 text-left">
              <p className="label-mono text-ink/50">One more step</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/70">
                Nothing was transmitted. Send the draft from your mail app and it reaches the lab
                properly — subject, product and question are already filled in.
              </p>
              <a href={mailtoHref} className="btn-primary mt-4 w-full">
                Send it by email
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ) : null}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/case-files" className="btn-ink">
              Back to case files
              <span aria-hidden="true">→</span>
            </Link>
            <Link to="/lab" className="btn border-2 border-ink bg-white text-ink hover:bg-ivory">
              How the lab works
            </Link>
          </div>

          <ul className="mx-auto mt-10 flex max-w-lg flex-wrap justify-center gap-2">
            {(demo
              ? ['Question logged', 'Draft composed', 'Ready to send']
              : ['Question logged', 'Evidence attached', 'Queued for triage']
            ).map((s) => (
              <li
                key={s}
                className="rounded-full border-2 border-ink bg-white/80 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink/70"
              >
                ✓ {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          ['NEXT', 'We read every submission and pick what to investigate next.'],
          ['TIMING', 'No fixed schedule. Cases are prioritised by how many people ask.'],
          ['TRUTH', 'Queued does not mean guaranteed. Some questions stay open.'],
        ].map(([t, b]) => (
          <li key={t} className="rounded-2xl border-2 border-ink/12 bg-white p-5">
            <p className="label-mono flex items-center gap-1.5 text-ink/45">
              <CrossMark className="h-3.5 w-3.5 rotate-45 text-ink/30" />
              {t}
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink/65">{b}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
