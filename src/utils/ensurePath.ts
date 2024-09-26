/**
 * Ensures that a given path starts and ends with a single forward slash (`/`),
 * and removes any duplicate slashes within the path.
 *
 * @param {string} path - The path string to format.
 * @returns {string} - The formatted path with a single leading and trailing slash.
 *
 * @example
 * ```
 * const formattedPath = ensurePath('api/v1/resource')
 *
 * // Example output: '/api/v1/resource/'
 *
 * const formattedPathWithSlashes = ensurePath('/api//v1/resource//')
 *
 * // Example output: '/api/v1/resource/'
 * ```
 */
export const ensurePath = (path: string): string => {
  // Trim any leading and trailing slashes, then add a single leading slash
  const formattedPath = `/${path.trim().replace(/^\/|\/$/g, '')}/`

  // Replace any duplicate slashes within the path
  return formattedPath.replace(/\/+/g, '/')
}
