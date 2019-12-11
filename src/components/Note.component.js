import { Component } from '../core/Component.js'
import { Markdown } from '../core/utils/Markdown.js'
import { Template } from '../core/Template.js'

export class NoteComponent extends Component {
  constructor (note) {
    super()
    this.note = note
  }

  get html () {
    return Template.html`
      <time relative-time='${this.note.relativeCreatedAt}'>
        <a href='/note/${this.note.id}' data-method='delete'>
          &#x2326;
        </a>
        ${this.note.relativeCreatedAt}
      </time>
      <article>
          ${Markdown.toHTML(this.note.content)}
      </article>`
  }

  connectedCallback () {
    super.connectedCallback()
    if (
      this.previousSibling.querySelector &&
      this.previousSibling
        .querySelector('time')
        .getAttribute('relative-time') ===
        this.querySelector('time').getAttribute('relative-time')
    ) {
      this.classList.add('group')
    }
  }
}
