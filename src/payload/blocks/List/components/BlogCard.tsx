import { Blog, ListType } from '@payload-types'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import { getInitials } from '@/utils/getInitials'

const formatAvatarName = (names: string[]): string => {
  if (names.length === 1) {
    return names[0]
  }

  const firstNameList = names.map(name => {
    if (name.includes('-')) {
      return name.split('-')[0]
    }

    return name.split(' ')[0]
  })

  if (firstNameList.length <= 2) {
    return firstNameList.join(' & ')
  }

  const nameList = firstNameList.slice(0, 2)

  return `${nameList.join(' & ')} & ${firstNameList.length - 2} Others`
}

const BlogCard = ({ blog, link }: { blog: Blog; link: ListType['link'] }) => {
  const imageURL =
    typeof blog.blogImage !== 'string'
      ? {
          src: blog.blogImage.sizes?.blogImageSize2?.url!,
          alt: `${blog.blogImage.alt} `,
        }
      : undefined

  const slug = link && typeof link !== 'string' ? link.path! : ''
  const slicedSlug = slug ? slug.split('[')[0] : ''

  const tags = blog.tags
    ? blog.tags.map(({ value }) => {
        if (typeof value !== 'string') {
          return {
            title: value.title,
            color: value.color || 'purple',
          }
        }
      })
    : []

  const userDetails = blog.author
    ? blog.author.map(({ value }) => {
        if (typeof value !== 'string') {
          const { displayName, username, imageUrl } = value

          const url =
            imageUrl && typeof imageUrl !== 'string'
              ? {
                  src: imageUrl.sizes?.thumbnail?.url!,
                  alt: `${imageURL?.alt}`,
                }
              : undefined

          return {
            name: displayName || username,
            url,
          }
        }

        return null
      })
    : []

  return (
    <div className='space-y-4'>
      <div className='relative aspect-video w-full overflow-hidden rounded bg-secondary'>
        {imageURL && (
          <Image
            src={imageURL.src}
            fill
            alt={imageURL.alt}
            className='object-cover'
          />
        )}
      </div>

      <div className='flex flex-col md:self-center'>
        <div className='mb-2 flex w-full items-center justify-between gap-8'>
          <div className='flex gap-1'>
            {tags
              .filter(value => Boolean(value))
              .map((details, index) => {
                if (!details) {
                  return null
                }

                return (
                  <span
                    className={`text-xs font-bold uppercase ${details.color}-tag`}
                    key={index}>
                    {details.title}
                  </span>
                )
              })}
          </div>

          <time className='text-xs text-secondary'>
            {format(blog.createdAt, 'LLL d')}
          </time>
        </div>

        <Link
          href={`${slicedSlug}${blog.slug}`}
          className='line-clamp-2 text-lg font-semibold transition-colors hover:text-primary'
          title={blog.title}>
          {blog.title}
        </Link>

        <p className='line-clamp-3 text-secondary'>{blog.description}</p>

        <div className='ml-2 mt-2 flex items-center'>
          {userDetails
            .filter(details => Boolean(details))
            .map(user => {
              if (!user) {
                return null
              }

              const initials = getInitials(user.name || '')

              return (
                <Avatar
                  key={user.name}
                  className='-ml-2 border-2 border-background'>
                  <AvatarImage src={user.url?.src} />
                  <AvatarFallback className='text-sm'>
                    {initials}
                  </AvatarFallback>
                </Avatar>
              )
            })}

          <span className='ml-3 text-sm text-secondary'>
            {formatAvatarName(
              userDetails
                .filter(details => Boolean(details))
                .map(user => user?.name as string),
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
