/**
 * Templates are tightly coupled with Components, for rendering.
 */
export class Template {
  /**
   * Creates a new template
   * @param {string} html a string literal
   */
  constructor (raw = ``) {
    this.raw = raw
    this.placeholders = []
    this.root = document.createElement('template')
    this.root.innerHTML = this.raw
  }

  /**
   * The template content
   */
  get content () {
    return this.root.content
  }

  deserialize (strings, ...expressions) {
    return [strings, expressions]
  }

  /**
   * @param {string[]} strings
   */
  static dom (strings, ...expressions) {
    const template = new Template()
    const parts = template.orderParts(strings, expressions)
    return template.generateNodes(parts)
  }

  /**
   * @param {string[]} strings
   */
  orderParts (strings = [], expressions = []) {
    return strings.reduce((carry, current, index) => {
      return carry.concat(current, (index + 1 === strings.length) ? [] : expressions[index])
    }, [])
  }

  /**
   *
   * @param {[]} partials
   */
  generateNodes (partials) {
    this.placeholders = []
    const html = partials.reduce((...args) => this.reduce(...args), []).join('')
    const template = document.createElement('template')
    template.innerHTML = html
    const content = this.replacePlaceholders(template.content)
    return content
  }

  reduce (carry, partial) {
    if (Array.isArray(partial)) {
      carry.concat(partial)
    } else if (partial instanceof window.Node) {
      const uid = this.generateID()
      this.placeholders.push({ uid, node: partial })
      return carry.concat(`<${partial.nodeName} id="${uid}"></${partial.nodeName}>`)
    } else {
      return carry.concat(partial)
    }
  }

  generateID () {
    return '_' + Math.random().toString(16).substr(2, 9)
  }

  replacePlaceholders (content) {
    this.placeholders.forEach(({ uid, node }) => {
      const placeholder = content.querySelector(`${node.nodeName}#${uid}`)
      placeholder.parentNode.replaceChild(node, placeholder)
    })
    return content
  }
}
