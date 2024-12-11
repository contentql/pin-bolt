'use client'

import { Tag } from '@payload-types'
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { TRPCClientErrorLike } from '@trpc/client'
import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/common/Button'
import { Skeleton } from '@/components/common/Skeleton'
import { tagRouter } from '@/trpc/routers/tag'
import { useMetadata } from '@/utils/metadataContext'

interface TagsType extends Tag {
  count: number
}

type PropsType = {
  tags?: TagsType[]
  title?: string
  isPending?: boolean
  fetchNextPage?: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      {
        pages: {
          docs: TagsType[]
          nextCursor?: number | undefined
        }[]
        pageParams: (number | undefined)[]
      },
      TRPCClientErrorLike<typeof tagRouter>
    >
  >
  isFetchingNextPage?: boolean
  hasNextPage?: boolean
}

const TagsList = ({
  tags,
  title,
  isPending,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PropsType) => {
  const { redirectionLinks } = useMetadata()

  const link = redirectionLinks?.tagLink
  const slug =
    link?.value && typeof link.value === 'object' ? link.value.path! : ''
  const slicedSlug = slug ? slug.split('[')[0] : ''

  const tagsList = tags
    ? tags.map(details => {
        const image =
          typeof details.tagImage === 'object'
            ? {
                url: details.tagImage.url!,
                alt: details.tagImage.alt || `${details.title} tag image`,
              }
            : undefined

        return {
          image,
          title: details.title,
          count: details.count,
          slug: details.slug || '',
        }
      })
    : []

  return (
    <section className='space-y-4'>
      <p className='font-semibold'>{title}</p>

      {isPending && (
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {[1, 2, 3, 4].map(i => (
            <div key={i}>
              <Skeleton className='size-40 rounded' />
              <Skeleton className='mt-4 h-8 w-[80%]' />
            </div>
          ))}
        </div>
      )}

      <div className='grid grid-cols-2 gap-8 lg:grid-cols-4'>
        {tagsList.length > 0 ? (
          <>
            {tagsList.map(tag => (
              <Link
                href={`${slicedSlug}${tag.slug}`}
                className='group block cursor-pointer'
                key={tag.title}>
                <div className='relative size-24 overflow-hidden rounded sm:size-40'>
                  {tag.image && (
                    <Image
                      src={tag.image.url}
                      alt={tag.image.alt}
                      height={160}
                      width={160}
                      className='h-full w-full animate-image-blur'
                    />
                  )}
                </div>

                <p
                  title={tag?.title || ''}
                  className='mt-4 inline-block w-full overflow-x-hidden text-ellipsis text-nowrap text-lg font-semibold transition-colors hover:text-primary'>
                  {tag.title}
                </p>
                <p className='line-clamp-3 text-secondary'>Posts {tag.count}</p>
              </Link>
            ))}

            <div className='col-span-2 mt-4 flex justify-center lg:col-span-4'>
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
        ) : (
          []
        )}
      </div>
    </section>
  )
}

export default TagsList
