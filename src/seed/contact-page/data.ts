import { Page } from 'payload-types'

export type ContactPageDataType = Omit<Page, 'id' | 'createdAt' | 'updatedAt'>

export const ContactPageData: ContactPageDataType = {
  title: 'Contact',
  isHome: false,
  _status: 'published',
  isDynamic: false,
  layout: [
    {
      blockType: 'FormBlock',
      title: 'Have a Question🤔? Contact Us',
      form: {
        relationTo: 'forms',
        value: '',
      },
    },
  ],
}
