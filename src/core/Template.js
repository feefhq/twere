/**
 * A wrapper around the `HTMLTemplateELement` object, which mixes in some useful
 * string parsing functionality and convenience functions for working with a template.
 */
export class Template {
  /**
   * Creates a new template instance
   */
  constructor () {
    /** @type {string[]} */
    this.placeholders = []
    this.element = document.createElement('template')
  }

  /**
   * Get template content fragment
   */
  get content () {
    return this.element.content
  }

  /**
   * Get a DOM reprensentation of a string literal, with handy parsing and population of
   * expressions, iterations and insertion of nodes. This funciton is intended to be
   * used as a literal template tag.
   * @example myTemplate.dom`myString ${myExpression}`
   *
   * @param {string[]} strings
   * @param {...any} expressions
   */
  html (strings, ...expressions) {
    const parts = this.orderParts(strings, ...expressions)
    return this.generateNodes(parts)
  }

  /**
   * Static implementation for getting a DOM reprensentation of a string literal, with
   * handy parsing and population of expressions, iterations and insertion of nodes.
   * This funciton is intended to be used as a literal template tag.
   * @example Template.dom`myString ${myExpression}`
   *
   * @param {string[]} strings
   * @param {...any} expressions
   */
  static html (strings, ...expressions) {
    return new Template().html(strings, expressions)
  }

  /**
   * Order parts to make interpolation easier
   * @param {string[]} strings
   * @param {any[]} expressions
   */
  orderParts (strings, expressions) {
    return strings.reduce((carry, current, index) => {
      return carry.concat(
        current,
        index + 1 === strings.length ? [] : expressions[index]
      )
    }, [])
  }

  /**
   * Generate DOM nodes and return the content of a new template
   * @param {any[]} partials
   */
  generateNodes (partials) {
    this.placeholders = []
    const parts = partials.reduce((...args) => this.reduce(...args), [])
    const template = document.createElement('template')
    template.innerHTML = parts.join('')
    return this.replacePlaceholders(template.content)
  }

  /**
   * Walks the partials of a string literal and builds up a concatenated string ready
   * for rendering. Not particularly sophisticated at the moment, other than creating
   * placeholders for nodes to be inserted after generation.
   * @param {Function} accumulator a fucntion which gets used in reduction
   * @param {any} partial the currently processed partial
   */
  reduce (accumulator, partial) {
    if (partial instanceof Node) {
      const uid = this.generateID()
      this.placeholders.push({ uid, node: partial })
      return accumulator.concat(
        `<${partial.nodeName} id="${uid}"></${partial.nodeName}>`
      )
    } else {
      return accumulator.concat(partial)
    }
  }

  /**
   * Generate a random UID
   */
  generateID () {
    return (
      '_' +
      Math.random()
        .toString(16)
        .substr(2, 9)
    )
  }

  /**
   * Replaces simple placeholder elements with proper nodes. Intended to be used once a
   * DOM tree is in situ.
   * @param {DocumentFragment} content
   */
  replacePlaceholders (content) {
    this.placeholders.forEach(({ uid, node }) => {
      const placeholder = content.querySelector(`${node.nodeName}#${uid}`)
      placeholder.parentNode.replaceChild(node, placeholder)
    })
    return content
  }
}
