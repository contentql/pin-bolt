import { Block, Field } from 'payload'

const planField: Field[] = [
  {
    name: 'plan',
    relationTo: 'subscriptionPlans',
    type: 'relationship',
    hasMany: false,
  },
  {
    name: 'popular',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description: 'This will highlight the popular subscription plan on UI',
    },
  },
]

const MembershipConfig: Block = {
  slug: 'Membership',
  interfaceName: 'MembershipType',
  labels: {
    singular: 'Membership Block',
    plural: 'Membership Blocks',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      required: true,
    },
    {
      type: 'array',
      name: 'planList',
      fields: planField,
      required: true,
    },
  ],
}

export default MembershipConfig
