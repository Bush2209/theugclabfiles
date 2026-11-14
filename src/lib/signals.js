/**
 * SIGNALS — the feedback loop behind the site.
 * ------------------------------------------------------------------
 * Every deliberate interaction (a search, a filter, a submission, a
 * verdict reaction) can emit one small event. Reviewed together they answer
 * editorial questions the site would otherwise guess at:
 *
 *   ingredient_search_zero  → what the database is missing
 *   case_filter             → which verticals people actually care about
 *   case_submitted          → the next investigation, ranked by demand
 *   verdict_feedback        → which verdicts landed, and which need a follow-up
 *
 * Design rules, because this is visitor data:
 *
 *   1. Nothing leaves the browser unless the visitor has said yes.
 *      No consent → `track()` returns immediately. No buffering, no replay.
 *   2. No personal data in event props. Never a name, email, handle or file.
 *      Case content travels through the submission endpoint, not through here.
 *   3. No third-party scripts. There is no analytics vendor in this build.
 *   4. Failures are silent. Instrumentation must never break the page.
 *
 * Stage 1 ships with no endpoint, so `track()` records to an in-memory buffer
 * and (in dev) the console. Set VITE_SIGNALS_ENDPOINT to start sending.
 */

const CONSENT_KEY = 'ugc-lab:consent';
const SESSION_KEY = 'ugc-lab:sid';
const MAX_BUFFER = 100;

/** Fired whenever consent changes. `detail` is 'granted' | 'denied'. */
export const CONSENT_EVENT = 'ugc:consent-change';
/** Fired when something asks to reopen the consent prompt. */
export const CONSENT_OPEN_EVENT = 'ugc:consent-open';

// Build-time config. Empty string = record locally, send nothing.
const ENDPOINT = (import.meta.env.VITE_SIGNALS_ENDPOINT ?? '').trim();

/** In-memory only. Never persisted, so a refresh forgets everything. */
const buffer = [];

function safeGet(store, key) {
  try {
    return window[store].getItem(key);
  } catch {
    return null;
  }
}

function safeSet(store, key, value) {
  try {
    window[store].setItem(key, value);
  } catch {
    /* private mode, quota, disabled storage — all fine, carry on */
  }
}

/** 'granted' | 'denied' | null (not asked yet). */
export function getConsent() {
  const value = safeGet('localStorage', CONSENT_KEY);
  return value === 'granted' || value === 'denied' ? value : null;
}

/** Records the visitor's choice and tells every listener. */
export function setConsent(value) {
  safeSet('localStorage', CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  if (value === 'granted') track('consent_granted');
}

/** Reopens the consent prompt (used by the footer "data settings" control). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/** Stable per-tab id, so events from one visit can be grouped. Not a person. */
function sessionId() {
  const existing = safeGet('sessionStorage', SESSION_KEY);
  if (existing) return existing;
  const id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  safeSet('sessionStorage', SESSION_KEY, id);
  return id;
}

/**
 * Emit one signal.
 *
 * @param {string} event  snake_case event name from the catalogue above
 * @param {object} props  non-personal context only
 * @returns {boolean}     whether the event was recorded
 */
export function track(event, props = {}) {
  try {
    if (!event || getConsent() !== 'granted') return false;

    const payload = {
      event,
      props,
      path: window.location?.pathname ?? '',
      ts: new Date().toISOString(),
      sid: sessionId(),
    };

    buffer.push(payload);
    if (buffer.length > MAX_BUFFER) buffer.shift();

    if (!ENDPOINT) {
      if (import.meta.env.DEV) console.debug('[signal]', payload);
      return true;
    }

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* offline, blocked, misconfigured — the page is unaffected */
    });

    return true;
  } catch {
    return false;
  }
}

/** Read-only view of the in-memory buffer. Used by QA, not by the UI. */
export function getSignalBuffer() {
  return buffer.slice();
}

/** Whether an endpoint is configured for this build. */
export const signalsConfigured = Boolean(ENDPOINT);

/*
 * Dev-only inspection hook so the QA sweep can assert that events fire only
 * after consent. Stripped from production builds by the DEV guard.
 */
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.__ugcSignals = () => buffer.slice();
}
