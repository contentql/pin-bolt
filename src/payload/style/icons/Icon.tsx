/* eslint-disable @next/next/no-img-element */
import * as React from 'react'

const Icon: React.FC = () => {
  return (
    <div className='logo'>
      <img
        src='/images/contentql-logo.png'
        width={40}
        height={40}
        alt='ContentQL Favicon'
      />
    </div>
  )
}

export default Icon
