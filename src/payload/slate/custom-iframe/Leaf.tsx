'use client'

import { useLeaf } from '@payloadcms/richtext-slate/client'

type LeafType = {
  text: string
  'custom-iframe': boolean
}

const Leaf = () => {
  const { attributes, children, leaf } = useLeaf()

  return (
    <iframe
      style={{
        width: '100%',
        border: 'none',
        height: '30rem',
        borderRadius: '0.5rem',
      }}
      // @ts-ignore
      src={(leaf as LeafType).text}
      {...attributes}>
      {children}
    </iframe>
  )
}

export default Leaf
