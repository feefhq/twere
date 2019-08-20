import { EventMixin } from './mixins/EventMixin.js'
import { Template } from './Template.js'

/**
 * Base class for creating components. Based on the Custom Elements API.
 * @extends HTMLElement
 */
export class Component extends EventMixin(window.HTMLElement) {
  /**
   * Invoked each time the element is appended into a document-connected element, as per
   * the Custom Elements API. This is a bit of a black box callback. It's not part of
   * a documented prototype; instead it gets added as part of a mutation, when calling
   * `CustomElementRegistry.define()`.
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
   * @returns {String|DocumentFragment}
   */
  get html () { return '' }
  set html (html) { super.html = html }

  /**
   * Paint the element into the DOM
   * @param {string|DocumentFragment} html
   */
  paint (html) {
    while (this.firstChild) this.removeChild(this.firstChild)
    this.append(html || this.html)
  }
}
