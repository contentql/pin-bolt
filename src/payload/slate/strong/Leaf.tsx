'use client'

import { useLeaf } from '@payloadcms/richtext-slate/client'

const Leaf = () => {
  const { attributes, children } = useLeaf()

  return <strong {...attributes}>{children}</strong>
}

export default Leaf
