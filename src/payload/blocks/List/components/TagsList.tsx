import { Tag } from '@payload-types'
import Link from 'next/link'
import { LiaBlogSolid } from 'react-icons/lia'

import TabComponent, { TabContent } from '@/payload/blocks/common/Tabs'

interface TagsListProps {
  tags: Tag[]
}
const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  const tabs = [
    {
      title: 'Tags',
      id: 'TagsDetails',
      icon: <LiaBlogSolid size={24} />,
      color: '#5d5dff',
      content: TabContent,
      data: tags,
    },
  ]
  return (
    <div className='mx-auto max-h-screen min-h-screen max-w-7xl  gap-6 overflow-hidden px-2'>
      <div className='mt-4 flex items-center justify-between'>
        <p className='rounded-rounded-box border-2 border-base-content/10 bg-base-content/20 px-4 py-2'>
          Get Started with src/app/(app)/(marketing)/tag
        </p>
        <Link
          href={`/tag/${tags?.at(0)?.slug!}`}
          className='rounded-rounded-box border-2 border-base-content/10 bg-base-content/20 px-4 py-2'>
          View tag details
        </Link>
      </div>
      <TabComponent tabs={tabs} />
    </div>
  )
}

export default TagsList
