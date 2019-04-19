/**
 * Markdown parser which is intended to be lightweight and sipmlistic. By
 * design, it avoids doing too much strict validation., with the assumption
 * being that the user generally knows what they're doing.
 */
export class Markdown {
  constructor (md = '') {
    this.md = `${md}\n\n`
    this.flux = this.md
  }

  /**
   * Parse Markdown string and fire out an HTML string.
   * @param {string} md Markdown text
   */
  static toHTML (md) {
    const processed = new Markdown(md)
    processed.codeBlock()
      .vanillaURL()
      .vanillaParagraph()
      .vanillaBR()
      .bold()
    return processed.result.trim()
  }

  mutate (regexp, newSubstr) {
    this.flux = this.flux.replace(regexp, newSubstr)
    return this
  }

  codeBlock () {
    return this.mutate(/``` *(\w*)\n([\s\S]*?)\n```/g, (match, p1, p2) => {
      p2 = p2.replace(RegExp(`^${p2.match(/^(\t| )+/)[0] || ''[0]}`, 'gm'), '')
      return `<pre>${p2.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`
    })
  }

  vanillaParagraph () {
    const multi = this.flux.match(/(.*)\n\n/g)
    if (multi.length > 1) this.mutate(/(.*)\n\n/g, '<p>$1</p>')
    this.flux = this.flux.trim()
    return this
  }

  vanillaBR () {
    return this.mutate(/\n/g, '<br>')
  }

  vanillaURL () {
    return this.mutate(/(http|https):\/\/[a-z0-9\-.]+\.[a-z]{2,10}(\/[^<\s]*)?/g, `<a href='$&' target='_blank'>$&</a>`)
  }

  bold () {
    return this.mutate(/\*\*(\S[\s\S]*?)\*\*/g, (match, capture) =>
      (/\S$/.test(capture)) ? `<strong>${capture}</strong>` : match
    )
  }

  get result () {
    return this.flux
  }
}
