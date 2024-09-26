import { ListType, User } from '@payload-types'

interface AuthorsListProps {
  authors?: User[]
  block: ListType
}

const AuthorsList: React.FC<AuthorsListProps> = ({ authors, block }) => {
  console.log({ authors })

  const list = authors
    ? authors.map(details => {
        const image =
          typeof details.imageUrl !== 'string'
            ? {
                url: details.imageUrl?.url!,
                alt: details.imageUrl?.alt,
              }
            : undefined

        return {
          name: details.displayName || details.username,
          image,
          bio: 'Hello this is a sample bio of me',
          socialLinks: details.socialLinks,
        }
      })
    : []

  return (
    <section className='space-y-4'>
      <p className='font-semibold'>{block?.title}</p>

      {/* <div className='grid md:grid-cols-2 lg:grid-cols-3'>
        {blogs.map(blog => (
          <BlogCard blog={blog} key={blog.id} link={block?.link} />
        ))}
      </div> */}
    </section>
  )
}

export default AuthorsList
