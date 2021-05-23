/**
 * Format the time into a string, using locale to determine format.
 *
 * @param {Date} date A Javascript Date object.
 * @param {string|string[]} locales Locale(s) to determine format.
 * @returns A formatted string.
 */
export const formatTime = (date, locales = []) => {
  const utcTimestamp = new Date(date)
  return new Intl.DateTimeFormat(locales, {
    hourCycle: 'h23',
    timeStyle: 'medium'
  }).format(utcTimestamp)
}

/**
 * Format the date into a string, using locale to determine format.
 *
 * @param {Date} date A Javascript Date object.
 * @param {string|string[]} locales Locale(s) to determine format.
 * @returns A formatted string.
 */
export const formatDate = (date, locales = []) => {
  const utcTimestamp = new Date(date)
  return new Intl.DateTimeFormat(locales, {
    dateStyle: 'full'
  }).format(utcTimestamp)
}
