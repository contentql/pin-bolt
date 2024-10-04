import { isAdmin } from '../access'
import { CustomCollectionConfig } from '@contentql/core'

export const subscribersCollection: CustomCollectionConfig = {
  slug: 'subscribers',
  fields: [
    {
      name: 'email',
      type: 'text',
      required: true,
      unique: true,
      hasMany: false,
    },
  ],
  access: {
    read: isAdmin,
    update: isAdmin,
    create: isAdmin,
    delete: isAdmin,
  },
}
