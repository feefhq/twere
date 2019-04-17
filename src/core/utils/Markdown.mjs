export class Markdown {
  constructor (md) {
    this.md = md
    this.flux = md
  }

  static toHTML (md) {
    const processed = new Markdown(md)
    processed.vanillaBR()
      .bold()
    return processed.result
  }

  mutate (regexp, newSubstr) {
    this.flux = this.flux.replace(regexp, newSubstr)
    return this
  }

  vanillaBR () {
    return this.mutate(/\n/g, '<br>\n')
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
