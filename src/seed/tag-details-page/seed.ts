import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'

import { tagDetailsPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async ({ spinner, id }: { spinner: Ora; id: string }) => {
  spinner.start(`Started creating tags-details-page...`)

  try {
    const result = await payload.create({
      collection: 'pages',
      data: { ...tagDetailsPageData, parent: id },
    })

    spinner.succeed(`Successfully created tags-details-page`)
    return result
  } catch (error) {
    spinner.fail(`Failed creating tags-details-page`)
    throw error
  }
}

export default seed
