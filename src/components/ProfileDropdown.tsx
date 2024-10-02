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
import { getInitials } from '@/utils/getInitials'
import { signOut } from '@/utils/signOut'

import { Avatar, AvatarFallback, AvatarImage } from './common/Avatar'
import Button from './common/Button'

const ProfileDropdown = ({ user }: { user: User | null }) => {
  const router = useRouter()
  const { data } = trpc.user.getUser.useQuery(
    undefined,
    user
      ? {
          initialData: { ...user, collection: 'users' },
        }
      : undefined,
  )

  if (!user) {
    return (
      <Link href='/sign-in'>
        <Button size='sm'>Sign in</Button>
      </Link>
    )
  }

  const userDetails = {
    url:
      data?.imageUrl && typeof data?.imageUrl !== 'string'
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
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-1'>
        <Avatar>
          <AvatarImage src={userDetails.url?.src} />
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

        <DropdownMenuItem className='cursor-pointer' onClick={handleSignOut}>
          <LogOut size={16} className='mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
