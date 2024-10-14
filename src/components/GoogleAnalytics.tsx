'use client'

import { SiteSetting } from '@payload-types'
import Script from 'next/script'

const GoogleAnalytics = ({ metadata }: { metadata: SiteSetting }) => {
  if (!metadata?.monetization?.measurementId) return null // Render nothing if no measurement ID

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${metadata?.monetization?.measurementId}`}
      />
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${metadata?.monetization?.measurementId}');
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics
