import { Page as PageType } from '@payload-types'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import RenderBlocks from '@/payload/blocks/RenderBlocks'
import { serverClient } from '@/trpc/serverClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: { route: string[] }
}): Promise<Metadata | {}> {
  try {
    // calling the site-settings to get all the data
    const pageData = await serverClient.page.getPageData({
      path: params?.route,
    })

    const metadata = pageData.meta

    console.log({ metadata })

    if (metadata && Object.keys(metadata).length) {
      let ogImage = []
      const title = metadata.title
      const description = metadata.description

      if (metadata.image && typeof metadata.image !== 'string') {
        ogImage.push({
          url: metadata.image.sizes?.blogImageSize2?.url!,
          height: 630,
          width: 1200,
          alt: `og image`,
        })
      }

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          images: ogImage,
        },
        twitter: {
          title,
          description,
          images: ogImage,
        },
      }
    }

    return {}
  } catch (error) {
    // in error case returning empty object
    return {}
  }
}

const Page = async ({ params }: { params: { route: string[] } }) => {
  try {
    const pageData = await serverClient.page.getPageData({
      path: params?.route,
    })

    return (
      <RenderBlocks pageInitialData={pageData as PageType} params={params} />
    )
  } catch (error) {
    console.error('Error: Page not found')
    notFound()
  }
}

export default Page
