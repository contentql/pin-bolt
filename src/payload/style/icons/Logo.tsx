'use client'

import { useTheme } from '@payloadcms/ui'
import Image from 'next/image'

const Logo: React.FC = () => {
  const { theme } = useTheme()

  const logoSrc =
    theme === 'dark' ? '/images/logo-pink-white.png' : '/images/logo-pink.png'

  return (
    <div className='logo'>
      <Image
        src={logoSrc}
        width={200}
        height={20}
        alt='ContentQL Logo'
        className='logo-image'
      />
    </div>
  )
}

export default Logo
