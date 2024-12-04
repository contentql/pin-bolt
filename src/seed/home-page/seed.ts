import configPromise from '@payload-config'
import { Ora } from 'ora'
import path from 'path'
import { getPayload } from 'payload'
import process from 'process'

import { homePageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora) => {
  try {
    spinner.start(`Started created home-page...`)

    const boltImage = await payload.create({
      collection: 'media',
      filePath: path.join(process.cwd(), '/public/images/seed/hero-image.jpg'),
      data: {
        alt: 'Hero image',
      },
    })

    const result = await payload.create({
      collection: 'pages',
      data: {
        ...homePageData,
        layout: [
          {
            heading: 'Hi there👋',
            subHeading:
              'I’m ⚡Bolt. YouTuber, Podcaster, and the author of the New York Times bestseller, Feel Good Productivity.',
            image: boltImage.id,
            subscribeField: true,
            blockType: 'Home',
          },
          ...(homePageData.layout || []),
        ],
      },
    })

    spinner.succeed(`Successfully created home-page`)

    return { homePage: result, authorImage: boltImage }
  } catch (error) {
    spinner.succeed(`Failed to create home-page`)
    throw error
  }
}

export default seed
