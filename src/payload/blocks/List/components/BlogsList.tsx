'use client'

import { Blog, ListType } from '@payload-types'
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { TRPCClientErrorLike } from '@trpc/client'

// This handles the error type from tRPC
import Button from '@/components/common/Button'
import { blogRouter } from '@/trpc/routers/blog'
import { useMetadata } from '@/utils/metadataContext'

import BlogCard from './BlogCard'
import BlogCardLoading from './BlogCardLoading'

interface BlogsListProps {
  blogs?: Blog[]
  title?: ListType['title']
  isPending?: boolean
  fetchNextPage?: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      {
        pages: {
          docs: Blog[]
          nextCursor?: number | undefined
        }[]
        pageParams: (number | undefined)[]
      },
      TRPCClientErrorLike<typeof blogRouter>
    >
  >
  isFetchingNextPage?: boolean
  hasNextPage?: boolean
}

const BlogsList: React.FC<BlogsListProps> = ({
  blogs,
  title,
  isPending,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const { redirectionLinks } = useMetadata()
  const authorLink = redirectionLinks?.authorLink
  const blogLink = redirectionLinks?.blogLink
  const tagLink = redirectionLinks?.tagLink

  return (
    <section className='space-y-4'>
      <p className='font-semibold'>{title}</p>

      {isPending && (
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3].map(i => (
            <BlogCardLoading key={i} />
          ))}
        </div>
      )}

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {blogs ? (
          <>
            {blogs.map(blog => (
              <BlogCard
                blog={blog}
                key={blog.id}
                authorLink={authorLink?.value}
                blogLink={blogLink?.value}
                tagLink={tagLink?.value}
              />
            ))}

            <div className='mt-4 flex justify-center md:col-span-2 lg:col-span-3'>
              {fetchNextPage && hasNextPage && !isPending && (
                <Button
                  size='sm'
                  disabled={isFetchingNextPage}
                  isLoading={isFetchingNextPage}
                  variant='outline'
                  onClick={() => fetchNextPage()}>
                  Load more
                </Button>
              )}
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

export default BlogsList
