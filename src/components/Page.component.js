import { Component } from '../core/Component.js'
import { Template } from '../core/Template.js'

/**
 * Page component provides the overall page layout
 */
export class PageComponent extends Component {
  static get css () {
    return false
  }

  get html () {
    return Template.html`
    <section>
      <twere-command-component></twere-command-component>
      <twere-note-list-component></twere-note-list-component>
      <twere-header-component></twere-header-component>
    </section>`
  }
}
