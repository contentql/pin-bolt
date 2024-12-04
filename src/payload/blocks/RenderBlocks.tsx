'use client'

import { Page } from '@payload-types'
import { notFound } from 'next/navigation'
import React from 'react'

import { trpc } from '@/trpc/client'

import { blocksJSX } from './blocks'
import { Params } from './types'

interface RenderBlocksProps {
  params: Params
  placeholderData: Page
}

const RenderBlocks: React.FC<RenderBlocksProps> = ({
  params,
  placeholderData,
}) => {
  // Fetch the page data using path
  const { data: pageData } = trpc.page.getPageData.useQuery(
    {
      path: params.route,
    },
    {
      placeholderData,
    },
  )

  // showing 404 page if page-data is not found
  if (!pageData) {
    return notFound()
  }

  return (
    <div className='relative space-y-20'>
      {pageData?.layout?.map((block, index) => {
        // Casting to 'React.FC<any>' to bypass TypeScript error related to 'Params' type incompatibility.
        const Block = blocksJSX[block.blockType] as React.FC<any>

        if (Block) {
          return <Block {...block} params={params} key={index} />
        }

        return <h3 key={block.id}>Block does not exist </h3>
      })}
    </div>
  )
}

export default RenderBlocks
