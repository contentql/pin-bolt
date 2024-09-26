'use client'

import { Input, LabelInputContainer } from '../../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription } from '@/components/common/Alert'
import { trpc } from '@/trpc/client'
import { GenerateTokenSchema } from '@/trpc/routers/auth/validator'

const GenerateResetTokenForm: React.FC = () => {
  const form = useForm<z.infer<typeof GenerateTokenSchema>>({
    resolver: zodResolver(GenerateTokenSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const {
    mutate: generateResetPasswordTokenMutation,
    isPending: isGeneratePasswordPending,
    isError: isGeneratePasswordError,
    error: generatePasswordError,
    isSuccess: isGeneratePasswordSuccess,
  } = trpc.auth.forgotPassword.useMutation({
    onSuccess: () => {
      //   toast.success('Please check you mail!')
    },
    onError: () => {
      //   toast.error('Error sending you mail, try again!')
    },
  })

  const onSubmit = async (data: z.infer<typeof GenerateTokenSchema>) => {
    generateResetPasswordTokenMutation({
      ...data,
    })
  }

  return (
    <main
      id='content'
      role='main'
      className='flex min-h-screen w-full items-center justify-center bg-base-100'>
      <div className='mx-auto w-full max-w-md drop-shadow-2xl  md:p-8'>
        <div className='text-center'>
          {isGeneratePasswordSuccess ? (
            <Alert variant='success' className='mb-12'>
              <AlertDescription>
                An email verification has been successfully sent.
              </AlertDescription>
            </Alert>
          ) : isGeneratePasswordError ? (
            <Alert variant='danger' className='mb-12'>
              <AlertDescription>
                {generatePasswordError.message}
              </AlertDescription>
            </Alert>
          ) : null}
          <h1 className='block text-2xl font-bold text-base-content'>
            Forgot password?
          </h1>
          <p className='mt-2 text-sm text-base-content/70'>
            Remember your password?
            <a
              className='pl-1 font-medium text-base-content decoration-1 hover:underline'
              href='/sign-in'>
              SignIn here
            </a>
          </p>
        </div>

        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <div>
                <LabelInputContainer className='mb-4'>
                  <div className='inline-flex justify-between'>
                    <label
                      htmlFor='email'
                      className='mb-2 ml-1 block text-sm font-bold text-base-content/70'>
                      Email address
                    </label>
                    {errors.email && (
                      <p
                        className='mt-2 hidden text-xs text-error'
                        id='email-error'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <Input
                    {...register('email')}
                    type='email'
                    id='email'
                    name='email'
                    placeholder='jon@gmail.com'
                  />
                </LabelInputContainer>
              </div>
              <button
                type='submit'
                disabled={isGeneratePasswordPending}
                className='mt-3 inline-flex w-full items-center justify-center gap-2 rounded-rounded-btn border border-transparent bg-primary px-4 py-3 text-sm font-semibold text-base-content transition-all hover:bg-primary-focus  disabled:cursor-not-allowed disabled:bg-opacity-50 '>
                {isGeneratePasswordPending ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default GenerateResetTokenForm
