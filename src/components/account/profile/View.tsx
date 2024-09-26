import { SidebarView } from '../common/Sidebar'
import { User } from '@payload-types'

import ProfileForm from './ProfileForm'

interface Props {
  user: User
}

const ProfileView: React.FC<Props> = ({ user }) => {
  return (
    <div className='flex w-full flex-col gap-5 bg-base-100  px-3 md:flex-row md:px-16 lg:px-28'>
      <SidebarView user={user} />
      <main className='min-h-screen w-full py-1'>
        <ProfileForm user={user} />
      </main>
    </div>
  )
}

export default ProfileView
