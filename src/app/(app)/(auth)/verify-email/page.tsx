import { NextPage } from 'next'
import { redirect } from 'next/navigation'

import VerifyEmail from '@/components/auth/verify-email/VerifyEmail'
import withNoAuth from '@/utils/withNoAuth'

interface PageProps {
  searchParams: Record<string, string>
}

const VerifyEmailPage: NextPage<PageProps> = ({ searchParams }) => {
  const token = searchParams?.token || null
  const userId = searchParams?.id || null

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
