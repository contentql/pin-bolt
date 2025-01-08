import { z } from 'zod'

export const UpdateUserSchema = z.object({
  displayName: z.string().optional(),
  password: z.string().min(6).optional(),
  confirmPassword: z.string().min(6).optional(),
  bio: z.string().optional(),
  imageUrl: z.union([z.string(), z.number()]).optional(),
})
