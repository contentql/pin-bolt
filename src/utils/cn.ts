import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names conditionally and merges Tailwind classes.
 *
 * @param {...ClassValue[]} inputs - An array of class values that can be strings, arrays, or objects.
 * @returns {string} - A string of combined class names, with Tailwind classes merged.
 *
 * @example
 * ```
 * const buttonClass = cn('btn', 'btn-primary', {
 *   'btn-disabled': isDisabled,
 *   'btn-large': size === 'large',
 * })
 *
 * // Example output: 'btn btn-primary btn-disabled'
 * ```
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}
