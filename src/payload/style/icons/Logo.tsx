import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <div className='flex items-center gap-2 text-xl font-bold'>
      <Image
        src={'/images/contentql-logo.png'}
        width={40}
        height={40}
        alt='ContentQL Logo'
        className='logo-image'
      />

      <p>ContentQL</p>
    </div>
  )
}

export default Logo
