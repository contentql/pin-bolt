/**
 * Generates a random integer between x and y (inclusive). x and y can be strings or numbers.
 * If x or y is a string, it is converted to a number.
 * @param {string | number} x - The minimum value (inclusive). Can be a string or number.
 * @param {string | number} y - The maximum value (inclusive). Can be a string or number.
 * @returns {number} - A random integer between x and y.
 * @throws {Error} - Throws an error if x or y cannot be converted to a number, or if x is greater than y.
 * @example
 * // Returns a random integer between 5 and 10, inclusive
 * const randomNum1 = getRandomInt(5, 10);
 * console.log(randomNum1);
 * // Returns a random integer between 5 and 10, inclusive, with string inputs
 * const randomNum2 = getRandomInt('5', '10');
 * console.log(randomNum2);
 */
export const getRandomInt = (
  x: string | number,
  y: string | number,
): number => {
  // Convert inputs to numbers
  const min = Number(x)
  const max = Number(y)

  if (isNaN(min) || isNaN(max)) {
    throw new Error(
      'Both x and y must be valid numbers or strings that can be converted to numbers.',
    )
  }

  if (min > max) {
    throw new Error(
      'The minimum value x must be less than or equal to the maximum value y.',
    )
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}
