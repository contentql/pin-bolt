'use client'

import { Params } from '../types'
import { Blog, DetailsType } from '@payload-types'
import { notFound } from 'next/navigation'

import { trpc } from '@/trpc/client'

import AuthorDetails from './components/AuthorDetails'
import AuthorDetailsLoading from './components/AuthorDetailsLoading'
import BlogDetails from './components/BlogDetails'
import BlogDetailsLoading from './components/BlogDetailsLoading'
import TagDetails from './components/TagDetails'
import TagDetailsLoading from './components/TagDetailsLoading'

interface DetailsProps extends DetailsType {
  params: Params
}

const Details: React.FC<DetailsProps> = ({ params, ...block }) => {
  switch (block?.collectionSlug) {
    case 'blogs': {
      const {
        data: blog,
        isPending,
        isFetching,
      } = trpc.blog.getBlogBySlug.useQuery({
        slug: params?.route?.at(-1),
      })

      if (isPending) {
        return <BlogDetailsLoading />
      }

      // if blog not found showing 404
      if (!blog && !isFetching && !isPending) {
        return notFound()
      }

      if (blog) {
        return <BlogDetails blog={blog as Blog} />
      }

      return null
    }

    case 'tags': {
      const {
        data: blogs,
        isPending,
        isFetching,
      } = trpc.tag.getBlogsByTag.useQuery({
        tagSlug: params?.route?.at(-1)!,
      })

      const tagDetails = (blogs?.tagData || [])?.at(0)

      if (isPending) {
        return <TagDetailsLoading />
      }

      // if tag not found showing 404
      if (!tagDetails && !isFetching && !isPending) {
        return notFound()
      }

      if (tagDetails) {
        return <TagDetails blogs={blogs?.blogsData} tagDetails={tagDetails} />
      }
    }

    case 'users': {
      const { data: authorBlogs, isPending: blogsLoading } =
        trpc.author.getBlogsByAuthorName.useQuery({
          authorName: params?.route?.at(-1)!,
        })

      const author = Array.isArray(authorBlogs?.[0]?.author)
        ? authorBlogs?.[0]?.author.filter(({ value }) => {
            return (
              typeof value === 'object' &&
              value.username === params?.route?.at(-1)!
            )
          })[0]?.value
        : undefined

      if (blogsLoading) {
        return <AuthorDetailsLoading />
      }

      if (typeof author === 'object') {
        return (
          <AuthorDetails
            author={author}
            blogsData={authorBlogs}
            blogsLoading={blogsLoading}
          />
        )
      }
    }
  }
}

export default Details
