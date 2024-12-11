'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  FacebookLogo,
  LinkedinLogo,
  TwitterLogo,
  WhatsappLogo,
} from '@/components/SVG'

const ShareList = () => {
  const [url, setURL] = useState('')
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0

  useEffect(() => {
    setURL(window.location.href)
  }, [])

  return (
    <div className='flex items-center gap-4'>
      {/* twitter logo */}
      <Link
        target='_blank'
        rel='noopener'
        aria-label='share on Twitter'
        href={`https://twitter.com/share?url=${url}`}
        className='transition-colors hover:text-primary'>
        <TwitterLogo />
      </Link>

      {/* facebook logo */}
      <Link
        target='_blank'
        rel='noopener'
        aria-label='share on Facebook'
        className='transition-colors hover:text-primary'
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
        <FacebookLogo />
      </Link>

      {/* whatsapp logo */}
      <Link
        target='_blank'
        rel='noopener'
        aria-label='share on Whatsapp'
        className='transition-colors hover:text-primary'
        href={`https://${screenWidth < 1024 ? 'api' : 'web'}.whatsapp.com/send?text=${url}`}>
        <WhatsappLogo />
      </Link>

      {/* linkedIn logo */}
      <Link
        target='_blank'
        rel='noopener'
        aria-label='share on Linkedin'
        className='transition-colors hover:text-primary'
        href={`https://www.linkedin.com/shareArticle?url=${url}`}>
        <LinkedinLogo />
      </Link>
    </div>
  )
}

export default ShareList
