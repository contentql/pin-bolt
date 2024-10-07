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
        slug: params?.at(-1),
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
      } = trpc.tag.getBlogs.useQuery({
        tagSlug: params?.at(-1)!,
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
      const {
        data: author,
        isPending,
        isFetching,
      } = trpc.author.getAuthorByName.useQuery({
        authorName: params?.at(-1)!,
      })
      const { data: authorBlogs, isPending: blogsLoading } =
        trpc.author.getBlogsByAuthorName.useQuery(
          {
            authorName: params?.at(-1)!,
          },
          {
            enabled: !!author, // calling the blogs based on the author details
          },
        )

      // if author not found showing 404
      if (!author && !isFetching && !isPending) {
        return notFound()
      }

      if (isPending) {
        return <AuthorDetailsLoading />
      }

      if (author) {
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
