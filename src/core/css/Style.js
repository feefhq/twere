/**
 * A module to encapsulate the loading and manipulation of CSS content for a component.
 */
export class Style {
  constructor (doc = document) {
    this.doc = doc
    /** @type {HTMLLinkElement} */
    this.link = this.doc.createElement('style')
  }

  /**
   * Rudimentary method for obtaining CSS text content from a file
   */
  async fetchCSS (url = '') {
    if (!url) return ''
    const response = await window.fetch(url)
    return response.text()
  }

  /**
   * Load CSS from a file and insert it into the link element
   */
  async loadCSS (url = '') {
    this.link.innerText = await this.fetchCSS(url)
  }
}
