'use client'

import { ListType, User } from '@payload-types'
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { TRPCClientErrorLike } from '@trpc/client'

import Button from '@/components/common/Button'
import { Skeleton } from '@/components/common/Skeleton'
import { authorRouter } from '@/trpc/routers/author'
import { useMetadata } from '@/utils/metadataContext'

import AuthorCard from './AuthorCard'

interface AuthorsListProps {
  authors?: User[]
  block: ListType
  isPending?: boolean
  fetchNextPage?: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      {
        pages: {
          docs: User[]
          nextCursor?: number | undefined
        }[]
        pageParams: (number | undefined)[]
      },
      TRPCClientErrorLike<typeof authorRouter>
    >
  >
  isFetchingNextPage?: boolean
  hasNextPage?: boolean
}

const AuthorsList: React.FC<AuthorsListProps> = ({
  authors,
  block,
  isPending,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const { redirectionLinks } = useMetadata()
  const authorLink = redirectionLinks?.authorLink

  return (
    <section className='space-y-4'>
      <p className='font-semibold'>{block?.title}</p>

      {isPending && (
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {[1, 2, 3].map(i => (
            <div key={i}>
              <Skeleton className='aspect-[9/16] h-full max-h-80 w-full rounded' />
              <Skeleton className='mt-4 h-8 w-[80%]' />
            </div>
          ))}
        </div>
      )}

      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {authors ? (
          <>
            {authors.map((author, index) => (
              <AuthorCard
                key={index}
                author={author}
                authorLink={authorLink?.value}
              />
            ))}

            <div className='mt-4 flex justify-center sm:col-span-2 lg:col-span-4'>
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

export default AuthorsList
