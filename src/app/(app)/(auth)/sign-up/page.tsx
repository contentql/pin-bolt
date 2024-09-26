import { SignUpView } from '@/components/auth/sign-up'
import withNoAuth from '@/utils/withNoAuth'

const SignUpPage = async () => {
  return <SignUpView />
}

export default withNoAuth(SignUpPage)
