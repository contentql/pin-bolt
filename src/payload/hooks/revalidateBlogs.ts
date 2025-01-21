import { Blog } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateBlogs: CollectionAfterChangeHook<Blog> = async ({
  doc,
}) => {
  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published') {
    revalidateTag('list-blogs')
    revalidateTag('list-tags-with-blog-count')
    revalidateTag(`details-blogs-${doc?.slug}`)

    console.log(
      `list-blogs, details-blogs-${doc?.slug}, list-tags-with-blog-count   at ${new Date().getTime()}`,
    )
  }
}
