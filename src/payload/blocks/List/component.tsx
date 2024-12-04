'use client'

import { Params } from '../types'
import { ListType } from '@payload-types'
import dynamic from 'next/dynamic'
import React from 'react'

import { Skeleton } from '@/components/common/Skeleton'
import { trpc } from '@/trpc/client'

import BlogCardLoading from './components/BlogCardLoading'

// import AuthorsList from './components/AuthorsList';
// import BlogsList from './components/BlogsList';
// import TagsList from './components/TagsList';

interface ListProps extends ListType {
  params: Params
}

const BlogsList = dynamic(() => import('./components/BlogsList'), {
  ssr: false,
  loading: () => (
    <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {[1, 2, 3].map(i => (
        <BlogCardLoading key={i} />
      ))}
    </div>
  ),
})

const TagsList = dynamic(() => import('./components/TagsList'), {
  ssr: false,
  loading: () => (
    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
      {[1, 2, 3, 4].map(i => (
        <div key={i}>
          <Skeleton className='size-40 rounded' />
          <Skeleton className='mt-4 h-8 w-[80%]' />
        </div>
      ))}
    </div>
  ),
})

const AuthorsList = dynamic(() => import('./components/AuthorsList'), {
  ssr: false,
  loading: () => (
    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
      {[1, 2, 3].map(i => (
        <div key={i}>
          <Skeleton className='aspect-[9/16] h-full max-h-80 w-full rounded' />
          <Skeleton className='mt-4 h-8 w-[80%]' />
        </div>
      ))}
    </div>
  ),
})

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
