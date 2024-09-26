import { NextPage } from 'next'

import { ForgotPasswordView } from '@/components/auth/forgot-password'
import withNoAuth from '@/utils/withNoAuth'

const ForgotPassword: NextPage = () => {
  return <ForgotPasswordView />
}

export default withNoAuth(ForgotPassword)
