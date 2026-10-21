// Writes static HTML for every route into dist/, plus 404.html,
// sitemap.xml, robots.txt and llms.txt. Runs after the client and SSR
// builds (see "build" in package.json).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssr = join(root, 'dist-ssr')
const { render, ROUTES, headTags, SITE_URL, UPDATED, pageMeta, ORDER, SERVICES, EMAIL, HQ, INSIGHTS } = await import(
  pathToFileURL(join(ssr, 'entry-server.js')).href
)

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const page = (url) => template.replace('<!--head-->', headTags(url)).replace('<!--app-->', render(url))

for (const url of ROUTES) {
  const file = url === '/' ? join(dist, 'index.html') : join(dist, url.slice(1), 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page(url))
}
writeFileSync(join(dist, '404.html'), page('/404'))

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((u) => `  <url><loc>${SITE_URL}${u}</loc><lastmod>${UPDATED}</lastmod></url>`).join('\n')}
</urlset>
`,
)

// AI crawlers are named explicitly so the intent is clear to each of them.
const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot']
writeFileSync(
  join(dist, 'robots.txt'),
  `# NIMTECH: search engines and AI assistants are welcome to read this site.
# A summary for AI agents lives at ${SITE_URL}/llms.txt
User-agent: *
Allow: /

${bots.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
)

const strip = (t) => String(t).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
const md = [
  '# NIMTECH',
  '',
  `> ${pageMeta('/').description}`,
  '',
  `NIMTECH is an engineering studio headquartered in ${HQ} that works with companies worldwide. Contact: ${EMAIL} or ${SITE_URL}/contact. Clients own the source code, models, datasets and infrastructure we build.`,
  '',
  '## Services',
  '',
  ...ORDER.map((id) => {
    const s = SERVICES[id]
    return `- [${s.name}](${SITE_URL}/services/${id}): ${s.tagline} ${strip(s.desc)} Includes: ${s.get.map(([t]) => t).join(', ')}.`
  }),
  '',
  '## Insights',
  '',
  ...INSIGHTS.map((a) => `- [${a.title}](${SITE_URL}/insights/${a.slug}): ${a.sum} Key points: ${a.takeaways.join(' ')}`),
  '',
  '## Company',
  '',
  ...['/about', '/insights', '/contact'].map(
    (u) => `- [${pageMeta(u).title.split(' | ')[0]}](${SITE_URL}${u}): ${pageMeta(u).description}`,
  ),
  '',
  '## Frequently asked questions',
  '',
  ...ORDER.flatMap((id) => (SERVICES[id].faq || []).slice(0, 3).map(([q, a]) => `- **${strip(q)}** (${SERVICES[id].name}) ${strip(a)}`)),
  '',
]
writeFileSync(join(dist, 'llms.txt'), md.join('\n'))

rmSync(ssr, { recursive: true, force: true })
console.log(`prerendered ${ROUTES.length} routes + 404, sitemap.xml, robots.txt, llms.txt`)
