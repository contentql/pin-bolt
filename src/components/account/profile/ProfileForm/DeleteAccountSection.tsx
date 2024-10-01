'use client'

import { User } from '@payload-types'
import { TriangleAlert } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

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
import { trpc } from '@/trpc/client'

export default function DeleteAccountSection({ user }: { user: User }) {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const {
    mutate: deleteUserMutation,
    isPending: isDeleteAccountPending,
    isError: isDeleteAccountError,
    error: DeleteAccountError,
    isSuccess: DeleteAccountSuccess,
  } = trpc.user.deleteUser.useMutation({
    onSuccess: () => {
      toast.success('Account deleted successfully')
      router.push('/sign-up')
    },
    onError: () => {
      toast.error('Unable to delete the account, try again!')
    },
  })

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='destructive'>
            <TriangleAlert size={16} />
            Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? Deleting your
              account is permanent and will delete all your data forever.
            </DialogDescription>
          </DialogHeader>

          <p className='mt-6 text-sm leading-3 text-secondary'>
            Type <strong>{user.email}</strong> to confirm
          </p>
          <Input type='text' onChange={e => setEmail(e.target.value)} />

          <DialogFooter>
            <Button
              disabled={email !== user.email}
              onClick={() => deleteUserMutation()}
              isLoading={isDeleteAccountPending}
              variant='destructive'>
              Yes, Delete Account Forever
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
