import { Params } from '../types'
import configPromise from '@payload-config'
import { DetailsType } from '@payload-types'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import AuthorDetails from './components/AuthorDetails'
import BlogDetails from './components/BlogDetails'
import TagDetails from './components/TagDetails'

interface DetailsProps extends DetailsType {
  params: Params
}

const Details: React.FC<DetailsProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: configPromise,
  })

  switch (block?.collectionSlug) {
    case 'blogs': {
      const slug = params?.route?.at(-1) ?? ''

      const { docs } = await payload.find({
        collection: 'blogs',
        draft: false,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const blog = docs.at(0)

      // if blog not found showing 404
      if (!blog) {
        return notFound()
      }

      return <BlogDetails blog={blog} />
    }

    case 'tags': {
      const slug = params?.route?.at(-1) ?? ''

      const { docs: tagDocs } = await payload.find({
        collection: 'tags',
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const tag = tagDocs?.[0]

      // if tag not found showing 404
      if (!tag) {
        return notFound()
      }

      const { docs: blogsData } = await payload.find({
        collection: 'blogs',
        where: {
          'tags.value': {
            contains: tag.id,
          },
        },
      })

      return <TagDetails blogs={blogsData} tagDetails={tag} />
    }

    case 'users': {
      const authorName = params?.route?.at(-1) ?? ''
      const { docs: authorDocs } = await payload.find({
        collection: 'users',
        where: {
          username: {
            equals: authorName,
          },
        },
      })

      const author = authorDocs?.[0]

      if (!author) {
        return notFound()
      }

      const { docs: blogs } = await payload.find({
        collection: 'blogs',
        draft: false,
        where: {
          'author.value': {
            equals: author.id,
          },
        },
      })

      if (typeof author === 'object') {
        return <AuthorDetails author={author} blogsData={blogs} />
      }
    }
  }
}

export default Details
