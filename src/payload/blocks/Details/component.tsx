'use client'

import { Params } from '../types'
import { Blog, DetailsType } from '@payload-types'
import { notFound } from 'next/navigation'

import { trpc } from '@/trpc/client'

import AuthorDetails from './components/AuthorDetails'
import BlogDetails from './components/BlogDetails'
import TagDetails from './components/TagDetails'

interface DetailsProps extends DetailsType {
  params: Params
}

const Details: React.FC<DetailsProps> = ({ params, ...block }) => {
  switch (block?.collectionSlug) {
    case 'blogs': {
      const { data: blog } = trpc.blog.getBlogBySlug.useQuery({
        slug: params?.route.at(-1),
      })

      console.log({ blog }, params?.route.at(-1))

      if (blog) {
        return <BlogDetails blog={blog as Blog} />
      }

      return null
    }

    case 'tags': {
      const { data: blogs } = trpc.tag.getBlogs.useQuery({
        tagSlug: params?.route.at(-1)!,
      })
      return (
        <TagDetails
          blogs={blogs?.blogsData as Blog[]}
          tagDetails={blogs?.tagData?.at(0)}
        />
      )
    }

    case 'users': {
      const {
        data: author,
        isPending,
        isFetching,
      } = trpc.author.getAuthorByName.useQuery({
        authorName: params?.route.at(-1)!,
      })
      const { data: authorBlogs } = trpc.author.getBlogsByAuthorName.useQuery(
        {
          authorName: params?.route.at(-1)!,
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
        return <p>Loading Author details...</p>
      }

      return (
        <AuthorDetails
          author={author as any}
          blogsData={authorBlogs}
          block={block}
        />
      )
    }
  }
}

export default Details
