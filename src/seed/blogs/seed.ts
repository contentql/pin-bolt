import configPromise from '@payload-config'
import { Blog } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { getRandomInt } from '@/utils/getRandomInt'

import { BlogDataType, blogsData, blogsImagesData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<(string | Blog)[]> => {
  try {
    const { docs: tags, totalDocs: totalTags } = await payload.find({
      collection: 'tags',
    })

    const { docs: authors, totalDocs: totalAuthors } = await payload.find({
      collection: 'users',
    })

    const imagesResult = await Promise.allSettled(
      blogsImagesData.map(blogImageData =>
        payload.create({
          collection: 'media',
          data: {
            alt: blogImageData.alt,
          },
          filePath: blogImageData.filePath,
        }),
      ),
    )

    const formattedImagesResult = imagesResult
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(result => typeof result !== 'string')

    const formattedBlogsData: BlogDataType[] = blogsData.map(blogData => {
      const tagId = tags.at(getRandomInt(0, totalTags - 1))?.id
      const authorId = authors.at(getRandomInt(0, totalAuthors - 1))?.id
      const blogImageId = formattedImagesResult.at(
        getRandomInt(0, formattedImagesResult.length - 1),
      )?.id

      return {
        ...blogData,
        blogImage: blogImageId!,
        author: [
          {
            relationTo: 'users',
            value: authorId!,
          },
        ],
        tags: [
          {
            relationTo: 'tags',
            value: tagId!,
          },
        ],
      }
    })

    const results = await Promise.allSettled(
      formattedBlogsData.map(blogData =>
        payload.create({
          collection: 'blogs',
          data: blogData,
        }),
      ),
    )

    const formattedResults = results.map(result =>
      result.status === 'fulfilled'
        ? result.value
        : `Failed to seed: ${result.reason}`,
    )

    const errors = formattedResults.filter(result => typeof result === 'string')

    if (errors.length > 0) {
      throw new Error(
        `Seeding failed with the following errors:\n${errors.join('\n')}`,
      )
    }

    return formattedResults
  } catch (error) {
    throw error
  }
}

export default seed
