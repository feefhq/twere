/**
 * Provides utilities for the manipulation and display of time-based data.
 */
export class Time {
  /**
   * Returns a string representing a humanized version of a relative time delta.
   *
   * The duration delimiters here are inspired by
   * [Moment.js](https://github.com/moment/moment/blob/13a61b285c095bda7ea8e33156090ea5ccfeaef1/src/test/moment/duration.js#L426)
   * @param {Date} date A relative date to now
   */
  static relativeTime (date = new Date()) {
    const delta = Math.floor(-(date - Date.now()) / 1000)
    const duration = (delta <= 44 && 'a few seconds') ||
           (delta <= 89 && 'a minute') ||
           (delta <= 44 * 60 && `${Math.ceil(delta / 60)} minutes`) ||
           (delta <= 89 * 60 && 'an hour') ||
           (delta <= 21 * 60 * 60 && `${Math.ceil(delta / 60 / 60)} hours`) ||
           (delta <= 35 * 60 * 60 && 'a day') ||
           (delta <= 25 * 24 * 60 * 60 && `${Math.ceil(delta / 24 / 60 / 60)} days`) ||
           (delta <= 45 * 24 * 60 * 60 && 'a month') ||
           (delta <= 344 * 24 * 60 * 60 && `${Math.ceil(delta / 30 / 24 / 60 / 60)} months`) ||
           (delta <= 547 * 24 * 60 * 60 && 'a year') ||
           (delta <= 548 * 24 * 60 * 60 && `${Math.ceil(delta / 365 / 24 / 60 / 60)} years`)
    return `${duration} ago`
  }
}
