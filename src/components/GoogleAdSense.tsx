import Script from 'next/script'

type Props = {
  adSenseId?: string
}

const GoogleAdSense: React.FC<Props> = ({ adSenseId = '' }) => {
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  if (!adSenseId) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${adSenseId}`}
      crossOrigin='anonymous'
      strategy='afterInteractive'
    />
  )
}

export default GoogleAdSense
