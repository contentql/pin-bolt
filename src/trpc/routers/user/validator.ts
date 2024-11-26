import { z } from 'zod'

export const UpdateProfileImageSchema = z.object({
  imageUrl: z.number(),
})

export const UpdateUserSchema = z.object({
  displayName: z.string().optional(),
  password: z.string().min(6).optional(),
  confirmPassword: z.string().min(6).optional(),
  bio: z.string().optional(),
  imageUrl: z.number().optional(),
})
