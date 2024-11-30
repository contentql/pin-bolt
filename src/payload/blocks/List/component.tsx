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
      const {
        data,
        fetchNextPage,
        isPending,
        isFetchingNextPage,
        hasNextPage,
      } = trpc.blog.getPaginatedBlogs.useInfiniteQuery(
        { limit: 10 },
        {
          getNextPageParam: lastPage => lastPage.nextCursor,
        },
      )

      const docsList = data?.pages ? data?.pages?.map(({ docs }) => docs) : []
      const flattedList = docsList.flat()

      return (
        <BlogsList
          blogs={flattedList}
          title={block['title']}
          isPending={isPending}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )
    }

    case 'tags': {
      const {
        data,
        fetchNextPage,
        isPending,
        isFetchingNextPage,
        hasNextPage,
      } = trpc.tag.getPaginatedTags.useInfiniteQuery(
        { limit: 10 },
        {
          getNextPageParam: lastPage => lastPage.nextCursor,
        },
      )

      const docsList = data?.pages ? data?.pages?.map(({ docs }) => docs) : []
      const flattedList = docsList.flat()

      return (
        <TagsList
          tags={flattedList}
          title={block?.title || ''}
          isPending={isPending}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      )
    }

    case 'users': {
      const {
        data,
        fetchNextPage,
        isPending,
        isFetchingNextPage,
        hasNextPage,
      } = trpc.author.getAllAuthorsWithCount.useInfiniteQuery(
        { limit: 10 },
        {
          getNextPageParam: lastPage => lastPage.nextCursor,
        },
      )

      const docsList = data?.pages ? data?.pages?.map(({ docs }) => docs) : []
      const flattedList = docsList.flat()

      return (
        <AuthorsList
          authors={flattedList}
          block={block}
          isPending={isPending}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      )
    }
  }
}

export default List
