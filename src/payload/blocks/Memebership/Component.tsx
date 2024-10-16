import { MembershipType } from '@payload-types'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'

import Button from '@/components/common/Button'
import { cn } from '@/utils/cn'
import { useUserContext } from '@/utils/userContext'

const Component = ({ title, planList }: MembershipType) => {
  const user = useUserContext()

  return (
    <section className='space-y-4'>
      <p className='font-semibold'>{title}</p>

      <div className='grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3'>
        {planList.map(({ id, plan, popular }, index) => {
          if (!plan || typeof plan === 'string') {
            return null
          }

          const {
            name,
            price,
            description,
            features,
            stripePaymentLink,
            stripePriceId,
            stripeProductId,
          } = plan

          const paymentLink =
            typeof user !== 'string' ? stripePaymentLink : '/sign-up'

          return (
            <div
              key={id ?? index}
              className={cn(
                popular
                  ? 'bg-primary/5 ring-2 ring-primary/50'
                  : 'ring-1 ring-white/10',
                'rounded p-8 xl:p-10',
              )}>
              <div className='flex items-center justify-between gap-x-4'>
                <h2 className='text-lg font-semibold leading-8'>{name}</h2>
                {popular ? (
                  <p className='rounded-full bg-primary/50 px-2.5 py-1 text-xs font-semibold leading-5'>
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className='mt-4 text-secondary'>{description}</p>

              <p className='mt-6 flex items-baseline gap-x-1'>
                <span className='text-4xl font-bold tracking-tight'>
                  ${price}
                </span>
                <span className='text-sm font-semibold leading-6 text-secondary'>
                  /month
                </span>
              </p>

              <Link href={paymentLink ?? ''} target='_blank'>
                <Button
                  variant={popular ? 'default' : 'outline'}
                  className='mt-6 w-full'>
                  Sign up now
                </Button>
              </Link>

              <ul
                role='list'
                className='mt-8 space-y-3 text-sm leading-6 xl:mt-10'>
                {features
                  ? features.map(({ feature, id }, i) => (
                      <li key={id ?? i} className='flex items-center gap-x-3'>
                        <CheckIcon
                          aria-hidden='true'
                          className='size-4 flex-none'
                        />
                        {feature}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Component
