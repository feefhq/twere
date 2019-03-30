import { Application } from '../core/Application.mjs'
import { EventMixin } from './mixins/EventMixin.mjs'

/**
 * @description An isolated component
 * @export
 * @class Component
 */
export class Component extends EventMixin(window.HTMLElement) {

  constructor () {
    super()
    this.data = {}
  }

  toString () {
    return this.paint()
  }

  /**
   * @description Paint the element into the DOM
   * @memberof Component
   */
  paint () {
    const template = this.template.new(this).paint()
    const forms = template.querySelectorAll('form')
    Array.from(forms).forEach(form => Application.router.registerForm(form))
    this.trigger('paint', this)
    return template.innerHTML
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
    console.debug('Registering component:', this.name)
    if (!Application.appName) throw new Error(`You need to define a name for the application. Here's how:\n  Applicaiton.appName = 'myapp'`)
    window.customElements.define(`${Application.appName}-${this.name.toLowerCase()}`, this)
  }
}
