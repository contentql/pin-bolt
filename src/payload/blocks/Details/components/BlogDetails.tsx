'use client'

import AuthorPopover from '../../List/components/AuthorPopover'
import ShareList from '../../common/ShareList'
import { Blog } from '@payload-types'
import { payloadSlateToHtmlConfig, slateToHtml } from '@slate-serializers/html'
import { format } from 'date-fns'
import { Element } from 'domhandler'
import DOMPurify from 'isomorphic-dompurify'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import { getInitials } from '@/utils/getInitials'
import { useMetadata } from '@/utils/metadataContext'

interface BlogDetailsProps {
  blog: Blog
}

const readTime = (content: string) => {
  const contentLength = content.toString().split('').length
  const time = Math.ceil(contentLength / 300)

  return time
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blog }) => {
  const router = useRouter()
  const { redirectionLinks } = useMetadata()

  const html = slateToHtml(blog?.content || [], {
    ...payloadSlateToHtmlConfig,
    markMap: {
      ...payloadSlateToHtmlConfig.markMap,
      mark: ['mark'],
      kbd: ['kbd'],
      iframe: ['iframe'],
      pre: ['pre'],
      strong: ['strong'],
    },
    markTransforms: {
      'custom-iframe': ({ node }) => {
        return new Element('iframe', {
          src: node.text,
        })
      },
    },
    elementTransforms: {
      ...payloadSlateToHtmlConfig.elementTransforms,
      upload: ({ node }) => {
        // for video returning video element
        if (node && node?.value) {
          const mimeType = node?.value?.mimeType ?? ''
          if (mimeType.includes('video')) {
            return new Element('video', {
              src: node?.value?.url,
              controls: 'true',
            })
          }
        }

        return payloadSlateToHtmlConfig.elementTransforms.upload({ node })
      },
      link: ({ node, children = [] }) => {
        const attrs: { [key: string]: string } = {}
        if (node.linkType) {
          attrs['data-link-type'] = node.linkType
        }
        if (node.newTab) {
          attrs.target = '_blank'
        }

        attrs['data-disable-nprogress'] = 'true'

        return new Element(
          'a',
          Object.assign(
            {
              href: node.url,
            },
            attrs,
          ),
          children,
        )
      },
    },
  })

  const purifiedHtml = DOMPurify.sanitize(html, {
    ADD_ATTR: ['target'], // Allow the "target" attribute
    ADD_TAGS: ['iframe'], // You can also add other tags if needed (optional)
  })

  const imageURL =
    typeof blog?.blogImage === 'object'
      ? { url: blog?.blogImage?.url!, alt: blog?.blogImage?.alt }
      : { url: '', alt: '' }

  const tags = blog.tags
    ? blog.tags.map(({ value }) => {
        if (typeof value === 'object') {
          return {
            title: value.title,
            color: value.color ?? 'purple',
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

  const tagLink = redirectionLinks ? redirectionLinks.tagLink : undefined

  const authorLink = redirectionLinks ? redirectionLinks.authorLink : undefined

  const userSlug =
    authorLink?.value && typeof authorLink.value === 'object'
      ? authorLink.value.path!
      : ''
  const slicedUserSlug = userSlug ? userSlug.split('[')[0] : ''

  return (
    <>
      <section className='grid w-full gap-16 lg:grid-cols-[1fr_minmax(auto,18rem)]'>
        <article className='prose-headings:font prose prose-purple w-full overflow-x-hidden dark:prose-invert lg:prose-xl prose-headings:font-semibold prose-a:text-primary prose-a:no-underline prose-a:after:content-["↗"] hover:prose-a:text-primary/90 hover:prose-a:underline prose-blockquote:border-primary prose-blockquote:bg-primary/10 prose-blockquote:py-4 prose-img:w-full prose-img:rounded prose-video:w-full dark:prose-pre:bg-primary/10 [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded'>
          <span
            className='not-prose cursor-pointer text-sm text-secondary'
            onClick={() => router.back()}>
            {'<-'} Go Back
          </span>

          <div className='not-prose mb-4 mt-6 flex gap-4'>
            {tags
              .filter(value => Boolean(value))
              .map((details, index) => {
                if (!details) {
                  return null
                }

                const tagSlug =
                  tagLink?.value && typeof tagLink.value === 'object'
                    ? tagLink.value.path!
                    : ''
                const slicedTagSlug = tagSlug ? tagSlug.split('[')[0] : ''

                return (
                  <Link
                    href={`${slicedTagSlug}${details.slug}`}
                    className={`text-sm font-bold uppercase ${details.color}-tag`}
                    key={index}>
                    {details.title}
                  </Link>
                )
              })}
          </div>

          <h1 className='not-prose mb-4 text-3xl font-semibold lg:text-5xl lg:leading-[3.5rem]'>
            {blog.title}
          </h1>

          {/* author details */}
          <div className='not-prose mb-5 flex items-center gap-2 lg:hidden'>
            {userDetails
              .filter(details => Boolean(details))
              .map(user => {
                if (!user) {
                  return null
                }

                const initials = getInitials(user.name || '')

                return (
                  <AuthorPopover
                    user={user}
                    offset={0}
                    initials={initials}
                    href={`${slicedUserSlug}${user.slug}`}
                    key={`${slicedUserSlug}${user.slug}`}>
                    <Avatar key={user.name}>
                      <AvatarImage src={user.url?.src} />
                      <AvatarFallback className='text-sm'>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </AuthorPopover>
                )
              })}
          </div>

          {/* blog published, read-time details */}
          <div className='not-prose flex w-full justify-between text-sm'>
            <span className='flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-clock-2'>
                <circle cx='12' cy='12' r='10' />
                <polyline points='12 6 12 12 16 10' />
              </svg>
              {`${readTime(html)} min read`}
            </span>

            <time>{format(blog.createdAt, 'LLL d, yyyy')}</time>
          </div>

          <div className='not-prose relative mb-16 mt-8 aspect-video max-h-[30rem] w-full overflow-hidden rounded'>
            <Image
              src={imageURL.url}
              alt={imageURL.alt || `${blog.title} cover pic`}
              fill
              className='h-full w-full animate-image-blur bg-secondary object-cover'
            />
          </div>

          <div dangerouslySetInnerHTML={{ __html: purifiedHtml }} />

          <div className='not-prose mt-8 flex items-center justify-end gap-6 lg:hidden'>
            <p className='text-secondary'>Share: </p>

            <ShareList />
          </div>
        </article>

        <div className='mt-56 hidden space-y-10 lg:block'>
          <div className='sticky top-24 min-h-10'>
            <p className='mb-4 text-xs text-secondary'>POSTED BY</p>

            {userDetails
              .filter(details => Boolean(details))
              .map(user => {
                if (!user) {
                  return null
                }

                const initials = getInitials(user.name || '')

                return (
                  <AuthorPopover
                    user={user}
                    offset={0}
                    initials={initials}
                    href={`${slicedUserSlug}${user.slug}`}
                    key={`${slicedUserSlug}${user.slug}`}>
                    <div className='mb-4 flex w-full cursor-pointer items-center gap-3'>
                      <Avatar>
                        <AvatarImage
                          src={user.url?.src}
                          alt={`${user.name}-pic`}
                        />
                        <AvatarFallback className='text-sm'>
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <p>{user.name}</p>
                    </div>
                  </AuthorPopover>
                )
              })}

            <div className='mt-10 flex items-center justify-between'>
              <p className='text-secondary'>Share: </p>

              <ShareList />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogDetails
