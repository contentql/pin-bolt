import type { SiteSetting } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

import { generateMenuLinks } from '@/utils/generateMenuLinks'
import { logoMapping } from '@/utils/logoMapping'

const Footer = ({ metadata }: { metadata: SiteSetting }) => {
  const { footer } = metadata
  const { logo, socialLinks, footerLinks } = footer

  let logoDetails = {
    url: '',
    alt: '',
  }

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

  // if in case image or nav-links are not specified hiding the footer
  if (
    !logoDetails.url &&
    footerLinks?.length === 0 &&
    socialLinks?.length === 0
  ) {
    return null
  }

  const menuLinks = footerLinks?.length ? generateMenuLinks(footerLinks) : []

  return (
    <footer className='space-y-8 border-t pt-8'>
      <div className='container sm:flex sm:justify-between'>
        <div className='space-y-4'>
          {logoDetails.url && (
            <Link href='/'>
              <Image
                src={logoDetails.url}
                alt={logoDetails.alt}
                width={40}
                height={40}
              />
            </Link>
          )}

          {logo.description && (
            <p className='text-secondary '>{logo.description}</p>
          )}
        </div>

        <div className='mt-8 flex flex-wrap gap-8 sm:mt-0'>
          {menuLinks.map(({ children, label }, index) => {
            if (children) {
              return (
                <div className='text-sm' key={index}>
                  <p className='mb-4 text-secondary'>{label}</p>

                  <div className='space-y-2'>
                    {children.map(details => (
                      <Link
                        href={details.href}
                        key={details.label}
                        className='block'
                        target={details.newTab ? '_blank' : '_self'}>
                        {details.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }

            return null
          })}
        </div>
      </div>

      <div className='container flex flex-col items-center justify-between gap-4 border-t pb-12 pt-4 sm:flex-row'>
        <p className='text-secondary'>{footer.copyright}</p>

        {socialLinks?.length ? (
          <div>
            <ul className='flex gap-8'>
              {socialLinks.map(({ platform, value, id }) => {
                const Component = logoMapping[platform]

                return Component ? (
                  <li key={id} className='flex list-none items-center gap-1'>
                    <Link
                      href={value}
                      target='_blank'
                      aria-label={`${platform} link`}>
                      <Component className='size-6 [&_path]:fill-secondary' />
                    </Link>
                  </li>
                ) : null
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </footer>
  )
}

export default Footer
