'use client'

import { SiteSetting } from '@payload-types'
import React, { createContext, use, useState } from 'react'

const MetadataContext = createContext<SiteSetting | null>(null)

export const useMetadata = () => {
  const context = use(MetadataContext)
  if (!context) {
    throw new Error('useMetadata must be used within a MetadataProvider')
  }
  return context
}

export const MetadataProvider = ({
  metadata,
  children,
}: {
  metadata: SiteSetting
  children: React.ReactNode
}) => {
  const [metadataState] = useState(metadata)

  return (
    <MetadataContext.Provider value={metadataState}>
      {children}
    </MetadataContext.Provider>
  )
}
