import { User } from '@payload-types'

import ProfileForm from './ProfileForm'

interface Props {
  user: User
}

const ProfileView: React.FC<Props> = ({ user }) => {
  return <ProfileForm user={user} />
}

export default ProfileView
