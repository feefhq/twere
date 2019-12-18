import { EventMixin } from './mixins/EventMixin.js'
import { State } from './State.js'
import { Style } from './assets/Style.js'

/**
 * Base class for creating components. Based on the Custom Elements API.
 * @extends HTMLElement
 */
export class Component extends EventMixin(window.HTMLElement) {
  constructor () {
    super()
    this._ = new State()._
  }

  /**
   * Should CSS be loaded.
   */
  static get css () {
    return true
  }

  /**
   * Register the component as a custom element. Dependency assets will get loaded
   * prior to the element being added to the registry.
   */
  static async define (prefix = 'default') {
    const kebabString = this.name.replace(/([A-Z])/g, '-$1').toLowerCase()
    if (this.css) await this.insertCSS()
    window.customElements.define(`${prefix}${kebabString}`, this)
  }

  /**
   * Import CSS for this component, by inserting an import. Requires much more
   * work to ensure that file names are inferred correctly, and to use fetching
   * for async and error handling.
   */
  static async insertCSS () {
    const style = new Style(this.name)
    await style.fetch()
    const ref = document.querySelector('script')
    ref.parentNode.insertBefore(style.link, ref)
  }

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
