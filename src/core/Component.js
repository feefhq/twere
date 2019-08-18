import { EventMixin } from './mixins/EventMixin.js'

/**
 * Base class for creating components
 */
export class Component extends EventMixin(window.HTMLElement) {
  connectedCallback () {
    console.log(this.constructor.name, 'connected');
    this.paint()
  }

  get html () {
    return ``
  }

  /**
   * Paint the element into the DOM
   */
  paint () {
    while (this.firstChild) {
      this.removeChild(this.firstChild)
    }
    this.appendChild(this.html)
  }
}
