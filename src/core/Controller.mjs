/**
 * The C in MVC
 */
import Application from './Application.mjs'

export default class Controller {
  /**
   * Simply sets up some defaults at the moment.
   */
  constructor () {
    this.template = ''
    this.name = this.constructor.name
    this.fragment = document.createDocumentFragment()
  }

  /**
   * Renders HTML by creating a `DocumentFragment` and then attaching it to the
   * document body. This will definitely change in the near future, as views
   * start to become a concept, and start to consider repainting, caching etc.
   */
  render () {
    const content = document.createElement('div')
    content.innerHTML = this.template
    content.setAttribute('id', `twere-${this.name}`)
    this.fragment.appendChild(content)
    Application.node.appendChild(this.fragment)
  }
}
