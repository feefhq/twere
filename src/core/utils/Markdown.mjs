export class Markdown {
  constructor (md = '') {
    this.md = md
    this.flux = this.md
  }

  static toHTML (md) {
    const processed = new Markdown(md)
    processed.vanillaParagraph()
      .vanillaBR()
      .bold()
    return processed.result
  }

  mutate (regexp, newSubstr) {
    this.flux = this.flux.replace(regexp, newSubstr)
    return this
  }

  vanillaParagraph () {
    const result = this.flux.replace(/\n([ \t]*\n)+/g, '</p><p>')
    this.flux = (result === this.flux) ? this.flux : `<p>${result}</p>`
    return this
  }

  vanillaBR () {
    return this.mutate(/\n/g, '<br>')
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
