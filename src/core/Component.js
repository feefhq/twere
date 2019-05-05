import { EventMixin } from './mixins/EventMixin.js'

/**
 * Base class for creating components
 */
export class Component extends EventMixin(window.HTMLElement) {
  constructor (data = {}) {
    super()
    this._ = data
  }

  /**
   *
   */
  toString () {
    return this.paint()
  }

  /**
   *
   */
  set _ (newValue) {
    // Can now add a callback here
    super._ = newValue
  }

  /**
   * Paint the element into the DOM
   */
  paint () {
    if (!this.template) return
    const template = Reflect.construct(this.template, [this])
    this.trigger('paint', this)
    return template.paint()
  }
}
