import { collectionSlug } from '@contentql/core'
import { env } from '@env'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { serverClient } from '@/trpc/serverClient'

export const dynamic = 'force-dynamic'
type StaticRoute = { route: string; updatedAt: Date }

const sitemapGenerationMapping = {
  blogs: serverClient.blog.getAllBlogs(),
  tags: serverClient.tag.getAllTags(),
  users: serverClient.author.getAllAuthors(),
} as const

export async function GET() {
  const payload = await getPayload({ config: configPromise })

  const { docs: pages } = await payload.find({
    collection: collectionSlug.pages,
    depth: 0,
    select: {
      path: true,
      updatedAt: true,
      layout: true,
    },
    limit: 1000,
  })

  const sitemapParams: StaticRoute[] = []

  for (const page of pages) {
    if (!page) {
      continue // Skip invalid pages
    }

    // If the route is dynamic (contains `[`)
    if (page?.path?.includes('[') && page.layout) {
      const blockData = page.layout.find(block => block.blockType === 'Details')

      // If it has a Details block with a valid collectionSlug
      if (blockData?.blockType === 'Details' && blockData.collectionSlug) {
        const slug = blockData.collectionSlug

        // Fetch all slugs for the given collection (e.g., blogs, tags, users)
        const data = await sitemapGenerationMapping[slug]

        if (data && Array.isArray(data)) {
          let path = ''
          for (const item of data) {
            if ('username' in item) {
              path = item.username
            } else if ('slug' in item) {
              path = `${item.slug}`
            }

            // Dynamically replace `[parameter]` with actual slug
            const dynamicPath = page.path.replace(/\[(.*?)\]/, path)

            sitemapParams.push({
              route: dynamicPath,
              updatedAt: new Date(page.updatedAt),
            })
          }
        }
        continue
      }
    }

    // Statics (non-dynamic paths)
    const nonDynamicPath = page?.path?.split('/').filter(Boolean)[0]
    if (nonDynamicPath) {
      sitemapParams.push({
        route: nonDynamicPath,
        updatedAt: new Date(page.updatedAt),
      })
    }
  }

  ''.startsWith('/')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapParams
        .map(
          page => `
        <url>
          <loc>${env.PAYLOAD_URL}${page.route.startsWith('/') ? page.route : `/${page.route}`}</loc>
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
