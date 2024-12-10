'use client'

import { User } from '@payload-types'
import { LogOut, UserRound, UserRoundCog } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown'
import { trpc } from '@/trpc/client'
import { GenerateMenuLinksType } from '@/utils/generateMenuLinks'
import { getInitials } from '@/utils/getInitials'
import { signOut } from '@/utils/signOut'

import HamburgerMenu from './HamburgerMenu'
import { Avatar, AvatarFallback, AvatarImage } from './common/Avatar'
import Button from './common/Button'

const ProfileDropdown = ({
  user,
  navLinks,
}: {
  user: User | null
  navLinks: GenerateMenuLinksType[]
}) => {
  const router = useRouter()
  const { data } = trpc.user.getUser.useQuery(undefined, {
    ...(user
      ? {
          initialData: { ...user, collection: 'users' },
        }
      : {}),
    retry: (retryCount, response) => {
      if (response.data?.httpStatus === 401) {
        return false
      }

      return retryCount <= 2
    },
  })

  const userDetails = {
    url:
      data?.imageUrl && typeof data?.imageUrl === 'object'
        ? {
            src: data?.imageUrl.sizes?.thumbnail?.url!,
            alt: `${data?.imageUrl?.alt}`,
          }
        : undefined,
    name: data?.displayName || data?.username || '',
    isAdmin: (data?.role || [])?.includes('admin'),
  }

  const initials = getInitials(userDetails.name!)

  const handleSignOut = async () => {
    try {
      const response = await signOut()

      if (response.message === 'Logout successful.') {
        router.push('/')

        if (typeof window !== 'undefined') {
          window.location.reload()
        }
      }
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <>
      {data ? (
        <DropdownMenu>
          <DropdownMenuTrigger className='hidden items-center gap-1 lg:flex'>
            <Avatar>
              <AvatarImage src={userDetails.url?.src} alt='user-profile' />
              <AvatarFallback className='text-sm'>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className='z-[60] max-w-56' align='end'>
            <Link href='/profile'>
              <DropdownMenuItem className='cursor-pointer'>
                <UserRound size={16} className='mr-2' />
                Profile
              </DropdownMenuItem>
            </Link>

            {userDetails.isAdmin && (
              <Link href='/admin' target='_blank'>
                <DropdownMenuItem className='cursor-pointer'>
                  <UserRoundCog size={16} className='mr-2' />
                  Admin
                </DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuItem
              className='cursor-pointer'
              onClick={handleSignOut}>
              <LogOut size={16} className='mr-2' />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href='/sign-in'>
          <Button size='sm'>Sign in</Button>
        </Link>
      )}

      <HamburgerMenu
        data={data}
        userDetails={userDetails}
        handleSignOut={handleSignOut}
        initials={initials}
        navLinks={navLinks}
      />
    </>
  )
}

export default ProfileDropdown
