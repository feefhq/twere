import { Component } from '../core/Component.js'
import { NoteTemplate } from '../templates/NoteTemplate.js'

export class NoteComponent extends Component {
  constructor (args) {
    super(args)
    this.template = NoteTemplate
  }

  connectedCallback () {
    if (this.previousSibling.querySelector && this.previousSibling.querySelector('dt').getAttribute('relative-time') === this.querySelector('dt').getAttribute('relative-time')) {
      this.classList.add('group')
    }
  }
}
