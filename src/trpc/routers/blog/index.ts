import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { z } from 'zod'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayloadHMR({
  config: configPromise,
})

export const blogRouter = router({
  getAllBlogs: publicProcedure
    .input(
      z.object({
        cursor: z.number().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { cursor = 1, limit = 10 } = input // Default page to 1 if not provided

      try {
        const { docs, totalDocs } = await payload.find({
          collection: 'blogs',
          depth: 5,
          draft: false,
          limit,
          page: cursor,
        })

        const hasNextPage = totalDocs > cursor * limit

        return { docs, nextCursor: hasNextPage ? cursor + 1 : undefined }
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),

  getBlogBySlug: publicProcedure
    .input(
      z.object({
        slug: z.any(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { docs } = await payload.find({
          collection: 'blogs',
          draft: false,
          where: {
            slug: {
              equals: input.slug,
            },
          },
        })

        return docs.at(0)
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),

  getBlogsCount: publicProcedure.query(async () => {
    try {
      const { totalDocs } = await payload.count({
        collection: 'blogs',
      })

      return totalDocs
    } catch (error: any) {
      console.log(error)
      throw new Error(error.message)
    }
  }),
})
