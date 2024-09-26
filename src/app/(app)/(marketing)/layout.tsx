import { headers } from 'next/headers'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { serverClient } from '@/trpc/serverClient'
import { getCurrentUser } from '@/utils/getCurrentUser'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const metadata = await serverClient.siteSettings.getSiteSettings()

  const headersList = headers()
  const user = await getCurrentUser(headersList)

  return (
    <>
      <div className='flex min-h-screen flex-col'>
        <Navbar metadata={metadata} />
        <main className='container my-20 flex-grow'>{children}</main>
        <Footer metadata={metadata} />
      </div>
    </>
  )
}

export default MarketingLayout
