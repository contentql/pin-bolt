import configPromise from '@payload-config'
import { Tag } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { z } from 'zod'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayloadHMR({ config: configPromise })

export const tagRouter = router({
  getBlogs: publicProcedure
    .input(
      z.object({
        tagSlug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { tagSlug } = input

        const { docs: tagData } = await payload.find({
          collection: 'tags',
          where: {
            slug: {
              equals: tagSlug,
            },
          },
        })

        const { docs: blogsData } = await payload.find({
          collection: 'blogs',
          where: {
            'tags.value': {
              contains: tagData?.at(0)?.id,
            },
          },
        })

        return { blogsData, tagData }
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),

  getAllTags: publicProcedure
    .input(
      z.object({
        cursor: z.number().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { cursor = 1, limit = 10 } = input // Default page to 1 if not provided

      try {
        const { docs: allTags, totalDocs } = await payload.find({
          collection: 'tags',
          draft: false,
          limit: limit,
          page: cursor,
        })

        const { docs: allBlogs } = await payload.find({
          collection: 'blogs',
        })

        const hasNextPage = totalDocs > cursor * limit

        return {
          docs: allTags.map(tag => ({
            ...tag,
            count: allBlogs.filter(blog => {
              const blogTags = blog.tags

              return blogTags?.find(
                blogTag => (blogTag.value as Tag).id === tag.id,
              )
            }).length,
          })),
          nextCursor: hasNextPage ? cursor + 1 : undefined,
        }
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),
  getTagBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const { slug } = input
      try {
        const { docs: tag } = await payload.find({
          collection: 'tags',
          where: {
            slug: {
              equals: slug,
            },
          },
        })
        return tag?.at(0)
      } catch (error) {}
    }),
})
