import configPromise from '@payload-config'
import { Tag } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { getRandomInt } from '@/utils/getRandomInt'

import { TagDataType, tagsData, tagsImagesData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<(string | Tag)[]> => {
  try {
    const imagesResult = await Promise.allSettled(
      tagsImagesData.map(tagImageData =>
        payload.create({
          collection: 'media',
          data: {
            alt: tagImageData.alt,
          },
          filePath: tagImageData.filePath,
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

    const formattedTagsData: TagDataType[] = tagsData.map(tagData => {
      const tagImageId = formattedImagesResult.at(
        getRandomInt(0, formattedImagesResult.length - 1),
      )?.id

      return {
        ...tagData,
        tagImage: tagImageId!,
      }
    })

    const results = await Promise.allSettled(
      formattedTagsData.map(tagData =>
        payload.create({
          collection: 'tags',
          data: tagData,
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
