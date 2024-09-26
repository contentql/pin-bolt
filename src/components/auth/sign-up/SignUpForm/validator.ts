import { z } from 'zod'

export const SignUpFormSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: 'Username must be at least 4 characters long' })
      .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, {
        message:
          'Must start and end with a lowercase letter or number, with hyphens allowed in between',
      }),
    email: z
      .string()
      .min(1, { message: 'E-mail is required' })
      .email({ message: 'E-mail is invalid' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, {
      message: 'Confirm Password must be at least 6 characters long',
    }),
    imageUrl: z.string().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignUpFormData = z.infer<typeof SignUpFormSchema>
