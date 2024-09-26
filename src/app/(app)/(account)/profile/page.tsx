import { User } from '@payload-types'
import { NextPage } from 'next'

import { ProfileView } from '@/components/account/profile'
import withAuth from '@/utils/withAuth'

interface PageProps {
  user: User
}

const ProfilePage: NextPage<PageProps> = async ({ user }) => {
  return <ProfileView user={user} />
}

export default withAuth(ProfilePage)
