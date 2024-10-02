import { Page, User } from '@payload-types'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'

type LinkType = (string | null) | Page

type AuthorCardType = {
  author: User
  authorLink?: LinkType
}

const AuthorCard = ({ author, authorLink }: AuthorCardType) => {
  const slug =
    authorLink && typeof authorLink !== 'string' ? authorLink.path! : ''
  const slicedSlug = slug ? slug.split('[')[0] : ''

  const authorDetails = {
    image:
      typeof author.imageUrl !== 'string'
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
      <Avatar className='aspect-[9/16] h-full max-h-80 w-full rounded'>
        {authorDetails.image && (
          <AvatarImage
            src={authorDetails.image.url}
            className='h-full w-full animate-image-blur transition-transform hover:scale-110'
          />
        )}

        <AvatarFallback className='rounded' />
      </Avatar>

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
