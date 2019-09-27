import { EventMixin } from './mixins/EventMixin.js'
import { Template } from './Template.js'
import { Style } from './css/Style.js'

/**
 * Base class for creating components. Based on the Custom Elements API.
 * @extends HTMLElement
 */
export class Component extends EventMixin(window.HTMLElement) {
  /**
   * Invoked each time the element is appended into a document-connected element, as per
   * the Custom Elements API.
   *
   * Here we use it to do an initial paint, regardleess of state. Components are
   * expected to manage repaints as per their own criteria.
   */
  connectedCallback () {
    this.paint()
  }

  /**
   * HTML which is used to render the component, either as a simple `String` or as a
   * DocumentFragment. For convenience, a fragment can be set using the `Template.dom`
   * literal template tag.
   */
  get html () {
    return ''
  }

  set html (html) {
    super.html = html
  }

  /**
   * Paint the element into the DOM. Shadow DOM is not currently used, because CSS
   * styles are not yet abstracted properly.
   * @param {string|DocumentFragment} html
   */
  paint (html) {
    while (this.firstChild) this.removeChild(this.firstChild)
    this.append(html || this.html)
  }
}
