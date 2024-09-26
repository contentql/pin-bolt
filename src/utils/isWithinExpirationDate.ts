export type TimeSpanUnit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w'

/**
 * A class representing a time span with various units.
 *
 * @example
 * const timeSpan = new TimeSpan(2, 'h')
 * console.log(timeSpan.milliseconds()) // 7200000
 * console.log(timeSpan.seconds()) // 7200
 *
 * const transformedTimeSpan = timeSpan.transform(2)
 * console.log(transformedTimeSpan.milliseconds()) // 14400000
 */
export class TimeSpan {
  value: number
  unit: TimeSpanUnit

  /**
   * @param {number} value - The value of the time span.
   * @param {TimeSpanUnit} unit - The unit of the time span (e.g., 'ms', 's', 'm', 'h', 'd', 'w').
   */
  constructor(value: number, unit: TimeSpanUnit) {
    this.value = value
    this.unit = unit
  }

  /**
   * Converts the time span to milliseconds.
   *
   * @returns {number} - The time span in milliseconds.
   */
  milliseconds(): number {
    if (this.unit === 'ms') {
      return this.value
    }
    if (this.unit === 's') {
      return this.value * 1000
    }
    if (this.unit === 'm') {
      return this.value * 1000 * 60
    }
    if (this.unit === 'h') {
      return this.value * 1000 * 60 * 60
    }
    if (this.unit === 'd') {
      return this.value * 1000 * 60 * 60 * 24
    }
    return this.value * 1000 * 60 * 60 * 24 * 7
  }

  /**
   * Converts the time span to seconds.
   *
   * @returns {number} - The time span in seconds.
   */
  seconds(): number {
    return this.milliseconds() / 1000
  }

  /**
   * Transforms the time span by multiplying its value by a given factor.
   *
   * @param {number} x - The factor to multiply the time span by.
   * @returns {TimeSpan} - A new `TimeSpan` object with the transformed value.
   *
   * @example
   * const timeSpan = new TimeSpan(1, 'h')
   * const doubleTimeSpan = timeSpan.transform(2)
   * console.log(doubleTimeSpan.milliseconds()) // 7200000
   */
  transform(x: number): TimeSpan {
    return new TimeSpan(Math.round(this.milliseconds() * x), 'ms')
  }
}

/**
 * Checks if a given date is within the expiration date (i.e., in the future).
 *
 * @param {Date} date - The date to check.
 * @returns {boolean} - `true` if the date is in the future, `false` otherwise.
 *
 * @example
 * const futureDate = new Date(Date.now() + 10000)
 * const isValid = isWithinExpirationDate(futureDate)
 * console.log(isValid) // true if the current time is before the futureDate
 */
export const isWithinExpirationDate = (date: Date): boolean => {
  return Date.now() < date.getTime()
}

/**
 * Creates a new date by adding a specified `TimeSpan` to the current date.
 *
 * @param {TimeSpan} timeSpan - The `TimeSpan` to add to the current date.
 * @returns {Date} - A new `Date` object representing the current date plus the `TimeSpan`.
 *
 * @example
 * const timeSpan = new TimeSpan(5, 'm')
 * const futureDate = createDate(timeSpan)
 * console.log(futureDate) // A Date object 5 minutes from now
 */
export const createDate = (timeSpan: TimeSpan): Date => {
  return new Date(Date.now() + timeSpan.milliseconds())
}
