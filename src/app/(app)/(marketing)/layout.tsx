import { headers } from 'next/headers'

import Branding from '@/components/Branding'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { serverClient } from '@/trpc/serverClient'
import { getCurrentUser } from '@/utils/getCurrentUser'
import { MetadataProvider } from '@/utils/metadataContext'
import { UserContextProvider } from '@/utils/userContext'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const metadata = await serverClient.siteSettings.getSiteSettings()

  const headersList = await headers()
  const user = await getCurrentUser(headersList)

  return (
    <MetadataProvider metadata={metadata}>
      <UserContextProvider user={user ?? ''}>
        <div className='grid min-h-screen w-full grid-rows-[1fr_auto]'>
          <Navbar metadata={metadata} user={user} />
          <main className='container my-20 overflow-x-hidden'>{children}</main>
          <Footer metadata={metadata} />
          <Branding />
        </div>
      </UserContextProvider>
    </MetadataProvider>
  )
}

export default MarketingLayout
