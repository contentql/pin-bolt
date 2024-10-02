'use client'

import { LabelInputContainer } from '../../common/fields'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import slugify from 'slugify'
import { toast } from 'sonner'

import { Alert, AlertDescription } from '@/components/common/Alert'
import Button from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { trpc } from '@/trpc/client'

import { SignUpFormData, SignUpFormSchema } from './validator'

const SignUpForm: React.FC = () => {
  const router = useRouter()

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema),
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form

  const {
    mutate: signUpMutation,
    isPending: isSignUpPending,
    isError: isSignUpError,
    error: signUpError,
    isSuccess: isSignUpSuccess,
    variables,
  } = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      reset()
    },
    onError: () => {
      toast.error('Unable to create an account, try again!')
    },
  })

  const onSubmit = async (data: SignUpFormData) => {
    const { confirmPassword, ...userData } = data

    signUpMutation({
      ...userData,
    })
  }

  if (isSignUpSuccess) {
    return (
      <div className='flex w-full items-center justify-center'>
        <Alert variant='success' className='max-w-md'>
          <AlertDescription>
            A email has be sent to {variables.email}, Please check your mail to
            login
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className='flex w-full items-center justify-center'>
      <div className='w-full max-w-md p-6'>
        {isSignUpSuccess ? (
          <Alert variant='success' className='mb-12'>
            <AlertDescription>
              Successfully Signed up ! Redirecting...
            </AlertDescription>
          </Alert>
        ) : isSignUpError ? (
          <Alert variant='danger' className='mb-12'>
            <AlertDescription>
              Sign up failed. Check the details you provided.
            </AlertDescription>
          </Alert>
        ) : null}
        <h1 className=' mb-1 text-3xl font-semibold'>Sign Up</h1>
        <p className='mb-6 text-secondary'>
          Join our Community with all time access and free{' '}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <LabelInputContainer className='mb-4'>
              <label htmlFor='username' className='block text-sm font-medium'>
                Username
              </label>

              <Input
                {...register('username', {
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = slugify(event.target.value, {
                      remove: /[*+~.()'"!:@]/g,
                      lower: true,
                      strict: true,
                      locale: 'en',
                      trim: false,
                    })
                    setValue('username', value, { shouldValidate: true })
                  },
                })}
                type='text'
                id='username'
                name='username'
                placeholder='john-doe'
              />

              {errors?.username && (
                <p className='text-sm text-danger'>{errors.username.message}</p>
              )}
            </LabelInputContainer>
          </div>

          <div>
            <LabelInputContainer className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium'>
                Email
              </label>

              <Input
                {...register('email')}
                type='text'
                id='email'
                name='email'
                placeholder='john.doe@example.com'
              />
              {errors?.email && (
                <p className='text-sm text-danger'>{errors.email.message}</p>
              )}
            </LabelInputContainer>
          </div>
          <div>
            <LabelInputContainer className='mb-4'>
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
                <p className='text-sm text-danger'>{errors.password.message}</p>
              )}
            </LabelInputContainer>
          </div>
          <div>
            <LabelInputContainer className='mb-8'>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium'>
                Confirm Password
              </label>

              <Input
                {...register('confirmPassword')}
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                placeholder='● ● ● ● ● ● ● ● ●'
              />
              {errors?.confirmPassword && (
                <p className='text-sm text-danger'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </LabelInputContainer>
          </div>
          <div>
            <Button
              type='submit'
              className='w-full'
              isLoading={isSignUpPending}
              disabled={isSignUpPending}>
              Sign Up
            </Button>
          </div>
        </form>

        <div className='mt-8 text-center text-sm text-secondary'>
          <p>
            Already have an account?{' '}
            <Link href='/sign-in' className='text-primary hover:underline'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
