import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { z } from 'zod'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayloadHMR({ config: configPromise })

export const formRouter = router({
  getAllCountries: publicProcedure.query(async () => {
    try {
      const res = await fetch('https://restcountries.com/v3.1/all')
      if (!res.ok) {
        throw new Error('Failed to fetch countries')
      }

      const countries = await res.json()

      return countries.map((country: any) => ({
        name: country.name?.common ?? 'Unknown',
        flag: country.flags?.svg ?? '',
      }))
    } catch (error: any) {
      console.error(error)
      throw new Error(error.message)
    }
  }),
  newFormSubmission: publicProcedure
    ?.input(
      z.object({
        id: z.string(),
        data: z.array(
          z.object({
            field: z.string(),
            value: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { id, data } = input
        const submission = await payload.create({
          collection: 'form-submissions',
          data: {
            form: id,
            submissionData: data,
          },
        })
        return submission
      } catch (error: any) {
        console.log('Error', error.message)
      }
    }),
})
