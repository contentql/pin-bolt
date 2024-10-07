import { redirect } from 'next/navigation'

import { ResetPasswordView } from '@/components/auth/reset-password'
import withNoAuth from '@/utils/withNoAuth'

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) => {
  const params = await searchParams
  const token = params?.token || null

  if (!token) {
    redirect('/sign-in')
  }

  return <ResetPasswordView token={token} />
}

export default withNoAuth(ResetPasswordPage)
