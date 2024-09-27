import { Blog, ListType } from '@payload-types'

import BlogCard from './BlogCard'

interface BlogsListProps {
  blogs?: Blog[]
  authorLink: ListType['author-link']
  blogLink: ListType['blog-link']
  tagLink: ListType['tag-link']
  title?: ListType['title']
}

const BlogsList: React.FC<BlogsListProps> = ({
  blogs,
  authorLink,
  blogLink,
  tagLink,
  title,
}) => {
  if (!blogs) {
    return null
  }

  return (
    <section className='space-y-4'>
      <p className='font-semibold'>{title}</p>

      <div className='grid md:grid-cols-2 lg:grid-cols-3'>
        {blogs.map(blog => (
          <BlogCard
            blog={blog}
            key={blog.id}
            authorLink={authorLink}
            blogLink={blogLink}
            tagLink={tagLink}
          />
        ))}
      </div>
    </section>
  )
}

export default BlogsList
