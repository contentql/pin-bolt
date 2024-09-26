import { SiteSetting } from '@payload-types'

type MenuLinksType = NonNullable<
  Pick<SiteSetting, 'navbar'>['navbar']['menuLinks']
>

export type GenerateMenuLinksType = {
  label: string
  type?: 'group'
  children?: {
    label: string
    newTab: boolean
    href: string
  }[]
  newTab?: boolean
  href?: string
}

// ? generateMenuLinks function returns a structure like this to simplify navbar & footer links structure👇
// [
//   {
//     label: 'Learn',
//     type: 'group',
//     children: [
//       {
//         label: 'Youtube',
//         newTab: true,
//         href: 'https://youtube.com',
//       },
//       {
//         label: 'Podcast',
//         newTab: true,
//         href: 'https://spotify.com',
//       },
//     ],
//   },
//   {
//     label: 'Blogs',
//     newTab: false,
//     href: '/blogs',
//   },
//   {
//     label: 'Tags',
//     newTab: false,
//     href: '/tags',
//   },
// ]

export const generateMenuLinks = (
  menuLinks: MenuLinksType,
): GenerateMenuLinksType[] => {
  return menuLinks.map(({ menuLink, group, menuLinkGroup }) => {
    // checking if it's a group links
    if (group && menuLinkGroup) {
      return {
        label: menuLinkGroup.groupTitle,
        type: 'group',
        // mapping through the menLinkGroup field
        children:
          menuLinkGroup.groupLinks?.map(
            ({ label, newTab, type, page, url }) => {
              let pageLink = ''

              if (typeof page?.value !== 'string') {
                pageLink = page?.value.path!
              }

              return {
                label,
                newTab: typeof newTab === 'boolean' ? newTab : false,
                href: type === 'reference' ? pageLink : url!,
              }
            },
          ) || [],
      }
    }
    // checking if menuLink is present
    else if (menuLink) {
      let pageLink = ''

      if (typeof menuLink?.page?.value !== 'string') {
        pageLink = menuLink.page?.value.path!
      }

      return {
        label: menuLink.label,
        newTab: typeof menuLink.newTab === 'boolean' ? menuLink.newTab : false,
        href: menuLink.type === 'reference' ? pageLink : menuLink.url!,
      }
    }
    // to avoid type error passing mandatory parameters
    else {
      return {
        label: '',
        type: 'group',
        href: '',
      }
    }
  })
}
