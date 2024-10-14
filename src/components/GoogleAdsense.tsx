'use client'

import { SiteSetting } from '@payload-types'

const GoogleAdsense = ({ metadata }: { metadata: SiteSetting }) => {
  if (
    !metadata?.monetization?.adSenseId &&
    process.env.NODE_ENV !== 'production'
  ) {
    return null
  }

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${metadata?.monetization?.adSenseId}`}
      crossOrigin='anonymous'
    />
  )
}

export default GoogleAdsense
