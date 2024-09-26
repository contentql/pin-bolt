import { env } from '@env'
import type { Blog } from '@payload-types'
import type { Metadata } from 'next'

import { mergeOpenGraph } from './merge-open-graph'

/**
 * Generates metadata for a given blog document, including title, description,
 * and Open Graph properties, based on the document's metadata and collection slug.
 *
 * @param {Object} args - The arguments object.
 * @param {Blog | null} args.doc - The blog document object containing metadata.
 * @param {string} args.collectionSlug - The slug representing the page name, e.g., 'blog'.
 * @returns {Promise<Metadata>} - A promise that resolves to a `Metadata` object.
 *
 * @example
 * ```
 * const meta = await generateMeta({
 *   doc: blogDoc,
 *   collectionSlug: 'blog',
 * })
 *
 * // Example output:
 * // {
 * //   title: 'Blog Title',
 * //   description: 'Blog Description',
 * //   openGraph: {
 * //     title: 'Blog Title',
 * //     description: 'Blog Description',
 * //     url: 'http://localhost:3000/blog/[id]',
 * //     images: [{ url: 'http://example.com/image.jpg' }]
 * //   }
 * // }
 * ```
 */
export const generateMeta = async (args: {
  doc: Blog | null
  collectionSlug: string
}): Promise<Metadata> => {
  // ? collectionSlug is the name of the page eg.: http://localhost:3000/blog/[id] (`blog` is the collectionSlug)
  const { doc, collectionSlug } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc?.meta?.image !== null &&
    'url' in doc?.meta?.image &&
    doc.meta.image.url

  const url = `${env.NEXT_PUBLIC_PUBLIC_URL}/${collectionSlug}/${doc?.id}`

  return {
    title: doc?.meta?.title || 'ContentQL',
    description: doc?.meta?.description || 'ContentQL - Description',
    openGraph: mergeOpenGraph({
      title: doc?.meta?.title!,
      description: doc?.meta?.description!,
      url,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}
