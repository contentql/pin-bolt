import { Block } from 'payload'

const HomeConfig: Block = {
  slug: 'Home',
  interfaceName: 'HomeType',
  labels: {
    singular: 'Home Block',
    plural: 'Home Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'subHeading',
      type: 'text',
      label: 'Sub Heading',
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default HomeConfig
