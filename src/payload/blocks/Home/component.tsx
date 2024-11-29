import { Params } from '../types'
import { HomeType } from '@payload-types'
import Image from 'next/image'

interface HomeProps extends HomeType {
  params: Params
}

const Home: React.FC<HomeProps> = ({ params, ...block }) => {
  const imageURL =
    typeof block.image !== 'object'
      ? undefined
      : {
          url: block.image?.url!,
          alt: block.image.alt || 'Hero section image',
        }

  return (
    <section className='flex flex-col-reverse items-center justify-between gap-6 px-0 md:flex-row'>
      <div className='max-w-lg space-y-3 text-balance'>
        <h1 className='text-2xl font-semibold md:text-5xl'>{block.heading}</h1>
        <p className='text-secondary md:text-xl'>{block?.subHeading}</p>
      </div>

      <div className='relative aspect-square w-full max-w-lg overflow-hidden rounded bg-secondary'>
        {imageURL && (
          <Image
            src={imageURL.url}
            className='h-full w-full animate-image-blur object-cover object-center'
            fill
            sizes='900px'
            alt={imageURL.alt}
          />
        )}
      </div>
    </section>
  )
}

export default Home
