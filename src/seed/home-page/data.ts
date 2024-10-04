import { Page } from 'payload-types'

export type HomePageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const homePageData: HomePageDataType = {
  title: 'home',
  isHome: true,
  _status: 'published',
  layout: [
    {
      blockType: 'List',
      collectionSlug: 'blogs',
      title: 'Featured Posts⚡',
    },
    {
      blockType: 'List',
      collectionSlug: 'users',
      title: 'My Team💪',
    },
    {
      blockType: 'List',
      collectionSlug: 'tags',
      title: 'Featured Categories🔮',
    },
  ],
}
