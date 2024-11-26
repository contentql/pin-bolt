import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

const client = createClient({
  url: 'file:./seed.db',
  syncUrl: process.env.DATABASE_URI,
  authToken: process.env.DATABASE_SECRET,
})

const cloneSeedDB = () => {
  const filesList = [
    {
      source: path.resolve('seed.db'),
      destination: path.resolve('payload-lite.db'),
    },
    {
      source: path.resolve('seed.db-client_wal_index'),
      destination: path.resolve('payload-lite.db-client_wal_index'),
    },
  ]

  filesList.forEach(({ source, destination }) => {
    try {
      // Copy file
      fs.copyFileSync(source, destination)
      console.log(`File copied from ${source} to ${destination}`)
    } catch (error) {
      console.error('Error copying file:', error)
    }
  })
}

try {
  await client.sync()
  cloneSeedDB()
} catch (error) {
  console.log({ error })
}
