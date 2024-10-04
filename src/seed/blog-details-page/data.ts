import { Page } from 'payload-types'

export type BlogDetailsPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export const blogDetailsPageData: BlogDetailsPageDataType = {
  title: 'post-details',
  isHome: false,
  _status: 'published',
  isDynamic: true,
  layout: [
    {
      blockType: 'Details',
      collectionSlug: 'blogs',
    },
    {
      blockType: 'Newsletter',
      heading: '🔔 Subscribe to our Newsletter',
      description: 'Stay up to date with our latest news and products',
      buttonText: 'Subscribe',
    },
  ],
}
