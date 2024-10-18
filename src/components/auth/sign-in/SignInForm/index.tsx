'use client'

import { LabelInputContainer } from '../../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertDescription } from '@/components/common/Alert'
import Button from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { trpc } from '@/trpc/client'
import { SignInSchema } from '@/trpc/routers/auth/validator'

const SignInForm: React.FC = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form

  const {
    mutate: signInMutation,
    isPending: isSignInPending,
    error: signInError,
    isSuccess: isSignInSuccess,
  } = trpc.auth.signIn.useMutation({
    onSuccess: result => {
      const isAdmin = result?.user?.role?.includes('admin')

      if (isAdmin) {
        router.push('/admin')
      } else {
        router.push('/profile')
      }
    },
  })

  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    signInMutation({
      ...data,
    })
  }

  return (
    <div className='flex w-full items-center justify-center'>
      <div className='mx-auto w-full max-w-md  drop-shadow-2xl'>
        <div className='w-full max-w-md p-6'>
          {isSignInSuccess ? (
            <Alert variant='success' className='mb-12'>
              <AlertDescription>
                Successfully logged in! Redirecting...
              </AlertDescription>
            </Alert>
          ) : signInError ? (
            <Alert variant='danger' className='mb-12'>
              <AlertDescription>
                Sign in failed. Check the details you provided are incorrect.
              </AlertDescription>
            </Alert>
          ) : null}
          <h1 className=' mb-1 text-3xl font-semibold'>Sign In</h1>
          <p className='mb-6 text-secondary'>
            Join our Community with all time access and free{' '}
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <LabelInputContainer className='mb-4'>
                <label htmlFor='email' className=' block text-sm font-medium'>
                  Email
                </label>

                <Input
                  {...register('email')}
                  type='text'
                  id='email'
                  autoComplete='email'
                  name='email'
                  placeholder='john.doe@example.com'
                />

                {errors?.email && (
                  <p className='text-sm text-danger'>{errors.email.message}</p>
                )}
              </LabelInputContainer>
            </div>
            <div>
              <LabelInputContainer className='mb-8'>
                <label htmlFor='password' className='block text-sm font-medium'>
                  Password
                </label>

                <Input
                  {...register('password')}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='● ● ● ● ● ● ● ● ●'
                />

                {errors?.password && (
                  <p className='text-sm text-danger'>
                    {errors.password.message}
                  </p>
                )}
              </LabelInputContainer>
            </div>

            <p className='mb-2 text-sm text-secondary'>
              Forgot your password?{' '}
              <Link
                className='text-primary hover:underline'
                href='/forgot-password'>
                Reset it.
              </Link>
            </p>

            <div>
              <Button
                type='submit'
                className='w-full'
                isLoading={isSignInPending}
                disabled={isSignInPending}>
                Sign In
              </Button>
            </div>
          </form>
          <div className='mt-8 text-center text-sm text-secondary'>
            <p>
              Don&apos;t have an account?{' '}
              <Link href='/sign-up' className='text-primary hover:underline'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInForm
