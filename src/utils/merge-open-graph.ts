import { env } from '@env'
import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'ContentQL',
  title: 'ContentQL',
  description: 'A blog site built with Payload and Next.js.',
  images: [
    {
      url: `${env.PAYLOAD_URL}/images/favicon.ico`,
    },
  ],
}

/**
 * Merges the provided Open Graph metadata with default values.
 *
 * @param {Metadata['openGraph']} [og] - Optional Open Graph metadata to merge with the defaults.
 * @returns {Metadata['openGraph']} - The merged Open Graph metadata.
 *
 * @example
 * const customOG = {
 *   title: 'Custom Title',
 *   description: 'A custom description',
 *   images: [{ url: 'https://example.com/custom-image.jpg' }],
 * }
 *
 * const mergedOG = mergeOpenGraph(customOG)
 * console.log(mergedOG)
 * // Output will include the custom title, description, and image,
 * // but fallback to defaults for any missing values.
 */
export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
