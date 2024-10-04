import { Page } from 'payload-types'

export type AuthorsPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const authorsPageData: AuthorsPageDataType = {
  title: 'team',
  isHome: false,
  _status: 'published',
  layout: [
    {
      blockType: 'List',
      title: 'Team💪',
      collectionSlug: 'users',
    },
  ],
}
