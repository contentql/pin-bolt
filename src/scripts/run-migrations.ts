import { execSync } from 'child_process'
import 'dotenv/config'

const databaseURI = process.env.DATABASE_URI ?? ''
const isMongo = databaseURI && databaseURI.startsWith('mongodb')

if (!isMongo) {
  console.log('Running migrations...')
  execSync('npx cross-env NODE_OPTIONS=--no-deprecation payload migrate', {
    stdio: 'inherit', // This will show the output directly
  })
}

console.log('Skipping migrations...')
