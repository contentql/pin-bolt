export const signOut = async () => {
  try {
    const response = await fetch('/api/users/logout', { method: 'POST' })
    return response.json()
  } catch (error) {
    console.error('Sign-out failed:', error)
  }
}
