import { SignInView } from '@/components/auth/sign-in'
import withNoAuth from '@/utils/withNoAuth'

const SignInPage = async () => {
  return <SignInView />
}

export default withNoAuth(SignInPage)
