'use client'

import type { User } from '@payload-types'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { trpc } from '@/trpc/client'

import DeleteAccountSection from './DeleteAccountSection'
import Profile from './Profile'

const ProfileFormSchema = z.object({
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  confirmPassword: z.string().optional().nullable(),
})
type ProfileFormDataType = z.infer<typeof ProfileFormSchema>

const ProfileForm = ({ user }: { user: User }) => {
  const [formData, setFormData] = useState<ProfileFormDataType>({
    name: user?.username,
    password: '',
    confirmPassword: '',
  })
  const trpcUtils = trpc.useUtils()

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { mutate: updateUserMutation, isPending: isUpdateUserPending } =
    trpc.user.updateUser.useMutation({
      onSuccess: () => {
        toast.success('Profile updated successfully')
        trpcUtils.user.getUser.invalidate()
      },
      onError() {
        return null
      },
    })

  const handleUserUpdateForm = (e: any) => {
    e.preventDefault()
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => Boolean(value)),
    )

    if (
      sanitizedData.password &&
      sanitizedData.password !== sanitizedData.confirmPassword
    ) {
      toast.error('Passwords do not match!')
      return
    }

    updateUserMutation({
      ...sanitizedData,
    })
  }

  return (
    <div className='p-2 md:p-4'>
      <div className='mt-8 w-full px-6 pb-8 sm:rounded-lg'>
        <h2 className='pl-6 text-2xl font-bold text-base-content sm:text-xl'>
          Personal Information
        </h2>

        <div className='mx-auto mt-8 grid'>
          <div className='flex flex-col items-center justify-center space-y-5 sm:flex-row sm:space-y-0'>
            <Profile initialUser={user} />
          </div>

          <form
            onSubmit={handleUserUpdateForm}
            className='mt-8 items-center sm:mt-14'>
            <div className='mb-4 sm:mb-6'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-base-content/70'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='John'
                value={user?.username || ''}
                onChange={handleOnChange}
                className='mt-1 w-full rounded-md bg-base-200 p-2 text-base-content transition-colors duration-300 focus:border-base-content/40 focus:outline-none focus:ring-1 focus:ring-base-content/40 focus:ring-offset-1'
              />
            </div>

            <div className='mb-4 sm:mb-6'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-base-content/70'>
                E-Mail
              </label>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='john.doe@example.com'
                value={user?.email}
                disabled
                className='mt-1 w-full rounded-md bg-base-200 p-2 text-base-content transition-colors duration-300 focus:border-base-content/40 focus:outline-none focus:ring-1 focus:ring-base-content/40 focus:ring-offset-1'
              />
            </div>
            <div className='mb-4 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0'>
              <div className='w-full'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-base-content/70'>
                  New Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='● ● ● ● ● ● ● ● ●'
                  onChange={handleOnChange}
                  className='mt-1 w-full rounded-md bg-base-200 p-2 text-base-content transition-colors duration-300 focus:border-base-content/40 focus:outline-none focus:ring-1 focus:ring-base-content/40 focus:ring-offset-1'
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-base-content/70'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='● ● ● ● ● ● ● ● ●'
                  onChange={handleOnChange}
                  className='mt-1 w-full rounded-md bg-base-200 p-2 text-base-content transition-colors duration-300 focus:border-base-content/40 focus:outline-none focus:ring-1 focus:ring-base-content/40 focus:ring-offset-1'
                />
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='w-full rounded-lg  bg-primary px-5 py-2.5 text-center text-sm font-medium text-base-content hover:bg-primary-focus focus:outline-none focus:ring-4 focus:ring-primary/30 sm:w-auto'>
                {isUpdateUserPending ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <DeleteAccountSection />
    </div>
  )
}

export default ProfileForm
