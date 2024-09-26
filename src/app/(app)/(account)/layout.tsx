import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { headers } from 'next/headers'

import { getCurrentUser } from '@/utils/getCurrentUser'

interface LayoutProps {
  children: React.ReactNode
}

const AccountLayout: React.FC<LayoutProps> = async ({ children }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const initData = await payload.findGlobal({
    slug: 'site-settings',
    draft: false,
  })

  const headersList = headers()
  const user = await getCurrentUser(headersList)

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Navbar */}
      <div className='flex-grow'>{children}</div>
      {/* Footer */}
    </div>
  )
}

export default AccountLayout
