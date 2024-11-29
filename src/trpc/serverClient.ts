import { createCallerFactory } from '@/trpc'
import { appRouter } from '@/trpc/routers'

const createCaller = createCallerFactory(appRouter)

export const serverClient = createCaller({})
