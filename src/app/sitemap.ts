import { collectionSlug } from '@contentql/core'
import { env } from '@env'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadHMR({ config: configPromise })
  const { docs: pages } = await payload.find({
    collection: collectionSlug.pages,
    depth: 0,
  })
  const sitemapObject: MetadataRoute.Sitemap = pages.map(page => ({
    url: `${env.PAYLOAD_URL}${page.path}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: 'daily',
    priority: 0.8,
  }))
  return sitemapObject
}
