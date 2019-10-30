import { Component } from '../core/Component.js'
import { Markdown } from '../core/utils/Markdown.js'
import { Template } from '../core/Template.js'

export class NoteComponent extends Component {
  constructor (note) {
    super()
    this.note = note
  }

  get html () {
    return Template.dom`
    <dt relative-time='${this.note.relativeCreatedAt}'>
      <a href='/note/${this.note.id}' data-method='delete'>
        &#x2326;
      </a>
      ${this.note.relativeCreatedAt}
    </dt>
    <dd>
        ${Markdown.toHTML(this.note.content)}
    </dd>`
  }

  connectedCallback () {
    super.connectedCallback()
    if (
      this.previousSibling.querySelector &&
      this.previousSibling.querySelector('dt').getAttribute('relative-time') ===
        this.querySelector('dt').getAttribute('relative-time')
    ) {
      this.classList.add('group')
    }
  }
}
