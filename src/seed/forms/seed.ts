import configPromise from '@payload-config'
import { Form } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { formsData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  spinner.start(`Started creating forms...`)
  const formsList: Form[] = []

  try {
    // lopping through authors creating authors with images and pushing the author details to usersList
    for await (const formData of formsData) {
      try {
        const form = await payload.create({
          collection: 'forms',
          data: formData,
        })
        formsList?.push(form)
      } catch (error) {
        spinner.fail(`Failed creating Forms...`)
        throw error
      }
    }

    spinner.succeed(`Successfully created Forms...`)
    return formsList
  } catch (error) {
    throw error
  }
}

export default seed
