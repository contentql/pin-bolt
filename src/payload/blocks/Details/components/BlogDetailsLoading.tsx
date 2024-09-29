import { Skeleton } from '@/components/common/Skeleton'

const BlogDetailsLoading = () => {
  return (
    <div>
      <Skeleton className='mb-8 mt-6 h-10 w-[80%] max-w-[60ch]' />
      <Skeleton className='max-h-[30rem] min-h-96 max-w-[80ch]' />
      <Skeleton className='mt-16 h-8 w-[80%] max-w-[60ch]' />
      <Skeleton className='mt-2 h-8 w-[80%] max-w-[60ch]' />
      <Skeleton className='mt-2 h-8 w-[80%] max-w-[60ch]' />
    </div>
  )
}

export default BlogDetailsLoading
