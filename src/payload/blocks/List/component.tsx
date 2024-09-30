'use client'

import { Params } from '../types'
import { ListType } from '@payload-types'
import React from 'react'

import { trpc } from '@/trpc/client'

import AuthorsList from './components/AuthorsList'
import BlogsList from './components/BlogsList'
import TagsList from './components/TagsList'

interface ListProps extends ListType {
  params: Params
}

const List: React.FC<ListProps> = ({ params, ...block }) => {
  switch (block?.collectionSlug) {
    case 'blogs': {
      const { data: blogs, isPending } = trpc.blog.getAllBlogs.useQuery()

      return (
        <BlogsList blogs={blogs} title={block['title']} isPending={isPending} />
      )
    }

    case 'tags': {
      const { data: tags, isPending } = trpc.tag.getAllTags.useQuery()

      return (
        <TagsList
          tags={tags}
          title={block?.title || ''}
          isPending={isPending}
        />
      )
    }

    case 'users': {
      const { data: authors, isPending } =
        trpc.author.getAllAuthorsWithCount.useQuery()

      return (
        <AuthorsList authors={authors} block={block} isPending={isPending} />
      )
    }
  }
}

export default List
