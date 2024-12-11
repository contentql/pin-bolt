import { DetailsType, Page } from '@payload-types'
import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidatePages: CollectionAfterChangeHook<Page> = async ({
  doc,
  req: { payload },
}) => {
  // checking for dynamic blocks present in page or not
  const dynamicBlock = doc?.layout?.find(
    block => block.blockType === 'Details' && block.collectionSlug,
  ) as DetailsType | undefined

  // if page is published & their is no dynamic block directly revalidating the page
  if (doc._status === 'published' && !dynamicBlock) {
    revalidateTag(`page-${doc?.path}`)
    console.log(`revalidated page-${doc?.path} at ${new Date().getTime()}`)
  }
  // else fetching the records of that dynamic-block
  else if (dynamicBlock) {
    const { collectionSlug } = dynamicBlock

    if (collectionSlug) {
      const { docs } = await payload.find({
        collection: collectionSlug,
        limit: 1000,
        select: {
          username: true,
          slug: true,
        },
      })

      if (docs.length > 0) {
        let basePath = doc?.path

        docs.forEach(doc => {
          let modifiedPath = basePath

          // replacing the [details] path with slug or username
          if ('username' in doc) {
            if (modifiedPath) {
              modifiedPath = modifiedPath.replace(/\[(.*?)\]/, doc.username)
            }
          } else {
            if (modifiedPath && doc.slug) {
              modifiedPath = modifiedPath.replace(/\[(.*?)\]/, doc.slug)
            }
          }

          if (modifiedPath) {
            revalidateTag(`page-${modifiedPath}`)
            console.log(
              `revalidated page-${modifiedPath} at ${new Date().getTime()}`,
            )
          }
        })
      }
    }
  }
}
