import { Block } from 'payload'

const FormConfig: Block = {
  slug: 'FormBlock',
  // imageURL: '',
  interfaceName: 'FormType',
  labels: {
    singular: 'Form Block',
    plural: 'Form Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: ['forms'],
      required: true,
    },
  ],
}

export default FormConfig
