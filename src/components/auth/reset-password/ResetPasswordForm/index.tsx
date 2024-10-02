'use client'

import { LabelInputContainer } from '../../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription } from '@/components/common/Alert'
import Button from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { trpc } from '@/trpc/client'
import { ResetPasswordSchema } from '@/trpc/routers/auth/validator'

interface Props {
  token: string
}

const ResetPasswordForm: React.FC<Props> = ({ token }) => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onBlur',
    defaultValues: { token, password: '' },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const {
    mutate: resetPasswordMutation,
    isPending: isResetPasswordPending,
    isError: isResetPasswordError,
    error: resetPasswordError,
    isSuccess: isResetPasswordSuccess,
  } = trpc.auth.resetPassword.useMutation({
    onSuccess: () => {
      router.push('/sign-in')
    },
  })

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    resetPasswordMutation({
      ...data,
    })
  }

  return (
    <main className='bg-base-100 flex h-screen w-full items-center justify-center'>
      <div className='w-full max-w-md  drop-shadow-2xl'>
        <div>
          {isResetPasswordSuccess ? (
            <Alert variant='success' className='mb-12'>
              <AlertDescription>
                Password changed successfully! Redirecting to the sign-in page.
              </AlertDescription>
            </Alert>
          ) : isResetPasswordError ? (
            <Alert variant='danger' className='mb-12'>
              <AlertDescription>{resetPasswordError.message}</AlertDescription>
            </Alert>
          ) : null}

          <h1 className=' mb-1 text-3xl font-semibold'>Almost there!</h1>
          <p className='mb-6 text-secondary'>
            Please enter a new password to reset.
          </p>
        </div>

        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <div>
                <LabelInputContainer className='mb-4'>
                  <label htmlFor='password' className='mb-1 block text-sm'>
                    Enter password
                  </label>

                  <Input
                    {...register('password')}
                    type='password'
                    id='password'
                    name='password'
                    placeholder='● ● ● ● ● ● ● ●'
                  />

                  {errors.password && (
                    <p className='text-xs text-danger' id='email-error'>
                      {errors.password.message}
                    </p>
                  )}
                </LabelInputContainer>
              </div>

              <Button
                type='submit'
                isLoading={isResetPasswordPending}
                disabled={isResetPasswordPending}
                className='w-full'>
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default ResetPasswordForm
