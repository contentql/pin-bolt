'use client'

import { env } from '@env'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  console.log(env.NEXT_PUBLIC_PUBLIC_URL)

  return (
    <PayloadLivePreview
      refresh={router.refresh}
      serverURL={env.NEXT_PUBLIC_PUBLIC_URL}
    />
  )
}
