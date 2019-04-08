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
    this.prepare()
  }

  connectedCallback () {
    this.paint()
    this.ready()
  }

  prepare () {}

  ready () {}

  toString () {
    return this.paint()
  }

  /**
   * @description Paint the element into the DOM
   * @memberof Component
   */
  paint () {
    if (!this.template) return
    const template = this.template.new(this).paint()
    const forms = template.querySelectorAll('form')
    Array.from(forms).forEach(form => Application.router.registerForm(form))
    this.trigger('paint', this)
    return template.innerHTML
  }
}
