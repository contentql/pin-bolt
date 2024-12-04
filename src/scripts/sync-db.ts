import { createClient } from '@libsql/client'

import { prodSyncClient } from '@/db/client'

const client = createClient(prodSyncClient)

try {
  await client.sync()
} catch (error) {
  console.log({ error })
}
