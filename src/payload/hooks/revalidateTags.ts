import { Tag } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'

export const revalidateTagsAfterChange: CollectionAfterChangeHook<
  Tag
> = async ({ doc, previousDoc }) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (
    doc._status === 'published' ||
    (previousDoc._status === 'published' && doc._status === 'draft')
  ) {
    revalidateTag('list-tags')
    revalidateTag('list-tags-with-blog-count')

    revalidateTag(`details-tags-${doc.slug}`)
    revalidateTag(`details-blogs-by-tags-${doc.slug}`)

    console.log(`list-tags at ${new Date().getTime()}`)
  }
}

export const revalidateTagsAfterDelete: CollectionAfterDeleteHook<
  Tag
> = async ({ doc }) => {
  // if page is published & their is no dynamic block directly revalidating the page

  revalidateTag('list-tags')
  revalidateTag('list-tags-with-blog-count')

  revalidateTag(`details-tags-${doc.slug}`)
  revalidateTag(`details-blogs-by-tags-${doc.slug}`)

  console.log(`list-tags at ${new Date().getTime()}`)
}
