import { DiscordLogo, FacebookLogo, GithubLogo, InstagramLogo, LinkedinLogo, MediumLogo, PinterestLogo, QuoraLogo, RedditLogo, SnapchatLogo, TelegramLogo, TiktokLogo, TwitterLogo, WebsiteLogo, WhatsappLogo, YoutubeLogo } from '@/components/SVG';
import { User } from '@payload-types';
import { ComponentPropsWithRef } from 'react';

type PlatformType = NonNullable<User["socialLinks"]>[number]["platform"];

type LogoMappingType = {
    [key in PlatformType] : (props: ComponentPropsWithRef<"svg">) => React.JSX.Element
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
    tumblr: TwitterLogo,
    twitter: TwitterLogo,
    whatsapp:WhatsappLogo,
    youtube: YoutubeLogo
}
