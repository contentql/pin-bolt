import { env } from '@env'
import { Resend } from 'resend'

import ResetPasswordEmailTemplate from '@/emails/reset-password'

const resend = new Resend(env.RESEND_API_KEY)

export const sendResetPasswordEmail = async (
  email: string,
  username: string,
  token: string,
) => {
  await resend.emails.send({
    from: `Payload Admin <${env.RESEND_SENDER_EMAIL}>`,
    to: email,
    subject: 'Reset Password',
    react: (
      <ResetPasswordEmailTemplate
        appName='Payload'
        userFirstName={username}
        resetPasswordLink={`${env.PAYLOAD_URL}/reset-password?token=${token}`}
      />
    ),
  })
}
