import { Block } from 'payload'

const DetailsConfig: Block = {
  slug: 'Details',
  // imageURL: '',
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
    {
      name: 'blog-link',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Blog redirect link',
      maxDepth: 1,
      admin: {
        description: 'This redirects to a blog details page',
      },
    },
    {
      name: 'author-link',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Author redirect link',
      maxDepth: 1,
      admin: {
        description: 'This redirects to a author details page',
      },
    },
    {
      name: 'tag-link',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Tag redirect link',
      maxDepth: 1,
      admin: {
        description: 'This redirects to a tag details page',
      },
    },
  ],
}

export default DetailsConfig
