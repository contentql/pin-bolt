import { Block } from 'payload'

const ListConfig: Block = {
  slug: 'List',
  interfaceName: 'ListType',
  labels: {
    singular: 'List Block',
    plural: 'List Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      admin: {
        description: 'This will be used as title for the list',
      },
    },
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
    {
      name: 'link',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Redirect Link',
      maxDepth: 1,
      admin: {
        description: 'This redirects to a particular details page',
      },
    },
  ],
}

export default ListConfig
