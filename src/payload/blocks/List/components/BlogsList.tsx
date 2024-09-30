import { Blog, ListType } from '@payload-types'

import { useMetadata } from '@/utils/metadataContext'

import BlogCard from './BlogCard'
import BlogCardLoading from './BlogCardLoading'

interface BlogsListProps {
  blogs?: Blog[]
  title?: ListType['title']
  isPending?: boolean
}

const BlogsList: React.FC<BlogsListProps> = ({ blogs, title, isPending }) => {
  const { redirectionLinks } = useMetadata()
  const authorLink = redirectionLinks?.authorLink
  const blogLink = redirectionLinks?.blogLink
  const tagLink = redirectionLinks?.tagLink

  return (
    <section className='space-y-4'>
      <p className='font-semibold'>{title}</p>

      {isPending && (
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {[1, 2, 3].map(i => (
            <BlogCardLoading key={i} />
          ))}
        </div>
      )}

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {blogs
          ? blogs.map(blog => (
              <BlogCard
                blog={blog}
                key={blog.id}
                authorLink={authorLink}
                blogLink={blogLink}
                tagLink={tagLink}
              />
            ))
          : null}
      </div>
    </section>
  )
}

export default BlogsList
