import { redirect } from 'next/navigation'

import VerifyEmail from '@/components/auth/verify-email/VerifyEmail'
import withNoAuth from '@/utils/withNoAuth'

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) => {
  const params = await searchParams

  const token = params?.token || null
  const userId = params?.id || null

  if (!token || !userId) {
    redirect('/sign-in')
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <VerifyEmail token={token} userId={userId} />
    </div>
  )
}

export default withNoAuth(VerifyEmailPage)
