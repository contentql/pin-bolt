import configPromise from '@payload-config'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { authorDetailsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async ({ spinner, id }: { spinner: Ora; id: number }) => {
  spinner.start(`Started created author-details-page...`)

  try {
    const result = await payload.create({
      collection: 'pages',
      data: { ...authorDetailsPageData, parent: id },
    })

    spinner.succeed(`Successfully created author-details-page...`)
    return result
  } catch (error) {
    spinner.fail(`Failed creating author-details-page...`)
    throw error
  }
}

export default seed
