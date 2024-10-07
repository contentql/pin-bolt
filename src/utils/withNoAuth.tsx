import { User } from '@payload-types'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ComponentType, ReactElement } from 'react'

import { getCurrentUser } from '@/utils/getCurrentUser'

interface UserProps {
  user: User | null
}

interface WithNoAuthOptions {
  redirectPath: string
}

/**
 * Higher-order component to restrict access to authenticated users.
 * If a user is not authenticated, they will be redirected to the specified path.
 * If the user is authenticated, they can access the wrapped component.
 *
 * @template P - Props type of the wrapped component
 * @param {ComponentType<P & UserProps>} WrappedComponent - The component to wrap, which requires user authentication
 * @param {WithNoAuthOptions} [options] - Options to configure the HOC (e.g., redirect path)
 * @returns {ComponentType<P>} - The wrapped component with authentication logic applied
 *
 * @example
 * ```tsx
 * const ProtectedPage = withNoAuth(MyPageComponent, { redirectPath: '/custom-redirect' })
 * ```
 */
const withNoAuth = <P extends object>(
  WrappedComponent: ComponentType<P & UserProps>,
  options: WithNoAuthOptions = { redirectPath: '/profile' },
): ComponentType<P> => {
  const ComponentWithNoAuth = async (
    props: P,
  ): Promise<ReactElement | null> => {
    const headersList = await headers()
    const user = await getCurrentUser(headersList)

    if (user) {
      return redirect(options.redirectPath)
    }

    return <WrappedComponent user={user} {...props} />
  }

  return ComponentWithNoAuth as ComponentType<P>
}

export default withNoAuth
