import { Component } from '../core/Component.mjs'
import { Template } from '../core/Template.js'

/**
 * Page component provides the overall page layout
 */
export class PageComponent extends Component {
  get html () {
    return Template.html`
    <section>
      <twere-notelistcomponent></twere-notelistcomponent>
      <dl>
        <twere-commandcomponent></twere-commandcomponent>
      </dl>
    </section>`
  }

  doScroll () {
    const section = this.querySelector('section')
    section.scrollTop = section.scrollHeight
  }
}
