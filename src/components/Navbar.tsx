import type { SiteSetting } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { HiChevronDown } from 'react-icons/hi'

import { generateMenuLinks } from '@/utils/generateMenuLinks'

import CommandBar from './CommandBar'

const Navbar = ({ metadata }: { metadata: SiteSetting }) => {
  const { navbar } = metadata
  const { logo, menuLinks } = navbar

  let logoDetails = {
    url: '',
    alt: '',
  }

  const navLinks = menuLinks?.length ? generateMenuLinks(menuLinks) : []

  if (Object.keys(logo).length && logo?.imageUrl === 'string') {
    logoDetails = {
      url: logo?.imageUrl,
      alt: `${metadata.general?.title} logo`,
    }
  } else if (Object.keys(logo).length && typeof logo?.imageUrl !== 'string') {
    logoDetails = {
      url: logo.imageUrl?.url!,
      alt: logo.imageUrl?.alt || `${metadata.general?.title} logo`,
    }
  }

  // if in case image or nav-links are not specified hiding the navbar
  if (!logoDetails.url && navLinks?.length === 0) {
    return null
  }

  return (
    <header className='fixed left-0 top-0 z-[60] w-full bg-secondary/10 backdrop-blur-lg'>
      <div className='container flex h-14 items-center justify-between'>
        {logoDetails.url && (
          <Link href='/'>
            <Image
              src={logoDetails.url}
              alt={logoDetails.alt}
              width={24}
              height={24}
            />
          </Link>
        )}

        <div className='flex items-center gap-8'>
          {navLinks?.length > 0 && (
            <nav>
              <ul className='flex gap-8'>
                {navLinks.map(({ label, children, href, newTab, type }) => (
                  <li className='flex list-none items-center gap-1' key={label}>
                    {label}{' '}
                    {children && (
                      <HiChevronDown className='size-4 text-slate-100' />
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <CommandBar />
        </div>
      </div>
    </header>
  )
}

export default Navbar
