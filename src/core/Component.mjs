import { Application } from '../core/Application.mjs'

/**
 * @description An isolated component
 * @export
 * @class Component
 */
export class Component extends window.HTMLElement {

  connectedCallback () {
    this.paint()
  }

  get template () {
    return ``
  }

  /**
   * @description Paint the element into the DOM
   * @memberof Component
   */
  paint () {
    const content = document.createElement('template')
    content.innerHTML = this.template
    this.appendChild(content.content);
    return this.innerHTML
  }

  /**
   * @description Define the component in the context of CustomElementRegistry
   * @static
   * @memberof Component
   *
   * Reference:
   * https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define
   */
  static define (options = {}) {
    if (!Application.appName) throw new Error(`You need to define a name for the application. Here's how:\n  Applicaiton.appName = 'myapp'`)
    window.customElements.define(`${Application.appName}-${this.name.toLowerCase()}`, this)
  }
}
