import { collectionSlug } from '@contentql/core'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

const payload = await getPayloadHMR({ config: configPromise })

export const seedSiteSettings = async () => {
  try {
    const result = await payload.updateGlobal({
      slug: collectionSlug['site-settings'],
      data: {
        general: {
          title: 'ContentQL Theme Template',
          description: 'Create your theme by using the our template',
          keywords: ['ContentQL', 'Payload CMS', 'NextJS'],
          // ! add favicon, og-image-url
          faviconUrl: '',
          ogImageUrl: '',
        },
        navbar: {
          logo: {
            imageUrl: '',
            description: 'ContentQL Logo',
            height: 24,
            width: 24,
          },
          menuLinks: [
            {
              group: true,
              menuLink: {
                type: 'custom',
                newTab: true,
                label: '',
              },
              menuLinkGroup: {
                groupTitle: 'Learn',

                groupLinks: [
                  {
                    type: 'custom',
                    newTab: true,
                    label: 'Youtube',
                    url: 'https://youtube.com',
                  },
                  {
                    type: 'custom',
                    newTab: true,
                    label: 'Twitter',
                    url: 'https://twitter.com',
                  },
                  {
                    type: 'reference',
                    label: 'About',
                    // ! add page-id here
                    page: {
                      relationTo: 'pages',
                      value: '66ebd1b66b06e5c5dffd2c7b',
                    },
                  },
                ],
              },
            },

            {
              group: false,

              menuLink: {
                type: 'reference',
                label: 'Home',

                // ! add page-id here
                page: {
                  relationTo: 'pages',
                  value: '66ebd1b66b06e5c5dffd2c7b',
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
              id: '66ecd872fe8998361b64212c',
            },
          ],
        },
        footer: {
          logo: {
            height: 24,
            width: 24,
            description: 'Content Creations made Simple',
            // ! add image data here
            imageUrl: '',
          },
          copyright: '© 2024 all rights reserved',
          footerLinks: [
            {
              group: true,
              menuLink: {
                type: 'custom',
                newTab: true,
                label: '',
              },
              menuLinkGroup: {
                groupTitle: 'Learn',

                groupLinks: [
                  {
                    type: 'custom',
                    newTab: true,
                    label: 'Youtube',
                    url: 'https://youtube.com',
                  },
                  {
                    type: 'custom',
                    newTab: true,
                    label: 'Twitter',
                    url: 'https://twitter.com',
                  },
                  {
                    type: 'reference',
                    label: 'About',
                    // ! add page-id here
                    page: {
                      relationTo: 'pages',
                      value: '66ebd1b66b06e5c5dffd2c7b',
                    },
                  },
                ],
              },
            },

            {
              group: false,

              menuLink: {
                type: 'reference',
                label: 'Home',

                // ! add page-id here
                page: {
                  relationTo: 'pages',
                  value: '66ebd1b66b06e5c5dffd2c7b',
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
              id: '66ecd872fe8998361b64212c',
            },
          ],
          socialLinks: [
            {
              platform: 'youtube',
              value: 'https://youtube.com',
            },
            {
              platform: 'github',
              value: 'https://github.com/contentql',
            },
          ],
        },
      },
    })

    return result
  } catch (error) {
    throw error
  }
}
