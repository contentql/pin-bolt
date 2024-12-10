import type { SiteSetting, User } from '@payload-types'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown'
import { generateMenuLinks } from '@/utils/generateMenuLinks'

import CommandBar from './CommandBar'
import ProfileDropdown from './ProfileDropdown'

const Navbar = ({
  metadata,
  user,
}: {
  metadata: SiteSetting
  user: User | null
}) => {
  const { navbar } = metadata
  const { logo, menuLinks } = navbar

  let logoDetails = {
    url: '',
    alt: '',
  }

  const navLinks = menuLinks?.length ? generateMenuLinks(menuLinks) : []

  if (Object.keys(logo).length && typeof logo?.imageUrl === 'string') {
    logoDetails = {
      url: logo?.imageUrl,
      alt: `${metadata.general?.title} logo`,
    }
  } else if (Object.keys(logo).length && typeof logo?.imageUrl === 'object') {
    logoDetails = {
      url: logo.imageUrl?.url!,
      alt: logo.imageUrl?.alt || `${metadata.general?.title} logo`,
    }
  }

  // if in case image or nav-links are not specified hiding the navbar
  if (!logoDetails.url && navLinks?.length === 0) {
    return null
  }

  const { height, width } = logo

  return (
    <header
      id='main-header'
      className='fixed left-0 top-0 z-[60] w-full border-b bg-popover/50 backdrop-blur-lg'>
      <div className='container flex h-14 items-center justify-between'>
        {logoDetails.url && (
          <div className='flex-1'>
            <Link href='/'>
              <Image
                src={logoDetails.url}
                alt={logoDetails.alt}
                width={width || 24}
                height={height || 24}
              />
            </Link>
          </div>
        )}

        <div className='flex items-center gap-8'>
          {navLinks?.length > 0 && (
            <nav>
              <ul className='hidden gap-8 lg:flex'>
                {navLinks.map(({ label, children, href = '', newTab }) => (
                  <li
                    className='flex list-none items-center gap-1 text-sm'
                    key={label}>
                    {children ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className='flex items-center gap-1'>
                          {label}
                          <ChevronDown size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className='z-[60] max-w-56'
                          align='end'>
                          {children.map(details => (
                            <Link
                              href={details.href}
                              key={details.label}
                              target={details.newTab ? '_blank' : '_self'}>
                              <DropdownMenuItem className='cursor-pointer'>
                                {details.label}
                              </DropdownMenuItem>
                            </Link>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link href={href} target={newTab ? '_blank' : '_self'}>
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className='flex flex-1 items-center justify-end gap-4'>
          <CommandBar />
          <ProfileDropdown user={user} navLinks={navLinks} />
        </div>
      </div>
    </header>
  )
}

export default Navbar
