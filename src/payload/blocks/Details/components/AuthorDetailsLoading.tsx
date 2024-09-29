import BlogCardLoading from '../../List/components/BlogCardLoading'

import { Skeleton } from '@/components/common/Skeleton'

const AuthorDetailsLoading = () => {
  return (
    <>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Skeleton className='aspect-[9/16] h-full max-h-80 w-full' />

        <div className='flex flex-col justify-center lg:col-span-3'>
          <Skeleton className='h-8 w-[80%] max-w-[20ch]' />
          <Skeleton className='mt-2 h-6 w-[80%] max-w-[40ch]' />
        </div>
      </div>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {[1, 2, 3].map(i => (
          <BlogCardLoading key={i} />
        ))}
      </div>
    </>
  )
}

export default AuthorDetailsLoading
