export class Asset {
  /**
   * Rudimentary method for obtaining asset content from a file.
   */
  static fetch (url = '') {
    return window.fetch(url)
  }
}
