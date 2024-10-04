import configPromise from '@payload-config'
import { Tag, User } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'

import { blogListData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async ({
  spinner,
  tags,
  authors,
}: {
  spinner: Ora
  tags: Tag[]
  authors: User[]
}) => {
  spinner.start(`Started creating blogs...`)

  try {
    for await (const blog of blogListData) {
      const {
        alt,
        imageURL,
        authorsList,
        content,
        description,
        slug,
        title,
        tagsList,
      } = blog

      const image = await payload.create({
        collection: 'media',
        data: {
          alt,
        },
        filePath: imageURL,
      })

      const filteredAuthors = authorsList
        .map(authorSlug => {
          const sameAuthor = authors.find(
            author => author.username === authorSlug,
          )

          if (sameAuthor) {
            return {
              relationTo: 'users',
              value: sameAuthor.id,
            }
          }
        })
        .filter(
          (author): author is { relationTo: 'users'; value: string } =>
            !!author,
        )

      const filteredTags = tagsList
        .map(tagSlug => {
          const sameTag = tags.find(tag => tag.slug === tagSlug)

          if (sameTag) {
            return {
              relationTo: 'tags',
              value: sameTag.id,
            }
          }
        })
        .filter((tag): tag is { relationTo: 'tags'; value: string } => !!tag)

      await payload.create({
        collection: 'blogs',
        data: {
          blogImage: image.id,
          content,
          description,
          slug,
          title,
          author: filteredAuthors,
          tags: filteredTags,
          _status: 'published',
        },
      })
    }

    spinner.succeed(`Successfully created blogs...`)
  } catch (error) {
    spinner.fail(`Failed creating blogs...`)
    throw error
  }
}

export default seed
