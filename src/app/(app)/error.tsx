'use client'

// Error components must be Client Components
import { useEffect } from 'react'

import ServerError from '@/components/500'

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <ServerError />
}

export default Error
