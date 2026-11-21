/**
 * Shared GitHub client for the intake functions.
 *
 * Credentials come from Vercel environment variables, never from source:
 *   GITHUB_TOKEN  Secret  — a token with write access to the intake repo
 *   GITHUB_REPO   Config  — "owner/repo" of the private intake repository
 *
 * The repo must be private: submissions can contain names and contact details.
 */

const REPO = process.env.GITHUB_REPO ?? 'Bush2209/theugclabfiles-intake';
const TOKEN = process.env.GITHUB_TOKEN;
const BRANCH = process.env.GITHUB_BRANCH ?? 'main';

export function githubConfigured() {
  return Boolean(TOKEN && REPO);
}

/**
 * Thin wrapper around the GitHub REST API.
 *
 * @param {string} path  e.g. "/issues" or "/contents/signals/2026-11-21.jsonl"
 * @param {object} opts  { method, body, allow404 }
 */
export async function github(path, { method = 'GET', body, allow404 = false } = {}) {
  if (!githubConfigured()) throw new Error('GitHub intake is not configured');

  const res = await fetch(`https://api.github.com/repos/${REPO}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'ugc-investigator-intake',
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (allow404 && res.status === 404) return null;

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GitHub ${res.status}: ${text.slice(0, 160)}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

/** Read a JSON/text file from the repo, or return '' when it does not exist. */
export async function readFile(path) {
  const file = await github(
    `/contents/${path}?ref=${encodeURIComponent(BRANCH)}`,
    { allow404: true }
  );
  if (!file) return { content: '', sha: undefined };
  return {
    content: Buffer.from(file.content ?? '', 'base64').toString('utf8'),
    sha: file.sha,
  };
}

/**
 * Create or update a file. Retries once on a SHA conflict, which happens when
 * two signals land in the same instant and both read the same old version.
 */
export async function writeFile(path, content, message) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { sha } = await readFile(path);
    let conflict = false;

    try {
      await github(`/contents/${path}`, {
        method: 'PUT',
        body: {
          message,
          content: Buffer.from(content, 'utf8').toString('base64'),
          branch: BRANCH,
          ...(sha ? { sha } : {}),
        },
      });
      return;
    } catch (err) {
      // 409 is a stale SHA. Anything else is a real failure.
      conflict = /GitHub 409/.test(String(err));
      if (!conflict || attempt === 2) throw err;
    }
  }
}

/** Labels are created on demand so a fresh intake repo needs no manual setup. */
export async function ensureLabels(labels) {
  await Promise.all(
    labels.map(({ name, color }) =>
      github('/labels', {
        method: 'POST',
        body: { name, color, description: 'Created automatically by the intake form.' },
      }).catch(() => {
        // 422 means the label already exists; that is the expected common case.
      })
    )
  );
}
