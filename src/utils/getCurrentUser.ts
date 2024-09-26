import { env } from '@env'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

/**
 * Retrieves the current user based on whether the function is called in a client or server context.
 *
 * @param {Headers} [headers] - Optional headers to be used when called in a server context (e.g., containing authentication tokens).
 * @returns {Promise<any>} - A promise that resolves to the user object or throws an error if authentication fails.
 *
 * @throws {Error} - Throws an error if authentication fails.
 *
 * @example
 * // Client-side example
 * const user = await getCurrentUser()
 * console.log(user) // User object or undefined if not authenticated
 *
 * // Server-side example
 * const headers = new Headers()
 * headers.append('Authorization', 'Bearer YOUR_TOKEN')
 * const user = await getCurrentUser(headers)
 * console.log(user) // User object or throws an error if not authenticated
 */
export const getCurrentUser = async (headers?: Headers): Promise<any> => {
  if (!headers) {
    // This is a client component
    try {
      const res = await fetch(`${env.PAYLOAD_URL}/api/users/me`, {
        credentials: 'include',
      })

      const { user } = await res.json()

      return user
    } catch (error) {
      throw new Error('not authenticated')
    }
  } else {
    // Has token, so server component
    const payload = await getPayloadHMR({
      config: configPromise,
    })
    const { user } = await payload.auth({ headers })

    return user
  }
}
