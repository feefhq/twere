import { Component } from '../core/Component.js'
import { Template } from '../core/Template.js'

/**
 * Page component provides the overall page layout
 */
export class PageComponent extends Component {
  get html () {
    return Template.html`
    <section>
      <twere-commandcomponent></twere-commandcomponent>
      <twere-notelistcomponent></twere-notelistcomponent>
      <twere-headercomponent></twere-headercomponent>
    </section>`
  }
}
