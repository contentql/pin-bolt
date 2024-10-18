import { Block } from 'payload'

const NewsletterConfig: Block = {
  slug: 'Newsletter',
  interfaceName: 'NewsletterType',
  labels: {
    singular: 'Newsletter Block',
    plural: 'Newsletter Blocks',
  },
  imageURL: '/images/blocks/newsletter-block.png',
  fields: [
    {
      type: 'text',
      name: 'heading',
      required: true,
    },
    {
      type: 'text',
      name: 'description',
      required: true,
    },
    {
      type: 'relationship',
      name: 'form',
      relationTo: 'forms',
      hasMany: false,
    },
  ],
}

export default NewsletterConfig
