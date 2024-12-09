import { Params } from '../types'
import configPromise from '@payload-config'
import { ListType } from '@payload-types'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { getPayload } from 'payload'
import React from 'react'
import { data } from 'userdb'

import AuthorsList from './components/AuthorsList'
import BlogsList from './components/BlogsList'
import TagsList from './components/TagsList'

interface ListProps extends ListType {
  params: Params
}

const List: React.FC<ListProps> = async ({ params, ...block }) => {
  const currentHost = 'manoj'
  // Determine the DB configuration based on currentHost
  const dbConfig = data[currentHost] || {
    url: process.env.DATABASE_URI,
    secret: process.env.DATABASE_SECRET,
  }

  const dynamicConfig = {
    ...configPromise,
    db: sqliteAdapter({
      client: {
        url: dbConfig.url,
        authToken: dbConfig.secret,
      },
    }),
  }

  console.log({ dynamicConfig })
  console.log({ configPromise })

  const payload = await getPayload({ config: dynamicConfig })
  // const payload = await getPayload({
  //   config: configPromise,
  // })

  switch (block?.collectionSlug) {
    case 'blogs': {
      const { docs: blogs = [] } = await payload.find({
        collection: 'blogs',
        depth: 5,
        draft: false,
        limit: 1000,
      })

      return <BlogsList blogs={blogs} title={block['title']} />
    }

    case 'tags': {
      const { docs: tags = [] } = await payload.find({
        collection: 'tags',
        depth: 5,
        draft: false,
        limit: 1000,
      })

      return (
        <TagsList
          tags={tags.map(tag => ({ ...tag, count: 0 }))}
          title={block?.title || ''}
        />
      )
    }

    case 'users': {
      const { docs: authors = [] } = await payload.find({
        collection: 'users',
        where: {
          role: {
            equals: 'author',
          },
        },
        limit: 1000,
      })

      return (
        <AuthorsList
          authors={authors.map(author => ({ ...author, count: 0 }))}
          block={block}
        />
      )
    }
  }
}

export default List
