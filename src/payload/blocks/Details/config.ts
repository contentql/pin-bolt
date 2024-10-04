import { Block } from 'payload'

const DetailsConfig: Block = {
  slug: 'Details',
  imageURL: '/images/blocks/details-block.png',
  interfaceName: 'DetailsType',
  labels: {
    singular: 'Dynamic Content Block',
    plural: 'Dynamic Content Blocks',
  },
  fields: [
    {
      type: 'select',
      name: 'collectionSlug',
      label: 'Collection Slug',
      options: [
        {
          label: 'Blogs',
          value: 'blogs',
        },
        {
          label: 'Tags',
          value: 'tags',
        },
        {
          label: 'Authors',
          value: 'users',
        },
      ],
    },
  ],
}

export default DetailsConfig
