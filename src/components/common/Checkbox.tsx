'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'
import { FaCheck } from 'react-icons/fa6'

import { cn } from '@/utils/cn'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'focus-visible:ring-ring data-[state=checked]:text-primary-content peer h-5 w-5 shrink-0 rounded-md border-2 border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary',
      className,
    )}
    {...props}>
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}>
      <FaCheck className='h-4 w-4' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
