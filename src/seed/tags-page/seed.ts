import configPromise from '@payload-config'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { tagsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  try {
    spinner.start(`Started creating tags-page...`)

    const result = await payload.create({
      collection: 'pages',
      data: tagsPageData,
    })

    spinner.succeed(`Successfully created tags-page`)
    return result
  } catch (error) {
    spinner.fail(`Failed to create tags-page`)
    throw error
  }
}

export default seed
