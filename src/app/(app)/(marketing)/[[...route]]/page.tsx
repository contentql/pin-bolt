import { env } from '@env'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import { blocksJSX } from '@/payload/blocks/blocks'
import { serverClient } from '@/trpc/serverClient'
import { ensurePath } from '@/utils/ensurePath'
import { matchNextJsPath } from '@/utils/matchNextJsPath'

type StaticRoute = { route: string | string[] | null }
export const dynamic = 'force-static'
// revalidates every 10mins
export const revalidate = 600
// allows dynamic params static generation
export const dynamicParams = true

const cachedPageData = (route?: string | string[]) => {
  if (!route) route = '/'
  if (Array.isArray(route)) route = route.join('/')
  if (route !== '/') route = ensurePath(route).replace(/\/$/, '')

  return unstable_cache(
    async () => {
      const payload = await getPayload({
        config: configPromise,
      })

      const { docs: pageData } = await payload.find({
        collection: 'pages',
        depth: 5,
        overrideAccess: true,
        draft: false,
        where: {
          path: {
            equals: route,
          },
        },
      })

      if (pageData.length) {
        return pageData?.[0]
      } else {
        const { docs: allPages } = await payload.find({
          collection: 'pages',
          depth: 5,
          overrideAccess: true,
          draft: false,
        })

        if (!allPages?.length) {
          return undefined
        }

        const correctMatching = allPages.find(page => page.path === route)

        const matchingPage =
          correctMatching ??
          allPages.find(page => matchNextJsPath(route, page.path!))

        if (!matchingPage) {
          return undefined
        }

        return matchingPage
      }
    },
    ['pages', route],
    {
      tags: [`page-${route}`], // Dynamic tag based on the route
    },
  )
}

const Page = async ({ params }: { params: Promise<{ route: string[] }> }) => {
  const resolvedParams = (await params).route

  const pageData = await cachedPageData(resolvedParams)()

  if (!pageData) {
    return notFound()
  }

  const layoutData = pageData.layout ?? []

  return (
    <div className='relative space-y-20'>
      {layoutData?.map((block, index) => {
        // Casting to 'React.FC<any>' to bypass TypeScript error related to 'Params' type incompatibility.
        const Block = blocksJSX[block.blockType] as React.FC<any>

        if (Block) {
          return (
            <Block {...block} params={{ route: resolvedParams }} key={index} />
          )
        }

        return <h3 key={block.id}>Block does not exist </h3>
      })}
    </div>
  )
}

export default Page

// generates metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ route: string[] }>
}): Promise<Metadata | {}> {
  const payload = await getPayload({
    config: configPromise,
  })

  const { route } = await params

  try {
    const pageData = await cachedPageData(route)()

    if (!pageData) {
      return {}
    }

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

      const hasOGData = ogImage.length && Object.keys(titleAndDescription)

      return {
        ...titleAndDescription,
        // we're appending the http|https int the env variable
        metadataBase: env.PAYLOAD_URL as unknown as URL,
        ...(hasOGData
          ? {
              openGraph: {
                ...titleAndDescription,
                images: ogImage,
              },
            }
          : {}),
        ...(hasOGData
          ? {
              twitter: {
                ...titleAndDescription,
                images: ogImage,
              },
            }
          : {}),
      }
    }

    return {}
  } catch (error) {
    // in error case returning empty object
    return {}
  }
}

// generate static-pages
const staticGenerationMapping = {
  blogs: serverClient.blog.getAllBlogs(),
  tags: serverClient.tag.getAllTags(),
  users: serverClient.author.getAllAuthors(),
} as const

export async function generateStaticParams(): Promise<StaticRoute[]> {
  const allPagesData = await serverClient.page.getAllPages()
  const staticParams: StaticRoute[] = []

  for (const page of allPagesData) {
    if (!page) {
      continue // Skip invalid pages
    }

    // If the route is dynamic (contains `[`)
    if (page?.path?.includes('[') && page.layout) {
      const blockData = page.layout.find(block => block.blockType === 'Details')

      // If it has a Details block with a valid collectionSlug
      if (blockData?.blockType === 'Details' && blockData.collectionSlug) {
        const slug = blockData.collectionSlug

        // Fetch all slugs for the given collection (e.g., blogs, tags, users)
        const data = await staticGenerationMapping[slug]

        if (data && Array.isArray(data)) {
          let path = ''
          for (const item of data) {
            if ('username' in item) {
              path = item.username
            } else if ('slug' in item) {
              path = `${item.slug}`
            }

            // Dynamically replace `[parameter]` with actual slug
            const dynamicPath = page.path.replace(/\[(.*?)\]/, path)

            staticParams.push({
              route: dynamicPath.split('/').filter(Boolean),
            })
          }
        }
        continue
      }
    }

    // Statics (non-dynamic paths)
    const nonDynamicPath = page?.path?.split('/').filter(Boolean)[0]
    if (nonDynamicPath) {
      staticParams.push({ route: [nonDynamicPath] })
    }
  }

  return staticParams
}
