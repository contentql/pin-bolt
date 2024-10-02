'use client'

import { useRouter } from 'next/navigation'

import { Alert, AlertDescription } from '@/components/common/Alert'
import Spinner from '@/components/common/Spinner'
import { trpc } from '@/trpc/client'

const VerifyEmail = ({ token, userId }: { token: string; userId: string }) => {
  const { isLoading, isError, isSuccess } = trpc.auth.verifyEmail.useQuery({
    token,
    userId,
  })

  const router = useRouter()

  if (isLoading) {
    return (
      <div className='flex items-center gap-4'>
        <Spinner className='size-6 text-center text-secondary' />
        <p>Please wait, verification in progress...</p>
      </div>
    )
  }

  if (isSuccess) {
    setTimeout(() => {
      router.replace('/sign-in')
    }, 2000)

    return (
      <Alert variant='success' className='max-w-md'>
        <AlertDescription>
          Email verified successfully! Redirecting to the sign-in page. Thank
          you for confirming
        </AlertDescription>
      </Alert>
    )
  }

  if (isError) {
    return (
      <Alert variant='danger' className='max-w-md'>
        <AlertDescription>
          Email verification failed. The link may have expired or been used.
          Please request a new link or contact support.
        </AlertDescription>
      </Alert>
    )
  }
}

export default VerifyEmail
