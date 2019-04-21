import { EventMixin } from './mixins/EventMixin.js'

/**
 * @description An isolated component
 * @export
 * @class Component
 */
export class Component extends EventMixin(window.HTMLElement) {
  constructor (data = {}) {
    super()
    this._ = data
  }

  connectedCallback () {
    this.paint()
  }

  set _ (newValue) {
    // Can now add a callback here
    super._ = newValue
  }

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
    this.trigger('paint', this)
    return template.innerHTML
  }
}