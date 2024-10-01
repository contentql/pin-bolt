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
import { getInitials } from '@/utils/getInitials'
import { signOut } from '@/utils/signOut'

import { Avatar, AvatarFallback, AvatarImage } from './common/Avatar'
import Button from './common/Button'

const ProfileDropdown = ({ user }: { user: User | null }) => {
  const router = useRouter()

  if (!user) {
    return (
      <Link href='/sign-in'>
        <Button size='sm'>Sign in</Button>
      </Link>
    )
  }

  const { imageUrl, username, displayName, role } = user

  const userDetails = {
    url:
      imageUrl && typeof imageUrl !== 'string'
        ? {
            src: imageUrl.sizes?.thumbnail?.url!,
            alt: `${imageUrl?.alt}`,
          }
        : undefined,
    name: displayName || username,
    isAdmin: role.includes('admin'),
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
          <Link href='/admin'>
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
