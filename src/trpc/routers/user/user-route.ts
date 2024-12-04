import { collectionSlug } from '@contentql/core'
import configPromise from '@payload-config'
import { TRPCError } from '@trpc/server'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'

import { router, userProcedure } from '@/trpc/'

import { UpdateProfileImageSchema, UpdateUserSchema } from './validator'

const payload = await getPayload({ config: configPromise })

export const userRouter = router({
  // ! use this route only if you need a user when loading the page
  getUser: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx
    return user
  }),

  updateProfileImage: userProcedure
    .input(UpdateProfileImageSchema)
    .mutation(async ({ input, ctx }) => {
      const { imageUrl } = input
      const { user } = ctx

      try {
        await payload.update({
          collection: collectionSlug.users,
          id: user.id,
          data: {
            imageUrl: imageUrl,
          },
        })

        return { success: true }
      } catch (error: any) {
        console.error('Error updating imageUrl:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        })
      }
    }),

  updateUser: userProcedure
    .input(UpdateUserSchema)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx
      const { confirmPassword, ...data } = input

      console.log({ data })

      if (data.password && data.password !== confirmPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Passwords do not match',
        })
      }

      try {
        console.log({ data })

        const updatedUser = await payload.update({
          collection: collectionSlug.users,
          id: user.id,
          data,
        })

        return updatedUser
      } catch (error: any) {
        console.error('Error updating user:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        })
      }
    }),

  deleteUser: userProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx

    try {
      await payload.delete({
        collection: collectionSlug.users,
        id: user.id,
      })
      const cookieStore = await cookies()
      cookieStore.delete('payload-token')

      return { success: true }
    } catch (error: any) {
      console.error('Error deleting user:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      })
    }
  }),
})
