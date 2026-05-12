import type { RequestHandler } from './$types'
import { notes } from '../Notes'

const escapeXml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const rfc822 = (iso: string) => new Date(iso).toUTCString()

export const GET: RequestHandler = ({ url }) => {
  const origin = url.origin
  const channelLink = `${origin}/notes/`
  const lastBuild = notes[0]?.metadata.date
    ? rfc822(notes[0].metadata.date)
    : rfc822(new Date().toISOString())

  const items = notes
    .map((note) => {
      const title = escapeXml(note.metadata.title ?? note.slug)
      const link = `${origin}${note.href}`
      const desc = note.metadata.description
        ? `<description>${escapeXml(note.metadata.description)}</description>`
        : '<description/>'
      const pub =
        note.metadata.date
          ? `<pubDate>${rfc822(note.metadata.date)}</pubDate>`
          : ''

      return `    <item>
      <title>${title}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      ${pub}
      ${desc}
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Artem Gurtovoi — Notes</title>
    <link>${escapeXml(channelLink)}</link>
    <description>Notes from Artem Gurtovoi’s personal site.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'max-age=3600',
    },
  })
}
