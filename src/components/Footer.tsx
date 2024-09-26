import type { SiteSetting } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillGithub } from 'react-icons/ai'
import { FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IconType } from 'react-icons/lib'

type SocialLinksType = NonNullable<
  Pick<SiteSetting, 'footer'>['footer']['socialLinks']
>[0]

const SocialIcons: { [key in SocialLinksType['platform']]: IconType | null } = {
  facebook: null,
  github: AiFillGithub,
  instagram: null,
  linkedin: null,
  medium: null,
  pinterest: null,
  quora: null,
  reddit: null,
  snapchat: null,
  telegram: null,
  tiktok: null,
  tumblr: null,
  twitter: FaXTwitter,
  whatsapp: null,
  youtube: FaYoutube,
  discord: null,
}

const Footer = ({ metadata }: { metadata: SiteSetting }) => {
  const { footer } = metadata
  const { logo, socialLinks, footerLinks } = footer

  let logoDetails = {
    url: '',
    alt: '',
  }

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

  // if in case image or nav-links are not specified hiding the footer
  if (
    !logoDetails.url &&
    footerLinks?.length === 0 &&
    socialLinks?.length === 0
  ) {
    return null
  }

  return (
    <footer className='border-t'>
      <div className='container flex h-14 items-center justify-between'>
        <div className='flex items-center gap-2'>
          {logoDetails.url && (
            <Image
              src={logoDetails.url}
              alt={logoDetails.alt}
              width={24}
              height={24}
            />
          )}

          {logo.description && (
            <span className='hidden text-sm text-slate-300 md:block'>
              {logo.description}
            </span>
          )}
        </div>

        {socialLinks?.length ? (
          <div>
            <ul className='flex gap-8'>
              {socialLinks.map(({ platform, value, id }) => {
                const Component = SocialIcons[platform]
                return Component ? (
                  <Link href={value} target='_blank' key={id}>
                    <li className='flex list-none items-center gap-1'>
                      <Component className='size-6 text-slate-500' />
                    </li>
                  </Link>
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
