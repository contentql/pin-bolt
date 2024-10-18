import React from 'react'

import { cn } from '@/utils/cn'

interface WidthProps {
  width: number
  children: React.ReactNode
}

function getWidth(width: number) {
  if (width <= 25) return 'w-1/4'
  else if (width > 25 && width < 50) return 'w-full md:w-[calc(25%-16px)]'
  else if (width >= 50 && width < 75) return 'w-full md:w-[calc(50%-16px)]'
  else if (width >= 75 && width < 100) return 'w-full md:w-[calc(75%-16px)]'
  else return 'w-[calc(100%-16px)]'
}
const Width: React.FC<WidthProps> = ({ children, width }) => {
  return <div className={cn(`flex-grow ${getWidth(width)}`)}>{children}</div>
}

export default Width
