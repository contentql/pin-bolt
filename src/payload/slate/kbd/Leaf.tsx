'use client'

import { useLeaf } from '@payloadcms/richtext-slate/client'

const Leaf = () => {
  const { attributes, children, leaf } = useLeaf()

  return <kbd {...attributes}>{children}</kbd>
}

export default Leaf
