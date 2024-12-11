'use client'

import { Blog, Page } from '@payload-types'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import { getInitials } from '@/utils/getInitials'

import AuthorPopover from './AuthorPopover'

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

type LinkType = (number | null) | Page

type BlogCardType = {
  blog: Blog
  blogLink?: LinkType
  tagLink?: LinkType
  authorLink?: LinkType
}

const BlogCard = ({ blog, blogLink, tagLink, authorLink }: BlogCardType) => {
  const imageURL =
    typeof blog.blogImage === 'object'
      ? {
          src: blog.blogImage?.url!,
          alt: `${blog.blogImage.alt} `,
        }
      : undefined

  const blogSlug =
    blogLink && typeof blogLink === 'object' ? blogLink.path! : ''
  const slicedBlogSlug = blogSlug ? blogSlug.split('[')[0] : ''

  const tags = blog.tags
    ? blog.tags.map(({ value }) => {
        if (typeof value === 'object') {
          return {
            title: value.title,
            color: value.color || 'purple',
            slug: value.slug!,
          }
        }
      })
    : []

  const userDetails = blog.author
    ? blog.author.map(({ value }) => {
        if (typeof value === 'object') {
          const {
            displayName,
            username,
            imageUrl,
            bio = '',
            socialLinks = [],
          } = value

          const url =
            imageUrl && typeof imageUrl === 'object'
              ? {
                  src: imageUrl.sizes?.thumbnail?.url!,
                  alt: `${imageURL?.alt}`,
                }
              : undefined

          return {
            name: displayName || username,
            url,
            bio,
            socialLinks,
            slug: username!,
          }
        }

        return null
      })
    : []

  return (
    <div className='block space-y-4'>
      <Link
        href={`${slicedBlogSlug}${blog.slug}`}
        tabIndex={-1}
        className='relative block aspect-video w-full cursor-pointer overflow-hidden rounded bg-secondary outline-none'>
        {imageURL && (
          <Image
            src={imageURL.src}
            fill
            alt={imageURL.alt}
            sizes='700px'
            className='animate-image-blur object-cover transition-transform duration-500 hover:scale-110'
          />
        )}
      </Link>

      <div className='flex flex-col md:self-center'>
        <div className='mb-2 flex w-full items-center justify-between gap-8'>
          <div className='flex gap-4'>
            {tags
              .filter(value => Boolean(value))
              .map((details, index) => {
                if (!details) {
                  return null
                }

                const tagSlug =
                  tagLink && typeof tagLink === 'object' ? tagLink.path! : ''
                const slicedTagSlug = tagSlug ? tagSlug.split('[')[0] : ''

                return (
                  <Link
                    href={`${slicedTagSlug}${details.slug}`}
                    className={`text-xs font-bold uppercase ${details.color}-tag`}
                    key={index}>
                    {details.title}
                  </Link>
                )
              })}
          </div>

          <time className='text-xs text-secondary'>
            {format(blog.createdAt, 'LLL d, yyyy')}
          </time>
        </div>

        <Link
          href={`${slicedBlogSlug}${blog.slug}`}
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

              const userSlug =
                authorLink && typeof authorLink === 'object'
                  ? authorLink.path!
                  : ''
              const slicedUserSlug = userSlug ? userSlug.split('[')[0] : ''

              const initials = getInitials(user.name || '')

              return (
                <AuthorPopover
                  user={user}
                  href={`${slicedUserSlug}${user.slug}`}
                  key={`${slicedUserSlug}${user.slug}`}
                  initials={initials}>
                  <Avatar
                    key={user.name}
                    role='button'
                    className='-ml-2 cursor-pointer border-2 border-background'>
                    <AvatarImage src={user.url?.src} alt={`${user.name}-pic`} />
                    <AvatarFallback className='text-sm'>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </AuthorPopover>
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
