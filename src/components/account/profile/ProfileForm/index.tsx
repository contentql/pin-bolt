'use client'

import type { User } from '@payload-types'
import { useMutation } from '@tanstack/react-query'
import { Camera, ImageUp } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import Button from '@/components/common/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/Dialog'
import { Input } from '@/components/common/Input'
import { Textarea } from '@/components/common/Textarea'
import { trpc } from '@/trpc/client'
import { getInitials } from '@/utils/getInitials'
import uploadMedia from '@/utils/uploadMedia'

import DeleteAccountSection from './DeleteAccountSection'

const ProfileFormSchema = z.object({
  displayName: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  bio: z.string().optional(),
})

type ProfileFormDataType = z.infer<typeof ProfileFormSchema>

const maxFileSize = 1024 * 1024 * 5

const ProfileForm = ({ user }: { user: User }) => {
  const { data, refetch: refetchUserData } = trpc.user.getUser.useQuery(
    undefined,
    {
      initialData: { ...user, collection: 'users' },
    },
  )

  const { imageUrl, username, displayName, role, bio } = data || user

  const [formData, setFormData] = useState<ProfileFormDataType>({
    displayName: typeof displayName === 'string' ? displayName : '',
    password: '',
    confirmPassword: '',
    bio: typeof bio === 'string' ? bio : '',
  })

  const [userImage, setUserImage] = useState<File>()
  const [userImageURL, setUserImageURL] = useState('')
  const [open, setOpen] = useState(false)

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { mutate: updateUserMutation, isPending: isUpdateUserPending } =
    trpc.user.updateUser.useMutation({
      onSuccess: () => {
        refetchUserData()
        toast.success('Profile updated successfully')
        setOpen(false)
      },
      onError() {
        return null
      },
    })

  const { mutate: uploadProfilePic, isPending: uploadingImage } = useMutation({
    mutationFn: uploadMedia,
    onSuccess: data => {
      updateUserMutation({
        imageUrl: data.id,
      })
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

  const userDetails = {
    url:
      imageUrl && typeof imageUrl === 'object'
        ? {
            src: imageUrl.sizes?.thumbnail?.url!,
            alt: `${imageUrl?.alt}`,
          }
        : undefined,
    name: displayName || username,
    isAdmin: role.includes('admin'),
  }

  const initials = getInitials(userDetails.name!)

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    // throwing and error if file size exceeds
    if (file && file?.size > maxFileSize) {
      return toast.error('Maximum upload size is 5MB')
    }

    if (userImageURL) {
      URL.revokeObjectURL(userImageURL)
    }

    // this gives the preview of the image to the user
    if (file) {
      const url = URL.createObjectURL(file)
      setUserImage(file)
      setUserImageURL(url)
    } else {
      setUserImageURL('')
    }
  }

  return (
    <>
      <h2 className='font-semibold'>Personal Information</h2>

      <div className='relative h-max w-max'>
        <Avatar className='my-8 size-40'>
          <AvatarImage src={userDetails.url?.src} />
          <AvatarFallback className='text-4xl'>{initials}</AvatarFallback>
        </Avatar>

        <Dialog
          open={open}
          onOpenChange={state => {
            if (!state) {
              URL.revokeObjectURL(userImageURL)
              setUserImage(undefined)
              setUserImageURL('')
            }

            setOpen(state)
          }}>
          <DialogTrigger asChild>
            <Button
              size='icon'
              onClick={() => setOpen(true)}
              className='absolute bottom-0 right-0 rounded-full border-2 border-background'>
              <Camera size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Change your photo</DialogTitle>
              <DialogDescription>
                This will be shown on your profile
              </DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-[auto_1fr] gap-4 py-4'>
              <Avatar className='size-16'>
                <AvatarImage src={userImageURL || userDetails.url?.src || ''} />
                <AvatarFallback className='text-lg'>{initials}</AvatarFallback>
              </Avatar>

              <div className='flex w-full items-center justify-center'>
                <label
                  htmlFor='dropzone-file'
                  className='flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:bg-secondary/10'>
                  <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                    <ImageUp className='text-secondary' />

                    <p className='mt-4 text-sm'>
                      <span className='font-semibold'>Click to upload</span>
                    </p>
                    <p className='mt-2 text-center text-xs leading-5 text-secondary'>
                      Use square image for best results,
                      <br /> maximum upload size is 5MB
                    </p>
                  </div>
                  <input
                    accept='image/*'
                    multiple={false}
                    id='dropzone-file'
                    type='file'
                    className='hidden'
                    onChange={handleUpload}
                  />
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => {
                  setOpen(false)
                  URL.revokeObjectURL(userImageURL)
                  setUserImage(undefined)
                  setUserImageURL('')
                }}>
                Cancel
              </Button>
              <Button
                disabled={!userImage || uploadingImage || isUpdateUserPending}
                isLoading={uploadingImage || isUpdateUserPending}
                onClick={() => {
                  if (userImage) {
                    uploadProfilePic(userImage)
                  }
                }}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <form
        onSubmit={handleUserUpdateForm}
        className='mb-16 max-w-3xl items-center'>
        <div className='mb-4 sm:mb-6'>
          <label
            htmlFor='displayName'
            className='mb-1 block text-sm font-medium text-secondary'>
            Name
          </label>
          <Input
            type='text'
            id='displayName'
            name='displayName'
            placeholder='John'
            value={formData?.displayName}
            onChange={handleOnChange}
          />
        </div>

        <div className='mb-4 sm:mb-6'>
          <label
            htmlFor='bio'
            className='mb-1 block text-sm font-medium text-secondary'>
            Bio
          </label>
          <Textarea
            id='bio'
            name='bio'
            value={formData?.bio}
            onChange={handleOnChange}
          />
        </div>

        <div className='mb-4 flex w-full flex-col items-center space-x-0 space-y-4 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0'>
          <div className='w-full'>
            <label
              htmlFor='username'
              className='mb-1 block text-sm font-medium text-secondary'>
              Username
            </label>
            <Input
              type='text'
              id='username'
              name='username'
              placeholder='john-deo'
              value={user?.username!}
              disabled
            />
          </div>

          <div className='w-full'>
            <label
              htmlFor='email'
              className='mb-1 block text-sm font-medium text-secondary'>
              Email
            </label>
            <Input
              type='text'
              id='email'
              name='email'
              placeholder='john.doe@example.com'
              value={user?.email}
              disabled
            />
          </div>
        </div>

        <div className='mb-4 flex w-full flex-col items-center space-x-0 space-y-4 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0'>
          <div className='w-full'>
            <label
              htmlFor='password'
              className='mb-1 block text-sm font-medium text-secondary'>
              New Password
            </label>
            <Input
              type='password'
              id='password'
              name='password'
              placeholder='● ● ● ● ● ● ● ● ●'
              onChange={handleOnChange}
            />
          </div>

          <div className='w-full'>
            <label
              htmlFor='confirmPassword'
              className='mb-1 block text-sm font-medium text-secondary'>
              Confirm Password
            </label>
            <Input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              placeholder='● ● ● ● ● ● ● ● ●'
              onChange={handleOnChange}
            />
          </div>
        </div>

        <Button
          type='submit'
          isLoading={isUpdateUserPending}
          disabled={isUpdateUserPending}>
          Update Profile
        </Button>
      </form>

      <DeleteAccountSection user={user} />
    </>
  )
}

export default ProfileForm
