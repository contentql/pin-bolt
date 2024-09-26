'use client'

import { Input, LabelInputContainer } from '../../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription } from '@/components/common/Alert'
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
      //   toast.success('Changed your password!')
      router.push('/sign-in')
    },
    onError: () => {
      //   toast.error('Not able to change your password, try again!')
    },
  })

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    resetPasswordMutation({
      ...data,
    })
  }

  return (
    <main className='flex h-screen w-full items-center justify-center bg-base-100'>
      <div className='w-full max-w-md  drop-shadow-2xl'>
        <div className='text-center'>
          {isResetPasswordSuccess ? (
            <Alert variant='success' className='mb-12'>
              <AlertDescription>Updated Password ✅</AlertDescription>
            </Alert>
          ) : isResetPasswordError ? (
            <Alert variant='danger' className='mb-12'>
              <AlertDescription>{resetPasswordError.message}</AlertDescription>
            </Alert>
          ) : null}
          <h1 className='block text-2xl font-bold text-base-content'>
            Almost there!
          </h1>
          <p className='mt-2 text-sm text-base-content/70'>
            Please enter a new password to reset.
          </p>
        </div>

        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <div>
                <LabelInputContainer className='mb-4'>
                  <div className='inline-flex justify-between'>
                    <label
                      htmlFor='password'
                      className='mb-2 ml-1 block text-sm font-bold text-base-content/70'>
                      Enter password
                    </label>
                    {errors.password && (
                      <p
                        className='mt-2 hidden text-xs text-error'
                        id='email-error'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register('password')}
                    type='password'
                    id='password'
                    name='password'
                    placeholder='● ● ● ● ● ● ● ●'
                  />
                </LabelInputContainer>
              </div>
              <button
                type='submit'
                disabled={isResetPasswordPending}
                className='mt-3 inline-flex w-full items-center justify-center gap-2 rounded-rounded-btn border border-transparent bg-primary px-4 py-3 text-sm font-semibold text-primary-content transition-all hover:bg-primary-focus disabled:cursor-not-allowed disabled:bg-opacity-50 '>
                {isResetPasswordPending ? 'Processing...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default ResetPasswordForm
