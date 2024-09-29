import { Skeleton } from '@/components/common/Skeleton'

const BlogCardLoading = () => {
  return (
    <div>
      <Skeleton className='aspect-video w-full' />
      <Skeleton className='mt-6 h-8 w-[80%]' />
    </div>
  )
}

export default BlogCardLoading
