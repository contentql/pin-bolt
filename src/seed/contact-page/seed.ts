import configPromise from '@payload-config'
import { Form } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug } from 'payload'

import { ContactPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async ({ spinner, forms }: { spinner: Ora; forms: Form[] }) => {
  spinner.start(`Started created contact-page...`)

  const ContactPageResult: RequiredDataFromCollectionSlug<'pages'> = {
    ...ContactPageData,
    layout: ContactPageData?.layout?.map((block, index) => {
      if (block?.blockType === 'FormBlock') {
        return {
          ...block,
          form: {
            relationTo: 'forms',
            value: forms?.at(0)?.id!,
          },
        }
      }
      return block
    }),
  }

  try {
    const result = await payload.create({
      collection: 'pages',
      data: ContactPageResult,
    })

    spinner.succeed(`Successfully created contact-page...`)
    return result
  } catch (error) {
    spinner.fail(`Failed creating contact-page...`)
    throw error
  }
}

export default seed
