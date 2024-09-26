import { Page } from 'payload-types'

export type TagDetailsPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const tagDetailsPageData: TagDetailsPageDataType = {
  title: 'Tag Details',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'Details',
      collectionSlug: 'tags',
    },
  ],
}
