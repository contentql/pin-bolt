import { User } from '@payload-types'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/common/Popover'
import { logoMapping } from '@/utils/logoMapping'

type PlatformType = NonNullable<User['socialLinks']>[number]['platform']

type UserPopoverType = {
  name: string | null | undefined
  url:
    | {
        src: string
        alt: string
      }
    | undefined
  bio: string | null
  socialLinks:
    | {
        platform: PlatformType
        value: string
        id?: string | null
      }[]
    | null
  slug: string
}

const AuthorPopover = ({
  children,
  user,
  initials,
  href,
  offset = -10,
}: {
  children: React.ReactNode
  user: UserPopoverType
  initials: string
  href: string
  offset?: number
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent align='start' alignOffset={offset}>
        <Avatar key={user.name} className='mb-4 size-10'>
          <AvatarImage src={user.url?.src} alt={`${user.name}-pic`} />
          <AvatarFallback className='text-sm'>{initials}</AvatarFallback>
        </Avatar>

        <Link href={href} className='font-semibold'>
          {user.name}
        </Link>
        <p className='mt-1 text-sm text-secondary'>{user.bio}</p>

        <div className='mt-4 flex flex-wrap items-center gap-3'>
          {user.socialLinks && user.socialLinks.length
            ? user.socialLinks.map(({ platform, value }) => {
                const Element = logoMapping[platform]
                return (
                  <Link
                    target='_blank'
                    className='flex items-center gap-2 rounded-md bg-secondary/20 p-2 text-sm capitalize hover:bg-secondary/30'
                    href={value}
                    key={platform}>
                    <Element className='size-5' />
                  </Link>
                )
              })
            : null}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AuthorPopover
