import { Page, User } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

type LinkType = (number | null) | Page

type AuthorCardType = {
  author: User
  authorLink?: LinkType
}

const AuthorCard = ({ author, authorLink }: AuthorCardType) => {
  const slug =
    authorLink && typeof authorLink === 'object' ? authorLink.path! : ''
  const slicedSlug = slug ? slug.split('[')[0] : ''

  const authorDetails = {
    image:
      typeof author.imageUrl === 'object'
        ? {
            url: author.imageUrl?.url!,
            alt: author.imageUrl?.alt,
          }
        : undefined,
    name: author.displayName || author.username,
    bio: author.bio || '',
    socialLinks: author.socialLinks,
    username: author.username!,
  }

  return (
    <Link
      href={`${slicedSlug}${authorDetails.username}`}
      className='group block cursor-pointer'
      key={authorDetails.username}>
      <div className='relative aspect-[9/16] h-full max-h-80 w-full overflow-hidden rounded bg-secondary'>
        {authorDetails.image && (
          <Image
            src={authorDetails.image.url}
            fill
            alt={authorDetails.name}
            className='h-full w-full animate-image-blur object-cover transition-transform hover:scale-110'
            sizes='800px'
          />
        )}
      </div>

      <p
        title={authorDetails?.name || ''}
        className='mt-4 inline-block w-full overflow-x-hidden text-ellipsis text-nowrap text-lg font-semibold transition-colors hover:text-primary'>
        {authorDetails.name}
      </p>
      <p className='line-clamp-3 text-secondary'>{authorDetails.bio}</p>
    </Link>
  )
}

export default AuthorCard
