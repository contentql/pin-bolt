export const getInitials = (name: string) => {
  if (!name) return '' // Handle empty string or undefined input

  // Normalize and split based on both space and hyphen
  let fullName = name.trim().split(/[\s-]+/)

  // Safely get the initials
  const firstInitial = fullName[0]?.at(0)?.toUpperCase() || ''
  const lastInitial =
    fullName.length > 1 ? fullName.at(-1)?.at(0)?.toUpperCase() : ''

  // Return initials without space in between
  return `${firstInitial}${lastInitial}`
}
