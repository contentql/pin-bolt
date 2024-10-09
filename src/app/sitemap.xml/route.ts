import { collectionSlug } from '@contentql/core'
import { env } from '@env'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getPayloadHMR({ config: configPromise })

  const { docs: pages } = await payload.find({
    collection: collectionSlug.pages,
    depth: 0,
  })

  console.log({ pages, payloadURL: env.PAYLOAD_URL })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          page => `
        <url>
          <loc>${env.PAYLOAD_URL}${page.path}</loc>
          <lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `,
        )
        .join('')}
    </urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-store',
    },
  })
}
