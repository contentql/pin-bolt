import { env } from '@env'
import configPromise from '@payload-config'
import { DetailsType, ListType } from '@payload-types'
import { dehydrate } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import ReactQueryHydrate from '@/components/ReactQueryHydrate'
import RenderBlocks from '@/payload/blocks/RenderBlocks'
import { serverClient } from '@/trpc/serverClient'
import { createSSRHelper } from '@/trpc/ssr'

type StaticRoute = { route: string | string[] | null }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ route: string[] }>
}): Promise<Metadata | {}> {
  const payload = await getPayload({
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
            equals: route.at(-1) ?? '',
          },
        },
        depth: 5,
      })

      const doc = docs?.at(0)

      metadata = doc?.meta || {}
    }

    if (metadata && Object.keys(metadata).length) {
      let ogImage = []
      const title = metadata.title ?? ''
      const description = metadata.description ?? ''

      const titleAndDescription = {
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
      }

      if (
        metadata.image &&
        typeof metadata.image === 'object' &&
        metadata.image?.url
      ) {
        ogImage.push({
          url: metadata.image.url,
          height: 630,
          width: 1200,
          alt: `og image`,
        })
      }

      return {
        ...titleAndDescription,
        // we're appending the http|https int the env variable
        metadataBase: env.PAYLOAD_URL as unknown as URL,
        openGraph: {
          ...titleAndDescription,
          images: ogImage,
        },
        twitter: {
          ...titleAndDescription,
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

const staticGenerationMapping = {
  blogs: serverClient.blog.getAllBlogs(),
  tags: serverClient.tag.getAllTags(),
  users: serverClient.author.getAllAuthors(),
} as const

// export async function generateStaticParams(): Promise<StaticRoute[]> {
//   const allPagesData = await serverClient.page.getAllPages()
//   const staticParams: StaticRoute[] = []

//   for (const page of allPagesData) {
//     if (!page) {
//       continue // Skip invalid pages
//     }

//     // If the route is dynamic (contains `[`)
//     if (page?.path?.includes('[') && page.layout) {
//       const blockData = page.layout.find(block => block.blockType === 'Details')

//       // If it has a Details block with a valid collectionSlug
//       if (blockData?.blockType === 'Details' && blockData.collectionSlug) {
//         const slug = blockData.collectionSlug

//         // Fetch all slugs for the given collection (e.g., blogs, tags, users)
//         const data = await staticGenerationMapping[slug]

//         if (data && Array.isArray(data)) {
//           let path = ''
//           for (const item of data) {
//             if ('username' in item) {
//               path = item.username
//             } else if ('slug' in item) {
//               path = `${item.slug}`
//             }

//             // Dynamically replace `[parameter]` with actual slug
//             const dynamicPath = page.path.replace(/\[(.*?)\]/, path)

//             staticParams.push({
//               route: dynamicPath.split('/').filter(Boolean),
//             })
//           }
//         }
//         continue
//       }
//     }

//     // Statics (non-dynamic paths)
//     const nonDynamicPath = page?.path?.split('/').filter(Boolean)[0]
//     if (nonDynamicPath) {
//       staticParams.push({ route: [nonDynamicPath] })
//     }
//   }

//   return staticParams
// }

const Page = async ({ params }: { params: Promise<{ route: string[] }> }) => {
  const resolvedParams = (await params).route
  const helpers = await createSSRHelper()

  const listPrefetch: {
    [key in NonNullable<ListType['collectionSlug']>]: undefined | Promise<void>
  } = {
    blogs: helpers.blog.getPaginatedBlogs.prefetchInfinite({
      limit: 10,
    }),
    users: helpers.author.getAllAuthorsWithCount.prefetchInfinite({
      limit: 10,
    }),
    tags: helpers.tag.getPaginatedTags.prefetchInfinite({
      limit: 10,
    }),
  }

  const detailsPrefetch: {
    [key in NonNullable<DetailsType['collectionSlug']>]:
      | undefined
      | Promise<void>
  } = {
    blogs: helpers.blog.getBlogBySlug.prefetch({
      slug: resolvedParams?.at(-1) ?? '',
    }),
    tags: helpers.tag.getBlogsByTag.prefetch({
      tagSlug: resolvedParams?.at(-1) ?? '',
    }),
    users: helpers.author.getBlogsByAuthorName.prefetch({
      authorName: resolvedParams?.at(-1) ?? '',
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
              console.log('details block hitted')

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

    return (
      <ReactQueryHydrate state={dehydratedState}>
        {/* <div className='relative space-y-20'>
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
        </div> */}

        <RenderBlocks
          params={{ route: resolvedParams }}
          placeholderData={pageData}
        />
      </ReactQueryHydrate>
    )
  } catch (error) {
    console.error('Error: Page not found', error)
    notFound()
  }
}

export default Page
