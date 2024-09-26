import { env } from '@env'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { TRPCError } from '@trpc/server'
import { cookies } from 'next/headers'

import { sendResetPasswordEmail } from '@/components/auth/reset-password/ResetPasswordForm/sendResetPasswordEmail'
import { publicProcedure, router } from '@/trpc'

import {
  GenerateTokenSchema,
  ResetPasswordSchema,
  SignInSchema,
  SignUpSchema,
} from './validator'

const payload = await getPayloadHMR({
  config: configPromise,
})

export const authRouter = router({
  signUp: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, email, password } = input

      try {
        // Check if email already exists
        const emailExists = await payload.find({
          collection: 'users',
          where: {
            email: {
              equals: email,
            },
          },
        })

        if (emailExists.totalDocs > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `${email} already exists`,
          })
        }

        // Check if username already exists
        const usernameExists = await payload.find({
          collection: 'users',
          where: {
            username: {
              equals: username,
            },
          },
        })

        if (usernameExists.totalDocs > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `${username} already exists`,
          })
        }

        const result = await payload.create({
          collection: 'users',
          data: {
            username,
            email,
            password,
          },
          locale: undefined,
          fallbackLocale: undefined,
          overrideAccess: true,
          disableVerificationEmail: true, // Set to false if you want to enable verification email
        })

        const loginResult = await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          depth: 2,
          locale: undefined,
          fallbackLocale: undefined,
          overrideAccess: false,
          showHiddenFields: true,
        })
        const cookieStore = cookies()
        cookieStore.set('payload-token', loginResult.token || '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })

        return result
      } catch (error: any) {
        console.error('Error signing up:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        })
      }
    }),

  signIn: publicProcedure
    .input(SignInSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input

      try {
        const result = await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          depth: 2,
          locale: undefined,
          fallbackLocale: undefined,
          overrideAccess: false,
          showHiddenFields: true,
        })
        const cookieStore = cookies()
        cookieStore.set('payload-token', result.token || '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })

        return result
      } catch (error: any) {
        console.error('Error signing in:', error)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        })
      }
    }),

  forgotPassword: publicProcedure
    .input(GenerateTokenSchema)
    .mutation(async ({ input }) => {
      const { email } = input

      try {
        const token = await payload.forgotPassword({
          collection: 'users',
          data: {
            email,
          },
        })

        const { docs: users, totalDocs: usersCount } = await payload.find({
          collection: 'users',
          where: {
            email: {
              equals: email,
            },
          },
        })

        if (!usersCount) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }

        const user = users.at(0)

        if (env.RESEND_SENDER_EMAIL && user?.username) {
          await sendResetPasswordEmail(email, user?.username, token)
        }

        return { success: true, token }
      } catch (error: any) {
        console.error('Error during forgot password:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        })
      }
    }),

  resetPassword: publicProcedure
    .input(ResetPasswordSchema)
    .mutation(async ({ input }) => {
      const { password, token } = input

      try {
        const result = await payload.resetPassword({
          collection: 'users',
          data: {
            password,
            token,
          },
          overrideAccess: true,
        })

        return result
      } catch (error: any) {
        console.error('Error resetting password:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message,
        })
      }
    }),

  //   unlock: publicProcedure.input(UnlockSchema).mutation(async ({ input }) => {
  //     const { email } = input

  //     try {
  //       const result = await payload.unlock({
  //         collection: 'users',
  //         data: {
  //           email,
  //         },
  //         overrideAccess: true,
  //       })

  //       return { success: result }
  //     } catch (error: any) {
  //       console.error('Error unlocking user:', error)
  //       throw new TRPCError({
  //         code: 'INTERNAL_SERVER_ERROR',
  //         message: error.message,
  //       })
  //     }
  //   }),

  //   verifyEmail: publicProcedure
  //     .input(VerifyEmailSchema)
  //     .mutation(async ({ input }) => {
  //       const { token } = input

  //       try {
  //         const result = await payload.verifyEmail({
  //           collection: 'users',
  //           token,
  //         })

  //         return { success: result }
  //       } catch (error: any) {
  //         console.error('Error verifying email:', error)
  //         throw new TRPCError({
  //           code: 'INTERNAL_SERVER_ERROR',
  //           message: error.message,
  //         })
  //       }
  //     }),
})
