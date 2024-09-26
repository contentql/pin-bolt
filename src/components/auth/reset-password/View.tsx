import ResetPasswordForm from './ResetPasswordForm'

interface Props {
  token: string
}

const ResetPasswordView: React.FC<Props> = ({ token }) => {
  return (
    <div>
      <ResetPasswordForm token={token} />
    </div>
  )
}

export default ResetPasswordView
