import { ListType, Tag } from '@payload-types'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import { Skeleton } from '@/components/common/Skeleton'

interface TagsType extends Tag {
  count: number
}

const TagsList = ({
  tags,
  title,
  link,
  isPending,
}: {
  tags?: TagsType[]
  title?: string
  link: ListType['tag-link']
  isPending?: boolean
}) => {
  const slug = link && typeof link !== 'string' ? link.path! : ''
  const slicedSlug = slug ? slug.split('[')[0] : ''

  const tagsList = tags
    ? tags.map(details => {
        const image =
          typeof details.tagImage !== 'string'
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

      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {tagsList.length > 0
          ? tagsList.map(tag => (
              <Link
                href={`${slicedSlug}${tag.slug}`}
                className='group block cursor-pointer'
                key={tag.title}>
                <Avatar className='size-40 rounded'>
                  {tag.image && (
                    <AvatarImage
                      src={tag.image.url}
                      className='h-full w-full animate-image-blur object-contain'
                    />
                  )}

                  <AvatarFallback className='rounded' />
                </Avatar>

                <p
                  title={tag?.title || ''}
                  className='mt-4 inline-block w-full overflow-x-hidden text-ellipsis text-nowrap text-lg font-semibold transition-colors hover:text-primary'>
                  {tag.title}
                </p>
                <p className='line-clamp-3 text-secondary'>Posts {tag.count}</p>
              </Link>
            ))
          : []}
      </div>
    </section>
  )
}

export default TagsList
