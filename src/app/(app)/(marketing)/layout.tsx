import { headers } from 'next/headers'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { serverClient } from '@/trpc/serverClient'
import { getCurrentUser } from '@/utils/getCurrentUser'
import { MetadataProvider } from '@/utils/metadataContext'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const metadata = await serverClient.siteSettings.getSiteSettings()

  const headersList = headers()
  const user = await getCurrentUser(headersList)

  return (
    <MetadataProvider metadata={metadata}>
      <div className='grid min-h-screen grid-rows-[1fr_auto]'>
        <Navbar metadata={metadata} user={user} />
        <main className='container my-20 flex-grow'>{children}</main>
        <Footer metadata={metadata} />
      </div>
    </MetadataProvider>
  )
}

export default MarketingLayout
