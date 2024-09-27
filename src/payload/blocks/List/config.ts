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

export default ListConfig
