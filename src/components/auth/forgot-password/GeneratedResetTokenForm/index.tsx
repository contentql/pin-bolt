'use client'

import { LabelInputContainer } from '../../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription } from '@/components/common/Alert'
import Button from '@/components/common/Button'
import { Input } from '@/components/common/Input'
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
  } = trpc.auth.forgotPassword.useMutation({})

  const onSubmit = async (data: z.infer<typeof GenerateTokenSchema>) => {
    generateResetPasswordTokenMutation({
      ...data,
    })
  }

  return (
    <main
      id='content'
      role='main'
      className='bg-base-100 flex min-h-screen w-full items-center justify-center'>
      <div className='mx-auto w-full max-w-md drop-shadow-2xl  md:p-8'>
        <div className=''>
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
          <h1 className='mb-1 text-3xl font-semibold'>Forgot your password</h1>
          <p className='mb-6 text-secondary'>
            Forgot your password? Please enter your email we&apos;ll send you
            reset link
          </p>
        </div>

        <div className='mt-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <LabelInputContainer className='mb-4'>
                <label htmlFor='email' className=' block text-sm font-medium'>
                  Email
                </label>

                <Input
                  {...register('email')}
                  type='email'
                  id='email'
                  name='email'
                  placeholder='jon@gmail.com'
                />

                {errors?.email && (
                  <p className='text-sm text-danger'>{errors.email.message}</p>
                )}
              </LabelInputContainer>

              <Button
                type='submit'
                className='mb-2 w-full'
                isLoading={isGeneratePasswordPending}
                disabled={isGeneratePasswordPending}>
                Send Reset Link
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default GenerateResetTokenForm
