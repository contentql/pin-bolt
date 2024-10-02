import { type VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInformationCircle,
} from 'react-icons/hi'
import { IconType } from 'react-icons/lib'

import { cn } from '@/utils/cn'

const alertVariants = cva(
  'relative flex gap-4 items-center rounded-rounded-btn w-full rounded p-4',
  {
    variants: {
      variant: {
        default: 'bg-secondary/10',
        danger: 'text-danger bg-danger-foreground',
        success: 'text-success bg-success-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type AlertVariants = VariantProps<typeof alertVariants>

type IconObjectType = {
  [K in NonNullable<AlertVariants['variant']>]: IconType
}

const icon: IconObjectType = {
  danger: HiOutlineExclamationCircle,
  success: HiOutlineCheckCircle,
  default: HiOutlineInformationCircle,
}

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => {
  const IconComponent = icon[variant || 'default']

  return (
    <div
      ref={ref}
      role='alert'
      className={cn(alertVariants({ variant }), className)}
      {...props}>
      <IconComponent className={clsx('size-6 shrink-0')} />
      {children}
    </div>
  )
})
Alert.displayName = 'Alert'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription }
