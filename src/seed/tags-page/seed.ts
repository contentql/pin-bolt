import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'

import { tagsPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

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
