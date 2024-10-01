import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { TRPCError } from '@trpc/server'

import { publicProcedure, router } from '@/trpc'

import { EmailSchema } from './validator'

const payload = await getPayloadHMR({
  config: configPromise,
})

export const subscriberRouter = router({
  createSubscriber: publicProcedure
    .input(EmailSchema)
    .mutation(async ({ input }) => {
      try {
        let { email } = input

        const response = await payload.create({
          collection: 'subscribers',
          data: {
            email,
          },
        })

        return response
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error
        }

        console.error('Error fetching page data:', error)

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to subscribe, please try again!',
        })
      }
    }),
})
