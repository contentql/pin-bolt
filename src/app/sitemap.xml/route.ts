import { collectionSlug } from '@contentql/core'
import { env } from '@env'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import { serverClient } from '@/trpc/serverClient'
import { generateCombinations } from '@/utils/generateCombinations'

export const dynamic = 'force-dynamic'
type StaticRoute = { route: string; updatedAt: Date }
type DynamicPageDataType = { index: number; path: string; slugs: string[] }[]

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
    // Skipping params generation for invalid pages
    if (!page) {
      continue
    }

    // If the route is dynamic (contains `[`)
    // example:- path:- /quote/[quote-details]/costs-breakdown/[costs-breakdown-details] we need to fill the [quote-details] & [costs-breakdown-details] with appropriate slugs
    if (page?.path?.includes('[') && page.layout) {
      const slug = page.path

      // the above path will be splitted into 2 paths /quote/[quote-details], /quote/[quote-details]/costs-breakdown/[costs-breakdown-details] & stored in dynamicPageData
      const dynamicPageData: DynamicPageDataType = []
      const splittedPage = slug.split('/')

      if (splittedPage.length) {
        // storing index of dynamic-segment
        for (const segment of splittedPage) {
          if (segment.startsWith('[')) {
            const index = splittedPage.indexOf(segment)
            const formedPath = splittedPage.slice(0, index + 1)
            const formedSlug = formedPath.join('/')

            const formedSlugPage = pages.find(({ path }) => path === formedSlug)

            if (formedSlugPage && formedSlugPage.layout) {
              const detailsBlock = formedSlugPage.layout.find(
                block => block.blockType === 'Details',
              )

              if (detailsBlock && detailsBlock.collectionSlug) {
                // Fetch all slugs for the given collection (e.g., blogs, tags, users)
                const list =
                  await sitemapGenerationMapping[detailsBlock.collectionSlug]

                if (list && Array.isArray(list)) {
                  dynamicPageData.push({
                    index,
                    path: formedPath.join('/'),
                    slugs: list.map(item => {
                      if ('username' in item) {
                        return item.username
                      } else if ('slug' in item) {
                        return `${item.slug}`
                      }
                      return ''
                    }),
                  })
                }
              }
            }
          }
        }

        const finalOutput = generateCombinations({
          replaceList: splittedPage,
          combinationsList: dynamicPageData,
        })

        finalOutput.forEach(combination => {
          sitemapParams.push({
            route: combination.filter(Boolean).join('/'),
            updatedAt: new Date(page.updatedAt),
          })
        })
      }

      continue
    }

    // Statics (non-dynamic paths)
    // example: /blog or /tags
    const nonDynamicPath = page?.path?.split('/').filter(Boolean)

    if (nonDynamicPath) {
      sitemapParams.push({
        route: nonDynamicPath.join('/'),
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
