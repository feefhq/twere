/**
 * Provides utilities for the manipulation and display of time-based data.
 */
export class Time {
  /**
   * Returns a string representing a humanized version of a relative time delta.
   * @param {Date} date A relative date to now
   */
  static relativeTime (date = new Date()) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    const delta = (date - Date.now()) / 1000
    const spans = {
      minute: 60,
      hour: 60 * 60,
      day: 60 * 60 * 24,
      month: 60 * 60 * 24 * 30,
      year: 60 * 60 * 24 * 30 * 365
    }
    const relative = (delta >= -spans.minute && [delta, 'second']) ||
                     (delta >= -spans.hour && [delta / spans.minute, 'minute']) ||
                     (delta >= -spans.day && [delta / spans.hour, 'hour']) ||
                     (delta >= -spans.month && [delta / spans.day, 'day']) ||
                     (delta >= -spans.year && [delta / spans.month, 'month']) ||
                     [delta / spans.year]
    return rtf.format(Math.floor(relative[0]), relative[1])
  }
}
