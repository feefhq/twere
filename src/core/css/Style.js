export class Style {
  constructor (doc = document) {
    this.doc = doc
    this.link = this.doc.createElement('style')
  }

  /**
   * Simple wrapper around `window.fetch()`
   * @param {string} url
   */
  fetch (url) {
    return window.fetch(url)
  }
}
