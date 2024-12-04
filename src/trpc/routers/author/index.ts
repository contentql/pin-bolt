import configPromise from '@payload-config'
import { Tag, User } from '@payload-types'
import { getPayload } from 'payload'
import { z } from 'zod'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({ config: configPromise })

export const authorRouter = router({
  getAllAuthors: publicProcedure.query(async () => {
    try {
      const { docs: authors } = await payload.find({
        collection: 'users',
        where: {
          role: {
            equals: 'author',
          },
        },
      })

      return authors
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }),

  getAllAuthorsWithCount: publicProcedure
    .input(
      z.object({
        cursor: z.number().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { cursor = 1, limit = 10 } = input // Default page to 1 if not provided

      try {
        const { docs: authors, totalDocs } = await payload.find({
          collection: 'users',
          where: {
            role: {
              equals: 'author',
            },
          },
          limit: limit,
          page: cursor,
        })

        const authorBlogCounts = await Promise.all(
          authors.map(async author => {
            const count = await payload.count({
              collection: 'blogs',
              where: {
                'author.value': {
                  equals: author.id,
                },
              },
            })
            return { ...author, ...count }
          }),
        )

        const hasNextPage = totalDocs > cursor * limit

        return {
          docs: authorBlogCounts,
          nextCursor: hasNextPage ? cursor + 1 : undefined,
        }
      } catch (error: any) {
        console.error(error)
        throw new Error(error.message)
      }
    }),

  getBlogsByAuthorName: publicProcedure
    .input(
      z.object({
        authorName: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { authorName } = input
      try {
        const { docs: blogs } = await payload.find({
          collection: 'blogs',
          draft: false, // Optionally set draft filter
        })

        const blogsRelatedWithAuthor = blogs.filter(blog =>
          blog.author?.find(
            blogAuthor => (blogAuthor.value as User).username === authorName,
          ),
        )

        return blogsRelatedWithAuthor
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),

  getAuthorByName: publicProcedure
    .input(
      z.object({
        authorName: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { authorName } = input
      try {
        const { docs: user } = await payload.find({
          collection: 'users',
          draft: false,
          where: {
            username: {
              equals: authorName,
            },
          },
        })

        return user?.at(0)
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),
  getAllTagsByAuthorName: publicProcedure
    .input(
      z.object({
        authorName: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { authorName } = input
      try {
        const { docs: user } = await payload.find({
          collection: 'users',
          draft: false,
          where: {
            username: {
              equals: authorName,
            },
          },
        })

        const { docs: blogsByAuthor } = await payload.find({
          collection: 'blogs',
          where: {
            'author.value': {
              equals: user.at(0)?.id,
            },
          },
        })
        const temp = blogsByAuthor?.flatMap(blog =>
          blog?.tags?.map(tag => ({
            title: (tag?.value as Tag)?.title,
            description: (tag?.value as Tag)?.description,
            slug: (tag?.value as Tag)?.slug,
            image: (tag?.value as Tag)?.tagImage,
          })),
        )
        const getUniqueKey = (tag: any) =>
          `${tag.title}-${tag.slug}-${tag.image}-${tag.description}`

        const uniqueTemp =
          temp &&
          Array.from(
            new Map(temp.map(tag => [getUniqueKey(tag), tag])).values(),
          )
        return uniqueTemp
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),
  getBlogsByAuthorNameAndTag: publicProcedure
    .input(
      z.object({
        authorName: z.string(),
        tagSlug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { authorName, tagSlug } = input
      try {
        const { docs: user, totalDocs } = await payload.find({
          collection: 'users',
          draft: false,
          where: {
            username: {
              equals: authorName,
            },
          },
        })

        const { docs: blogsByAuthor } = await payload.find({
          collection: 'blogs',
          where: {
            'author.value': {
              equals: user.at(0)?.id,
            },
          },
        })
        return {
          blogs: blogsByAuthor?.filter(blog =>
            blog?.tags?.some(tag => (tag?.value as Tag)?.slug === tagSlug),
          ),
          totalBlogs: totalDocs,
        }
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),
})
