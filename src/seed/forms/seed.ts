import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'

import { formsData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora) => {
  spinner.start(`Started uploading form fields...`)

  try {
    // lopping through authors creating authors with images and pushing the author details to usersList
    for await (const details of formsData) {
      try {
        const forms = await payload.create({
          collection: 'forms',
          data: {
            ...details,
          },
        })
      } catch (error) {
        spinner.fail(`Failed creating author accounts...`)
        throw error
      }
    }

    spinner.succeed(`Successfully created author accounts...`)
    return { status: 'contact form creation success' }
  } catch (error) {
    throw error
  }
}

export default seed
