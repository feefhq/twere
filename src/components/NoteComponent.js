import { Component } from '../core/Component.js'
import { NoteTemplate } from '../templates/NoteTemplate.js'

export class NoteComponent extends Component {
  constructor (args) {
    super(args)
    this.template = NoteTemplate
    // this.addEventListener('mouseover', () => console.log(this))
  }
}
