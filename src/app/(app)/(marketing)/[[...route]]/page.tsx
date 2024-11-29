import { env } from '@env'
import configPromise from '@payload-config'
import { DetailsType, ListType } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ReactQueryHydrate from '@/components/ReactQueryHydrate'
// import RenderBlocks from '@/payload/blocks/RenderBlocks'
import { blocksJSX } from '@/payload/blocks/blocks'
import { serverClient } from '@/trpc/serverClient'
import { createSSRHelper } from '@/trpc/ssr'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ route: string[] }>
}): Promise<Metadata | {}> {
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const { route = [] } = await params

  try {
    // calling the site-settings to get all the data
    const pageData = await serverClient.page.getPageData({ path: route })

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

      if (metadata.image && typeof metadata.image === 'object') {
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

export async function generateStaticParams() {
  const allPagesData = await serverClient.page.getAllPages()

  // console.log(allPagesData)

  // return allPagesData.map(page => ({
  //   route: page.path,
  // }))

  return [
    { route: ['posts'] },
    { route: ['team'] },
    { route: ['post', 'dynamic-access-in-javascript'] },
  ]
}

const Page = async ({ params }: { params: Promise<{ route: string[] }> }) => {
  const resolvedParams = (await params).route
  const helpers = await createSSRHelper()

  const listPrefetch: {
    [key in NonNullable<ListType['collectionSlug']>]: undefined | Promise<void>
  } = {
    blogs: helpers.blog.getAllBlogs.prefetchInfinite({
      limit: 10,
    }),
    users: helpers.author.getAllAuthorsWithCount.prefetchInfinite({
      limit: 10,
    }),
    tags: helpers.tag.getAllTags.prefetchInfinite({
      limit: 10,
    }),
  }

  const detailsPrefetch: {
    [key in NonNullable<DetailsType['collectionSlug']>]:
      | undefined
      | Promise<void>
  } = {
    blogs: helpers.blog.getBlogBySlug.prefetch({
      slug: resolvedParams?.at(-1)!,
    }),
    tags: helpers.tag.getBlogs.prefetch({
      tagSlug: resolvedParams?.at(-1)!,
    }),
    users: helpers.author.getBlogsByAuthorName.prefetch({
      authorName: resolvedParams?.at(-1)!,
    }),
  }

  try {
    const pageData = await serverClient.page.getPageData({
      path: resolvedParams || [],
    })

    const layoutData = pageData.layout ?? []

    if (layoutData.length) {
      for await (const block of layoutData) {
        switch (block.blockType) {
          case 'List':
            if (block.collectionSlug) {
              const selectedListPrefetch = listPrefetch[block.collectionSlug]

              if (selectedListPrefetch) {
                await selectedListPrefetch
              }
            }
            break
          case 'Details':
            if (block.collectionSlug) {
              const selectedDetailsPrefetch =
                detailsPrefetch[block.collectionSlug]
              if (selectedDetailsPrefetch) {
                await selectedDetailsPrefetch
              }
            }
            break
        }
      }
    }

    const dehydratedState = dehydrate(helpers.queryClient)

    // const blocks = Array.isArray(pageData.layout)
    //   ? pageData.layout.filter(
    //       individualBlock => individualBlock.blockType === 'List',
    //     )
    //   : undefined

    //   let data

    // switch (block?.collectionSlug) {
    //   case 'blogs': {
    //     data = await serverClient.blog.getBlogBySlug({
    //       slug: resolvedParams?.at(-1)!,
    //     })
    //   }

    //   case 'tags': {
    //     data = await serverClient.tag.getBlogs({
    //       tagSlug: resolvedParams?.at(-1)!,
    //     })
    //   }

    //   case 'users': {
    //     data = await serverClient.author.getAuthorByName({
    //       authorName: resolvedParams?.at(-1)!,
    //     })
    //   }
    // }

    return (
      <ReactQueryHydrate state={dehydratedState}>
        <div className='relative space-y-20'>
          {pageData?.layout?.map((block, index) => {
            // Casting to 'React.FC<any>' to bypass TypeScript error related to 'Params' type incompatibility.
            const Block = blocksJSX[block.blockType] as React.FC<any>

            if (Block) {
              return (
                <Block
                  {...block}
                  params={{ route: resolvedParams }}
                  key={index}
                />
              )
            }

            return <h3 key={block.id}>Block does not exist </h3>
          })}
        </div>
      </ReactQueryHydrate>
    )
  } catch (error) {
    console.error('Error: Page not found', error)
    notFound()
  }
}

export default Page
