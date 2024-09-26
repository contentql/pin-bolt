/**
 * Generates a random string of a specified length using the provided characters.
 *
 * @param {number} length - The length of the random string to be generated.
 * @param {string} [characters='abcdefghijklmnopqrstuvwxyz0123456789'] - The characters to use for generating the string. Defaults to lowercase letters and digits.
 * @returns {string} - A random string of the specified length.
 *
 * @example
 * // Generate a random string of length 10 with default characters
 * const randomStr = generateRandomString(10)
 * console.log(randomStr) // e.g., 'a1b2c3d4e5'
 *
 * // Generate a random string of length 8 with custom characters
 * const randomStrCustom = generateRandomString(8, 'ABCDEF012345')
 * console.log(randomStrCustom) // e.g., 'A0C1E2F3'
 */
export const generateRandomString = (
  length: number,
  characters: string = 'abcdefghijklmnopqrstuvwxyz0123456789',
): string => {
  let result = ''
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}
