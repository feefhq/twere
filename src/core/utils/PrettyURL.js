/**
 * Create pretty HTML URLs. Currently very opinionated in the wrapped elements it uses.
 */
export class PrettyURL {
  /**
   * Get all of the URL parts from a URL string
   */
  static parts (url = '') {
    return new URL(url)
  }

  /**
   * Get a styled protocol part
   */
  static protocol (protocol = '') {
    return protocol ? `<i class='protocol'>${protocol}</i>` : protocol
  }

  /**
   * Get a styled search part
   */
  static search (search = '') {
    return search ? `<i class='search'>${search}</i>` : search
  }

  /**
   * Get a styled hash part
   */
  static hash (hash = '') {
    return hash ? `${hash}` : hash
  }

  /**
   * Get a styled host part
   */
  static host (host = '') {
    return host ? `<i class='host'>${host}</i>` : host
  }

  /**
   * Get a styled pathname part
   */
  static pathname (pathname = '') {
    return `${pathname
      .replace(/[/]$/g, '')
      .replace(/[/]/g, `<i class='split'>$&</i>`)
      .replace(/[-_]/g, `<i class='delimiter'>$&</i>`)}`
  }

  /**
   * Get a styled URL string. If the URL is not valid, the original string will be
   * returned.
   */
  static url (url = '') {
    try {
      const parts = this.parts(url)
      return (
        `${this.protocol(parts.protocol)}` +
        `${this.host(parts.host)}` +
        `${this.pathname(parts.pathname)}` +
        `${this.search(parts.search)}` +
        `${this.hash(parts.hash)}`
      )
    } catch (TypeError) {
      return url
    }
  }
}
