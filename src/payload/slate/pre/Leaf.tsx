'use client'

import { useLeaf } from '@payloadcms/richtext-slate/client'

const Leaf = () => {
  const { attributes, children } = useLeaf()

  return <code {...attributes}>{children}</code>
}

export default Leaf
