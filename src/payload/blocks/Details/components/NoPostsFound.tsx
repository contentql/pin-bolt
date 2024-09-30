import Image from 'next/image'

const NoPostsFound = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='relative size-72'>
        <Image
          src={'/images/no-posts.png'}
          className='h-full w-full object-contain'
          fill
          alt='no posts found image'
        />
      </div>

      <p className='z-10 -mt-16 ml-4 text-lg font-semibold'>No Posts Found!</p>
    </div>
  )
}

export default NoPostsFound
