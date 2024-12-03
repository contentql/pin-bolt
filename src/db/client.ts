import dotenv from 'dotenv'

dotenv.config()

export const developmentClient = {
  url: 'file:./payload-lite.db',
}

export const prodNoSyncClient = {
  url: process.env.DATABASE_URI!,
  authToken: process.env.DATABASE_SECRET!,
}

export const prodSyncClient = {
  url: 'file:./payload-lite.db',
  syncUrl: process.env.DATABASE_URI!,
  authToken: process.env.DATABASE_SECRET!,
  syncInterval: 60,
}
