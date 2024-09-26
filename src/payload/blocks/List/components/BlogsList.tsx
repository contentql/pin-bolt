import { Blog, ListType } from '@payload-types'

import BlogCard from './BlogCard'

interface BlogsListProps {
  blogs?: Blog[]
  block: ListType
}
const BlogsList: React.FC<BlogsListProps> = ({ blogs, block }) => {
  if (!blogs) {
    return null
  }

  return (
    <section className='space-y-4'>
      <p className='font-semibold'>{block?.title}</p>

      <div className='grid md:grid-cols-2 lg:grid-cols-3'>
        {blogs.map(blog => (
          <BlogCard blog={blog} key={blog.id} link={block?.link} />
        ))}
      </div>
    </section>
  )
}

export default BlogsList
