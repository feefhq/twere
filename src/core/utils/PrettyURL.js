/**
 * Create pretty HTML URLs. Currently very opinionated in the wrapped elements it uses.
 */
export class PrettyURL {
  static getParts (url = '') {
    return new URL(url)
  }

  static prettyProtocol (protocol = '') {
    return protocol ? `<i class='protocol'>${protocol}</i>` : protocol
  }

  static prettySearch (search = '') {
    return search ? `<i class='search'>${search}</i>` : search
  }

  static prettyHash (hash = '') {
    return hash ? `${hash}` : hash
  }

  static prettyHost (host = '') {
    return host ? `<i class='host'>${host}</i>` : host
  }

  static prettyPathname (pathname = '') {
    return `${pathname
      .replace(/[/]$/g, '')
      .replace(/[/]/g, `<i class='split'>$&</i>`)
      .replace(/[-_]/g, `<i class='delimiter'>$&</i>`)}`
  }

  static prettifyURL (url = '') {
    const parts = this.getParts(url)
    return (
      `${this.prettyProtocol(parts.protocol)}` +
      `${this.prettyHost(parts.host)}` +
      `${this.prettyPathname(parts.pathname)}` +
      `${this.prettySearch(parts.search)}` +
      `${this.prettyHash(parts.hash)}`
    )
  }
}
