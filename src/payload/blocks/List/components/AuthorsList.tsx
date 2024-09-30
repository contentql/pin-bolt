import { ListType, User } from '@payload-types'

import { Skeleton } from '@/components/common/Skeleton'
import { useMetadata } from '@/utils/metadataContext'

import AuthorCard from './AuthorCard'

interface AuthorsListProps {
  authors?: User[]
  block: ListType
  isPending?: boolean
}

const AuthorsList: React.FC<AuthorsListProps> = ({
  authors,
  block,
  isPending,
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
        {authors
          ? authors.map((author, index) => (
              <AuthorCard key={index} author={author} authorLink={authorLink} />
            ))
          : []}
      </div>
    </section>
  )
}

export default AuthorsList
