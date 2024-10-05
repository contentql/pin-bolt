'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import Button from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { trpc } from '@/trpc/client'
import { EmailSchema } from '@/trpc/routers/subscribe/validator'
import { cn } from '@/utils/cn'

const Form = ({
  buttonText = 'Subscribe',
  className = '',
}: {
  buttonText: string
  className?: string
}) => {
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  })

  const { mutate, isPending } = trpc.subscribe.createSubscriber.useMutation()

  const { register, handleSubmit, reset } = form

  const onSubmit = (data: z.infer<typeof EmailSchema>) => {
    mutate(
      { email: data.email },
      {
        onSuccess: data => {
          toast.success('Successfully subscribed!')
          reset()
        },
        onError: error => {
          toast.error('Failed to subscribe, please try again!')

          console.log({ error })
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-2 sm:flex-row', className)}>
      <label htmlFor='email-address' className='sr-only'>
        Email address
      </label>
      <Input
        id='email-address'
        type='email'
        {...register('email')}
        required
        placeholder='Enter your email'
        autoComplete='email'
      />
      <Button
        isLoading={isPending}
        disabled={isPending}
        type='submit'
        className='mt-4 w-full sm:mt-0 sm:w-max'>
        {buttonText}
      </Button>
    </form>
  )
}

export default Form
