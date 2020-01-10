/**
 * Markdown parser which is intended to be lightweight and sipmlistic. By
 * design, it avoids doing too much strict validation., with the assumption
 * being that the user generally knows what they're doing.
 */
export default class Markdown {
  constructor (md = '') {
    this.md = `${md}`
    /** @type {string} */
    this.flux = this.md
  }

  /**
 * Parse Markdown string and fire out an HTML string.
 * @param {string} md Markdown text
 */
  static toHTML (md) {
    const processed = new Markdown(md)
    processed
      .trim()
      .codeBlock()
      .vanillaURL()
      .vanillaParagraph()
      .vanillaBR()
      .inlineCode()
      .bold()
    return processed.result.trim()
  }

  /**
 * Mutate the currently parsed string based on a regexp replacement. Can be
 * either a string replacement or a callback.
 * @param {RegExp} regexp a regular expression to match
 * @param {*} newSubstr either a string replacement, or a callback fucntion
 */
  mutate (regexp, newSubstr) {
    this.flux = this.flux.replace(regexp, newSubstr)
    return this
  }

  /**
 * Tidy up any ragged spaced or tabbed outdents
 * @param {String} str String to be tidied
 */
  outdent (str) {
    const firstLine = str.match(/^(\t| )+/) || []
    const regex = RegExp(`^${firstLine[0]}`, 'gm')
    return str.replace(regex, '')
  }

  /**
 * Escape any disruptive characters, such as chevrons
 * @param {String} str String to be escaped
 */
  escape (str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  /**
 * Strip any leading or trailing whitepace
 */
  trim () {
    this.flux = this.flux.trim()
    this.flux = this.flux.endsWith('/') ? this.flux.slice(0, -1) : this.flux
    this.flux = this.flux.endsWith('#') ? this.flux.slice(0, -1) : this.flux
    return this
  }

  codeBlock () {
    return this.mutate(/```\s*(\w*)\n([\s\S]*?)\n```\n*/g, (match, p1, p2) => {
      p2 = this.outdent(p2)
      return `<pre>${this.escape(p2)}</pre>\n`
    })
  }

  vanillaParagraph () {
    let negate = false
    const paras = this.flux.split(/\n{2}/)
    if (paras.length === 1) return this
    this.flux = paras
      .map(para => {
        if (/^(<pre>|`{3})/.test(para.trim())) negate = true
        const returnVal = negate ? `${para}\n\n` : `<p>${para.trim()}</p>`
        if (/(<\/pre>|`{3}$)/.test(para.trim())) negate = false
        return returnVal
      })
      .join('')
      .trim()
    return this
  }

  vanillaBR () {
    let negate = false
    const lines = this.flux.trim().split(/\n/)
    this.flux = lines
      .map((line, index, array) => {
        if (index === array.length - 1) return line
        if (/^(<pre|`{3})/.test(line.trim())) negate = true
        const returnValue = negate ? `${line}\n` : `${line}<br>`
        if (/(<\/pre>|`{3}$)/.test(line.trim())) negate = false
        return returnValue
      })
      .join('')
      .trim()
    return this
  }

  /**
   * Convert URLs to safe cross-origin URLs. `noreferrer` ensures optimum performance.
   */
  vanillaURL () {
    return this.mutate(
      /(http|https):\/\/[a-z0-9\-.]+\.[a-z]{2,10}(\/[^<\s]*)?/g,
      (match, capture) => {
        return `<a href='${match}' target='_blank' rel='noreferrer'>${match}</a>`
        // return `<a href='${match}' target='_blank' rel='noreferrer'>${PrettyURL.url(match)}</a>`
      }
    )
  }

  bold () {
    return this.mutate(/\*{2}(\S[\s\S]*?)\*{2}/g, (match, capture) =>
      /\S$/.test(capture) ? `<strong>${capture}</strong>` : match
    )
  }

  /**
 * Convert `` to <code></code>
 */
  inlineCode () {
    return this.mutate(/`(\S[\s\S]*?)`/g, (match, capture) =>
      /\S$/.test(capture) ? `<code>${capture}</code>` : match
    )
  }

  get result () {
    return this.flux
  }
}
