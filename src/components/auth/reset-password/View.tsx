import ResetPasswordForm from './ResetPasswordForm'

interface Props {
  token: string
}

const ResetPasswordView: React.FC<Props> = ({ token }) => {
  return <ResetPasswordForm token={token} />
}

export default ResetPasswordView
