'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input, LabelInputContainer } from '../../common/fields'

import { Alert, AlertDescription } from '@/components/common/Alert'
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
    isError: isSignInError,
    error: signInError,
    isSuccess: isSignInSuccess,
  } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      router.push('/profile')
    },
    onError: () => {
      reset()
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
          <h1 className='mb-6 text-center text-3xl font-semibold text-base-content'>
            Sign In
          </h1>
          <h1 className='mb-6 text-center text-sm font-semibold text-base-content'>
            Join to Our Community with all time access and free{' '}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <LabelInputContainer className='mb-4'>
                <div className='inline-flex justify-between'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-base-content/70'>
                    E-Mail
                  </label>
                  {errors?.email && (
                    <p className='text-sm text-error'>{errors.email.message}</p>
                  )}
                </div>
                <Input
                  {...register('email')}
                  type='text'
                  id='email'
                  name='email'
                  placeholder='john.doe@example.com'
                />
              </LabelInputContainer>
            </div>
            <div>
              <LabelInputContainer className='mb-8'>
                <div className='inline-flex justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-base-content/70'>
                    Password
                  </label>
                  {errors?.password && (
                    <p className='text-sm text-error'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Input
                  {...register('password')}
                  type='password'
                  id='password'
                  name='password'
                  placeholder='● ● ● ● ● ● ● ● ●'
                />
              </LabelInputContainer>
            </div>
            <p className='text-sm text-base-content/70'>
              Forgot your password?{' '}
              <Link className='underline' href='/reset-password'>
                Reset it.
              </Link>
            </p>
            <div>
              <button
                type='submit'
                className='w-full rounded-rounded-btn bg-primary  p-2 text-primary-content transition-all duration-500 hover:bg-primary-focus  focus:outline-none  disabled:cursor-not-allowed disabled:bg-opacity-50'
                disabled={isSignInPending}>
                {isSignInPending ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
          <div className='mt-4 text-center text-sm text-base-content/70'>
            <p>
              Don&apos;t have an account?{' '}
              <a href='/sign-up' className='text-base-content hover:underline'>
                SignUp here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInForm
