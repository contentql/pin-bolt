import { z } from 'zod'

export const SignUpSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  email: z
    .string()
    .min(1, { message: 'E-mail is required' })
    .email({ message: 'E-mail is invalid' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
  imageUrl: z.string().optional(),
})

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is invalid' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

export const GenerateTokenSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  token: z.string(),
})

export const UnlockSchema = z.object({
  email: z.string().email(),
})

export const VerifyEmailSchema = z.object({
  token: z.string(),
  userId: z.string(),
})
