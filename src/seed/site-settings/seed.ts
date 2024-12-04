import { collectionSlug } from '@contentql/core'
import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { Ora } from 'ora'
import path from 'path'
import { getPayload } from 'payload'

const payload = await getPayload({ config: configPromise })

export const seedSiteSettings = async ({
  authorDetailsLink,
  tagDetailsLink,
  blogDetailsLink,
  authorPages,
  blogsPage,
  tagsPages,
  contactPage,
  spinner,
}: {
  authorDetailsLink: Page
  tagDetailsLink: Page
  blogDetailsLink: Page
  spinner: Ora
  tagsPages: Page
  blogsPage: Page
  authorPages: Page
  contactPage: Page
}) => {
  spinner.start('Started creating site-settings...')

  try {
    const ogImageUrl = await payload.create({
      collection: 'media',
      data: {
        alt: 'og-image',
      },
      filePath: path.join(process.cwd(), '/public/images/seed/og-image.png'),
    })

    const faviconUrl = await payload.create({
      collection: 'media',
      data: {
        alt: 'og-image',
      },
      filePath: path.join(process.cwd(), '/public/images/seed/bolt-logo.png'),
    })

    const result = await payload.updateGlobal({
      slug: collectionSlug['site-settings'],
      data: {
        general: {
          title: 'Bolt',
          description: 'A Youtuber & Podcaster theme',
          keywords: ['ContentQL', 'Payload CMS', 'NextJS'],
          faviconUrl: faviconUrl.id,
          ogImageUrl: ogImageUrl.id,
        },
        navbar: {
          logo: {
            imageUrl: faviconUrl.id,
            description: 'Bolt Logo',
            height: 24,
            width: 24,
          },
          menuLinks: [
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: '💎 Posts',
                page: {
                  relationTo: 'pages',
                  value: blogsPage.id,
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
            },
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: '👥 Team',
                page: {
                  relationTo: 'pages',
                  value: authorPages.id,
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
            },
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: '☎️ Contact',
                page: {
                  relationTo: 'pages',
                  value: contactPage.id,
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
            },
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: '🔮 Categories',
                page: {
                  relationTo: 'pages',
                  value: tagsPages.id,
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
            },
            {
              group: true,
              menuLink: {
                type: 'reference',
              },
              menuLinkGroup: {
                groupTitle: '📖 Learn',

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
                ],
              },
            },
            {
              group: false,
              menuLink: {
                type: 'custom',
                label: '🗺️ Style Guide',
                url: '/post/style-guide-all-supported-elements',
              },
              menuLinkGroup: {
                groupLinks: [],
              },
            },
          ],
        },
        footer: {
          logo: {
            height: 24,
            width: 24,
            description: 'Youtuber & Podcaster',
            imageUrl: faviconUrl.id,
          },
          copyright: '© 2024 all rights reserved',
          footerLinks: [
            {
              group: true,
              menuLink: {
                type: 'reference',
              },
              menuLinkGroup: {
                groupTitle: '📚 Content',

                groupLinks: [
                  {
                    type: 'reference',
                    label: 'Posts',
                    page: {
                      relationTo: 'pages',
                      value: blogsPage.id,
                    },
                  },
                  {
                    type: 'reference',
                    label: 'Categories',
                    page: {
                      relationTo: 'pages',
                      value: tagsPages.id,
                    },
                  },
                ],
              },
            },
            {
              group: true,
              menuLink: {
                type: 'reference',
              },
              menuLinkGroup: {
                groupTitle: '🔗 Links',

                groupLinks: [
                  {
                    type: 'custom',
                    label: 'Youtube',
                    newTab: true,
                    url: 'https://youtube.com',
                  },
                  {
                    type: 'custom',
                    label: 'Podcast',
                    newTab: true,
                    url: 'https://spotify.com',
                  },
                ],
              },
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
            {
              platform: 'twitter',
              value: 'https://x.com',
            },
            {
              platform: 'instagram',
              value: 'https://instagram.com',
            },
          ],
        },
        redirectionLinks: {
          authorLink: {
            relationTo: 'pages',
            value: authorDetailsLink.id,
          },
          blogLink: {
            relationTo: 'pages',
            value: blogDetailsLink.id,
          },
          tagLink: {
            relationTo: 'pages',
            value: tagDetailsLink.id,
          },
        },
      },
    })

    spinner.succeed('Successfully creating site-settings...')
    return result
  } catch (error) {
    spinner.fail('Failed creating site-settings...')
    throw error
  }
}
