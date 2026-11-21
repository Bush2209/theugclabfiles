/**
 * POST /api/signals
 *
 * Appends one consent-gated event to a dated JSONL file in the private intake
 * repo. JSONL is deliberately boring: it can be read with `gh api`, imported
 * into a spreadsheet, or charted later without a migration.
 */

import { githubConfigured, readFile, writeFile } from './_github.js';

const ALLOWED_EVENTS = new Set([
  'consent_granted',
  'ingredient_search',
  'ingredient_search_zero',
  'case_filter',
  'case_submitted',
  'case_submit_invalid',
  'case_submit_failed',
  'verdict_feedback',
  'bio_visit',
  'bio_link_click',
]);

const MAX_BODY = 4000;

export async function POST(request) {
  if (!githubConfigured()) {
    return new Response(null, { status: 204 });
  }

  let raw;
  try {
    raw = await request.text();
  } catch {
    return new Response(null, { status: 204 });
  }
  if (raw.length > MAX_BODY) return new Response(null, { status: 204 });

  let event;
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response(null, { status: 204 });
  }

  if (!event || !ALLOWED_EVENTS.has(event.event)) {
    return new Response(null, { status: 204 });
  }

  // Keep props flat, small and non-personal. Reject anything that looks like
  // contact information rather than trusting the client to behave.
  const props = {};
  for (const [key, value] of Object.entries(event.props ?? {}).slice(0, 10)) {
    if (!/^[a-z_][a-z0-9_]*$/.test(key)) continue;
    if (typeof value === 'string') props[key] = value.slice(0, 200);
    else if (typeof value === 'number' || typeof value === 'boolean') props[key] = value;
  }
  const suspicious = Object.values(props).some(
    (v) => typeof v === 'string' && /@|https?:\/\/|\+?\d[\d\s-]{7,}/.test(v)
  );
  if (suspicious) return new Response(null, { status: 204 });

  const day = new Date().toISOString().slice(0, 10);
  const path = `signals/${day}.jsonl`;
  const line = JSON.stringify({
    event: event.event,
    props,
    path: String(event.path ?? '').slice(0, 120),
    ts: event.ts ?? new Date().toISOString(),
    sid: String(event.sid ?? '').slice(0, 24),
  });

  try {
    const { content } = await readFile(path);
    await writeFile(path, content + line + '\n', `signal: ${event.event} @ ${day}`);
  } catch (err) {
    // Instrumentation must never break a page. Log, then silently succeed.
    console.error('signal write failed:', err.message);
  }

  return new Response(null, { status: 204 });
}

export async function OPTIONS() {
  return new Response(null, { status: 204 });
}
