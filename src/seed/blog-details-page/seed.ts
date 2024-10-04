import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'

import { blogDetailsPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async ({ spinner, id }: { spinner: Ora; id: string }) => {
  spinner.start(`Started created blogs-details-page...`)

  try {
    const result = await payload.create({
      collection: 'pages',
      data: { ...blogDetailsPageData, parent: id },
    })

    spinner.succeed(`Successfully created blogs-details-page...`)
    return result
  } catch (error) {
    spinner.fail(`Failed creating blogs-details-page...`)
    throw error
  }
}

export default seed
