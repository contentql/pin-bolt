import Image from 'next/image'
import Link from 'next/link'

const Branding = () => {
  return (
    <Link
      data-disable-nprogress={true}
      className='fixed bottom-4 right-4 flex items-center gap-1 rounded bg-text py-2 pl-3 pr-4 text-sm font-bold text-background shadow-xl'
      href='https://contentql.io'
      target='_blank'
      aria-label='contentQL website'>
      <Image
        src='/images/contentql-logo.png'
        alt='contentql logo'
        height={24}
        width={24}
      />
      Made in ContentQL
    </Link>
  )
}

export default Branding
