'use client'

import { useEffect } from 'react'

export default function ScrollUp() {
  useEffect(
    () =>
      window.document.scrollingElement?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      }),
    [],
  )

  return null
}
