/**
 * Signs out the current user by making a POST request to the `/api/users/logout` endpoint.
 * After the request is completed, the page is reloaded to reflect the signed-out state.
 *
 * @returns {Promise<void>} - A promise that resolves when the sign-out process is complete.
 *
 * @throws {Error} - Throws an error if the fetch request fails. The error is logged to the console.
 *
 * @example
 * ```
 * await signOut();
 * // The user will be signed out, and the page will be reloaded.
 * ```
 */
export const signOut = async (): Promise<void> => {
  try {
    await fetch('/api/users/logout', { method: 'POST' })
  } catch (error) {
    console.error('Sign-out failed:', error)
  }
  window.location.reload()
}
