'use client'

import { useEffect } from 'react'

import ServerError from '@/components/500'

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <ServerError />
      </body>
    </html>
  )
}

export default GlobalError
