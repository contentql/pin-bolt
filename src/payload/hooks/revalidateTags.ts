import { Tag } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateTags: CollectionAfterChangeHook<Tag> = async ({
  doc,
}) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-tags')
    revalidateTag('list-tags-with-blog-count')

    revalidateTag(`details-tags-${doc.slug}`)
    revalidateTag(`details-blogs-by-tags-${doc.slug}`)

    console.log(`list-tags at ${new Date().getTime()}`)
  }
}
