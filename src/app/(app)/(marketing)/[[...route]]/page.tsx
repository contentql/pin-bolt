import { env } from '@env'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

import { blocksJSX } from '@/payload/blocks/blocks'
import { serverClient } from '@/trpc/serverClient'

const payload = await getPayloadHMR({
  config: configPromise,
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ route: string[] }>
}): Promise<Metadata | {}> {
  const { route = [] } = await params
  // Cache the getPageData function
  const cachedGetPageData = unstable_cache(
    async (path: string[]) => {
      return await serverClient.page.getPageData({ path })
    },
    ['page-data', ...route],
    { revalidate: 60 }, // Revalidate every 60 seconds
  )

  try {
    // calling the site-settings to get all the data
    const pageData = await cachedGetPageData(route)

    let metadata = pageData.meta

    const block = pageData.layout
      ?.filter(block => block.blockType === 'Details')
      ?.at(0)

    // checking for dynamic page
    if (
      pageData?.isDynamic &&
      block?.collectionSlug &&
      block?.collectionSlug !== 'users'
    ) {
      const { docs } = await payload.find({
        collection: block?.collectionSlug,
        where: {
          slug: {
            equals: route.at(-1),
          },
        },
        depth: 5,
      })

      const doc = docs?.at(0)

      metadata = doc?.meta || {}
    }

    if (metadata && Object.keys(metadata).length) {
      let ogImage = []
      const title = metadata.title
      const description = metadata.description

      if (metadata.image && typeof metadata.image !== 'string') {
        ogImage.push({
          url: metadata.image?.url!,
          height: 630,
          width: 1200,
          alt: `og image`,
        })
      }

      return {
        title,
        description,
        // we're appending the http|https int the env variable
        metadataBase: env.PAYLOAD_URL as unknown as URL,
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

const Page = async ({ params }: { params: Promise<{ route: string[] }> }) => {
  const resolvedParams = await params
  // Cache the getPageData function
  const cachedGetPageData = unstable_cache(
    async (path: string[]) => {
      return await serverClient.page.getPageData({ path: path || [] })
    },
    ['page-data', ...(resolvedParams.route || [])],
    { revalidate: 60 }, // Revalidate every 60 seconds
  )

  try {
    const pageData = await cachedGetPageData(resolvedParams.route || [])

    return (
      <div className='relative space-y-20'>
        {pageData?.layout
          ? pageData?.layout?.map((block, index) => {
              // Casting to 'React.FC<any>' to bypass TypeScript error related to 'Params' type incompatibility.
              const Block = blocksJSX[block.blockType] as React.FC<any>

              if (Block) {
                return <Block {...block} params={resolvedParams} key={index} />
              }

              return <h3 key={block.id}>Block does not exist </h3>
            })
          : null}
      </div>
    )
  } catch (error) {
    console.error('Error: Page not found')
    notFound()
  }
}

export default Page
