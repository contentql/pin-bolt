import { ListType, User } from '@payload-types'

import AuthorCard from './AuthorCard'

interface AuthorsListProps {
  authors?: User[]
  block: ListType
}

const AuthorsList: React.FC<AuthorsListProps> = ({ authors, block }) => {
  return (
    <section className='space-y-4'>
      <p className='font-semibold'>{block?.title}</p>

      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {authors
          ? authors.map((author, index) => (
              <AuthorCard
                key={index}
                author={author}
                authorLink={block['author-link']}
              />
            ))
          : []}
      </div>
    </section>
  )
}

export default AuthorsList
