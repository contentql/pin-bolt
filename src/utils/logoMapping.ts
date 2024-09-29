import { User } from '@payload-types'
import { ComponentPropsWithRef } from 'react'

import {
  DiscordLogo,
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  MediumLogo,
  PinterestLogo,
  QuoraLogo,
  RedditLogo,
  SnapchatLogo,
  TelegramLogo,
  TiktokLogo,
  TumblrLogo,
  TwitterLogo,
  WebsiteLogo,
  WhatsappLogo,
  YoutubeLogo,
} from '@/components/SVG'

type PlatformType = NonNullable<User['socialLinks']>[number]['platform']

type LogoMappingType = {
  [key in PlatformType]: (
    props: ComponentPropsWithRef<'svg'>,
  ) => React.JSX.Element
}

export const logoMapping: LogoMappingType = {
  website: WebsiteLogo,
  discord: DiscordLogo,
  facebook: FacebookLogo,
  github: GithubLogo,
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
  medium: MediumLogo,
  pinterest: PinterestLogo,
  quora: QuoraLogo,
  reddit: RedditLogo,
  snapchat: SnapchatLogo,
  telegram: TelegramLogo,
  tiktok: TiktokLogo,
  tumblr: TumblrLogo,
  twitter: TwitterLogo,
  whatsapp: WhatsappLogo,
  youtube: YoutubeLogo,
}
