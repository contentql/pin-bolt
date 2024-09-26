import { Page } from 'payload-types'

export type TagsPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const tagsPageData: TagsPageDataType = {
  title: 'Tags',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'List',
      title: 'Discover Tags',
      collectionSlug: 'tags',
    },
  ],
}
