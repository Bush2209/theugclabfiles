import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readFile } from 'node:fs/promises'

/**
 * Emits sitemap.xml at build time from the actual case/ingredient data, so it
 * stays in sync automatically as new investigations are added. Set SITE_URL in
 * the environment to override the default origin.
 */
function sitemapPlugin(siteUrl) {
  return {
    name: 'ugc-sitemap',
    apply: 'build',
    async generateBundle() {
      const [casesSrc, ingredientsSrc] = await Promise.all([
        readFile(new URL('./src/data/cases.js', import.meta.url), 'utf8'),
        readFile(new URL('./src/data/ingredients.js', import.meta.url), 'utf8'),
      ])

      // Cheap, dependency-free extraction of `slug:` values from the data files.
      const slugs = (src, re) => [...src.matchAll(re)].map((m) => m[1])

      const caseSlugs = slugs(casesSrc, /^\s{4}slug: '([^']+)',/gm)
      const ingredientSlugs = slugs(ingredientsSrc, /^\s{4}slug: '([^']+)',/gm)

      const routes = [
        { loc: '/', priority: '1.0', freq: 'weekly' },
        { loc: '/case-files', priority: '0.9', freq: 'weekly' },
        { loc: '/ingredients', priority: '0.9', freq: 'weekly' },
        { loc: '/lab', priority: '0.7', freq: 'monthly' },
        { loc: '/submit', priority: '0.8', freq: 'monthly' },
        { loc: '/work-with-me', priority: '0.8', freq: 'monthly' },
        ...caseSlugs.map((s) => ({ loc: `/case-files/${s}`, priority: '0.8', freq: 'monthly' })),
        ...ingredientSlugs.map((s) => ({ loc: `/ingredients/${s}`, priority: '0.7', freq: 'monthly' })),
      ]

      const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r.loc}</loc>
    <changefreq>${r.freq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`.trimStart()

      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: body })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    sitemapPlugin(process.env.SITE_URL ?? 'https://theuginvestigator.com'),
  ],
  server: {
    port: 5174,
  },
})