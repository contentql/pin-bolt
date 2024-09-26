/**
 * Formats an ISO date string into a more human-readable format.
 *
 * @param {string} isoDateString - The ISO date string to format.
 * @returns {string} - The formatted date string in the format 'DD Mon, YYYY'.
 *
 * @example
 * ```
 * const formattedDate = formatDate('2024-08-14T12:00:00Z')
 *
 * // Example output: '14 Aug, 2024'
 * ```
 */
export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString)
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()
  const year = date.getFullYear()
  return `${day} ${month}, ${year}`
}
