'use client'

import { User } from '@payload-types'
import React, { createContext, use, useState } from 'react'

const UserContext = createContext<User | string | null>(null)

export const useUserContext = () => {
  const context = use(UserContext)

  if (context === null) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }

  return context
}

export const UserContextProvider = ({
  user,
  children,
}: {
  user: User | string
  children: React.ReactNode
}) => {
  const [userState] = useState(user)

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  )
}
