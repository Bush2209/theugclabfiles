/**
 * POST /api/intake
 *
 * Turns a validated case submission into a GitHub Issue in the private intake
 * repository. One issue per submission means it can be labelled, sorted,
 * commented on and closed from GitHub's web UI or the `gh` CLI — no custom
 * admin panel required.
 */

import { github, githubConfigured, ensureLabels } from './_github.js';

const TYPES = new Set([
  'PRODUCT',
  'INGREDIENT',
  'BRAND CLAIM',
  'COMPARISON',
  'LIFESTYLE QUESTION',
  'EXPERIENCE',
  'OTHER',
]);

const SOURCES = new Set(['ig', 'yt', 'direct']);
const MAX_BODY = 16_000;

const json = (data, status = 200) => Response.json(data, { status });

export async function POST(request) {
  if (!githubConfigured()) {
    return json({ ok: false, error: 'Intake is not configured yet.' }, 503);
  }

  let raw;
  try {
    raw = await request.text();
  } catch {
    return json({ ok: false, error: 'Could not read the request.' }, 400);
  }
  if (raw.length > MAX_BODY) {
    return json({ ok: false, error: 'Submission is too large.' }, 413);
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  // Honeypot: real visitors never fill this hidden field.
  if (data.company) return json({ ok: true, ref: null, ignored: true });

  const type = String(data.type ?? '').toUpperCase();
  const product = String(data.product ?? '').trim();
  const question = String(data.question ?? '').trim();
  const why = String(data.why ?? '').trim();
  const name = String(data.name ?? '').trim();
  const contact = String(data.contact ?? '').trim();
  const caseSlug = String(data.case ?? '').trim();
  const source = SOURCES.has(data.source) ? data.source : 'direct';

  const errors = [];
  if (!TYPES.has(type)) errors.push('type');
  if (!product || product.length > 200) errors.push('product');
  if (question.length < 12 || question.length > 4000) errors.push('question');
  if (why.length > 2000) errors.push('why');
  if (name.length > 100) errors.push('name');
  if (contact.length > 200) errors.push('contact');
  if (caseSlug && !/^[a-z0-9][a-z0-9-]*$/.test(caseSlug)) errors.push('case');

  if (errors.length) {
    return json({ ok: false, error: 'Invalid fields.', fields: errors }, 422);
  }

  const received = new Date().toISOString();
  const safe = (value) =>
    [...value]
      .filter((ch) => {
        const code = ch.charCodeAt(0);
        return code >= 32 && code !== 127;
      })
      .join('');

  const body = [
    `**Received:** ${received}`,
    `**Type:** ${type}`,
    `**Product / brand:** ${safe(product)}`,
    caseSlug ? `**Linked case:** ${caseSlug}` : null,
    `**Source:** ${source === 'direct' ? 'site' : source.toUpperCase()}`,
    name ? `**Name:** ${safe(name)}` : null,
    contact ? `**Contact:** ${safe(contact)}` : null,
    `**Image attached:** ${data.hasImage ? 'yes (file not transmitted)' : 'no'}`,
    '',
    '## The question',
    '',
    safe(question),
    '',
    ...(why ? ['## Why it matters', '', safe(why), ''] : []),
    '---',
    '_Submitted through theugclabfiles. Triage: add findings in a comment, then close._',
  ]
    .filter((line) => line !== null)
    .join('\n');

  const labels = [
    { name: 'submission', color: 'B8F34A' },
    { name: `type:${type.toLowerCase().replace(/\s+/g, '-')}`, color: 'B99CFF' },
    { name: `source:${source}`, color: '7DE3E3' },
    ...(caseSlug
      ? [{ name: `case:${caseSlug}`, color: 'FF6B6B' }]
      : [{ name: 'unassigned', color: 'FFD85A' }]),
  ];

  try {
    await ensureLabels(labels);
    const issue = await github('/issues', {
      method: 'POST',
      body: {
        title: `[${type}] ${product.slice(0, 90)}`,
        body,
        labels: labels.map((l) => l.name),
      },
    });

    return json({
      ok: true,
      ref: `INTAKE #${String(issue.number).padStart(3, '0')}`,
      issue: issue.html_url,
    }, 201);
  } catch (err) {
    // Never echo a GitHub error body to the browser — it can contain URLs
    // and token-adjacent detail. Log it on the server instead.
    console.error('intake failed:', err.message);
    return json({ ok: false, error: 'Could not file the case. Try again shortly.' }, 502);
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204 });
}
