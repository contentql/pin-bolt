'use client'

import { NewsletterType } from '@payload-types'

import Button from '@/components/common/Button'
import { Input } from '@/components/common/Input'

const Newsletter = ({ heading, description, buttonText }: NewsletterType) => {
  return (
    <div className='relative isolate overflow-hidden rounded border bg-popover px-6 py-24 sm:rounded-3xl sm:px-24'>
      <h2 className='mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight sm:text-4xl'>
        {heading}
      </h2>
      <p className='mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-secondary'>
        {description}
      </p>
      <form className='mx-auto mt-10 max-w-md gap-x-4 sm:flex'>
        <label htmlFor='email-address' className='sr-only'>
          Email address
        </label>
        <Input
          id='email-address'
          name='email'
          type='email'
          required
          placeholder='Enter your email'
          autoComplete='email'
        />
        <Button type='submit' className='mt-4 w-full sm:mt-0 sm:w-max'>
          {buttonText}
        </Button>
      </form>
      <svg
        viewBox='0 0 1024 1024'
        aria-hidden='true'
        className='absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2'>
        <circle
          r={512}
          cx={512}
          cy={512}
          fill='url(#759c1415-0410-454c-8f7c-9a820de03641)'
          fillOpacity='0.7'
        />
        <defs>
          <radialGradient
            r={1}
            cx={0}
            cy={0}
            id='759c1415-0410-454c-8f7c-9a820de03641'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(512 512) rotate(90) scale(512)'>
            <stop stopColor='#A978DE' />
            <stop offset={1} stopColor='#A978DE' stopOpacity={0} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Newsletter
