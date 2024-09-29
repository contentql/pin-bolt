import BlogsList from '../../List/components/BlogsList'
import { Blog, DetailsType, Tag } from '@payload-types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'

import NoPostsFound from './NoPostsFound'

interface TagDetailsProps {
  tagDetails: Tag
  blogs?: Blog[]
  block: DetailsType
}
const TagDetails: React.FC<TagDetailsProps> = ({
  tagDetails,
  blogs,
  block,
}) => {
  const tag = {
    image:
      typeof tagDetails.tagImage !== 'string'
        ? {
            url: tagDetails.tagImage?.url!,
            alt: tagDetails.tagImage?.alt || `${tagDetails.title} tag image`,
          }
        : undefined,
    name: tagDetails.title,
    description: tagDetails.description,
  }

  return (
    <>
      <div className='flex flex-col gap-4 sm:flex-row'>
        <Avatar className='size-40 rounded'>
          {tag.image && (
            <AvatarImage
              src={tag.image.url}
              className='h-full w-full animate-image-blur object-contain'
            />
          )}

          <AvatarFallback className='rounded' />
        </Avatar>

        <div className='flex flex-col justify-center lg:col-span-3'>
          <h3 className='text-xl font-semibold'>{tag.name}</h3>
          <p className='max-w-[50ch] text-secondary'>{tag.description}</p>
        </div>
      </div>

      {blogs && blogs.length ? (
        <BlogsList
          title='Posts'
          blogs={blogs}
          authorLink={block['author-link']}
          blogLink={block['blog-link']}
          tagLink={block['tag-link']}
        />
      ) : (
        <NoPostsFound />
      )}
    </>
  )
}

export default TagDetails
