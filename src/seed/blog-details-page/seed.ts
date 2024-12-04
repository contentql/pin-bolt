import configPromise from '@payload-config'
import { Form } from '@payload-types'
import { Ora } from 'ora'
import { getPayload } from 'payload'

import { blogDetailsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async ({
  spinner,
  id,
  forms,
}: {
  spinner: Ora
  id: number
  forms: Form[]
}) => {
  spinner.start(`Started created blogs-details-page...`)

  const newsletterForm = forms.find(form => form.title === 'Newsletter Form')

  try {
    const result = await payload.create({
      collection: 'pages',
      data: {
        ...blogDetailsPageData,
        parent: id,
        layout: [
          ...(blogDetailsPageData.layout ?? []),
          {
            blockType: 'Newsletter',
            heading: '🔔 Subscribe to our Newsletter',
            description: 'Stay up to date with our latest news and products',
            ...(newsletterForm
              ? {
                  form: newsletterForm.id,
                }
              : {}),
          },
        ],
      },
    })

    spinner.succeed(`Successfully created blogs-details-page...`)
    return result
  } catch (error) {
    spinner.fail(`Failed creating blogs-details-page...`)
    throw error
  }
}

export default seed
