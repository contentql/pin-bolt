import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import Button from '@/components/common/Button'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Link href='/'>
        <Button className='fixed left-4 top-4' size='sm' variant='outline'>
          <ArrowLeft size={16} />
          Back to Home
        </Button>
      </Link>

      {children}
    </>
  )
}

export default AuthLayout
