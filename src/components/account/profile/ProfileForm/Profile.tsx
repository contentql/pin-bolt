'use client'

import { User } from '@payload-types'
import { useState } from 'react'
import { IoMdRefresh } from 'react-icons/io'
import { toast } from 'sonner'

import { trpc } from '@/trpc/client'

const Profile = ({ initialUser }: { initialUser: User | undefined }) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const { data: user } = trpc.user.getUser.useQuery()
  const trpcUtils = trpc.useUtils()

  function capitalizeWords(words: string) {
    return words
      ?.split(' ')
      ?.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      ?.join(' ')
  }

  const { mutate: updateProfileMutation } =
    trpc.user.updateProfileImage.useMutation({
      onMutate: async data => {
        // const userQueryKey = getQueryKey(trpc.user.getUser, undefined, 'query')
        trpcUtils.user.getUser.setData(undefined, oldUser => {
          if (oldUser) {
            return { ...oldUser, imageUrl: data.imageUrl }
          }
          return oldUser
        })
      },
      onSuccess: async () => {
        toast.success('Avatar updated successfully!')
      },
      onError: async () => {
        trpcUtils.user.invalidate()
        toast.error('Avatar failed to update!')
      },
      onSettled: async () => {
        setIsSpinning(false)
      },
    })

  function updateImage() {
    setIsSpinning(true)
    const randomNum = Math.floor(Math.random() * (24 - 1 + 1)) + 1
    const imageUrl = `/images/avatar/avatar_${randomNum}.jpg`
    updateProfileMutation({ imageUrl })
  }

  return (
    <div className='max-w-sm rounded p-5 text-center text-base-content/70'>
      <div className='group relative z-0 mx-auto h-[141px] w-[141px]'>
        <div
          style={{ backgroundImage: `url(${user?.imageUrl})` }}
          className='z-0 h-full w-full rounded-full bg-base-200 bg-cover bg-center bg-no-repeat transition duration-700 ease-in-out group-hover:blur-sm'></div>
        <button
          onClick={updateImage}
          className={`absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-base-content text-primary opacity-0 transition-opacity duration-700 ease-in-out ${isSpinning ? 'animate-spin' : ''} group-hover:opacity-100`}>
          <IoMdRefresh size={24} />
        </button>
      </div>
      <div className='mt-5 text-sm'>
        <a
          href='#'
          className='text-xl font-medium leading-none text-base-content transition duration-500 ease-in-out hover:text-primary'>
          {capitalizeWords(user?.username!)}
        </a>
        {user?.role === 'author' && (
          <p className='mt-2 text-base-content'>Author</p>
        )}
      </div>
    </div>
  )
}

export default Profile
