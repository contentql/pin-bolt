import configPromise from '@payload-config'
import { Tag } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { tagsData, tagsImagesData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  spinner.start(`Started uploading tags images...`)

  try {
    const tagImages: { id: number; name: string }[] = []
    const tagList: Tag[] = []

    // looping through images list uploading to media collection & pushing the result to tagImages array
    for await (const details of tagsImagesData) {
      const { alt, imageURL, name } = details

      try {
        const tagImage = await payload.create({
          collection: 'media',
          data: {
            alt,
          },
          filePath: imageURL,
        })

        tagImages.push({ id: tagImage.id, name })
      } catch (error) {
        spinner.fail(`Failed tp upload tags images...`)
        throw error
      }
    }
    spinner.succeed(`Completed uploading tag images...`)

    spinner.succeed(`Started creating tags...`)
    // lopping through authors creating authors with images and pushing the author details to usersList
    for await (const details of tagsData) {
      const imageId = tagImages.find(image => {
        return image.name === details.slug
      })

      try {
        const tag = await payload.create({
          collection: 'tags',
          data: {
            ...details,
            ...(imageId?.id ? { tagImage: imageId?.id } : {}),
            meta: {
              title: details.title,
              description: details.description,
              image: imageId?.id,
            },
          },
          overrideAccess: true,
        })

        tagList.push(tag)
      } catch (error) {
        spinner.fail(`Failed creating tags...`)
        throw error
      }
    }

    spinner.succeed(`Successfully created tags...`)
    return tagList
  } catch (error) {
    throw error
  }
}

export default seed
