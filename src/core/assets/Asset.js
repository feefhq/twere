export class Asset {
  /**
   * Rudimentary method for obtaining asset content from a file.
   */
  static async fetch (url) {
    if (url === undefined) throw new Error('No URL defined')
    const response = await window.fetch(url)
    return response
  }
}
