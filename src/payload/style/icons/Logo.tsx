import Image from 'next/image'

const Logo = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.25rem',
        fontWeight: 700,
      }}>
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
