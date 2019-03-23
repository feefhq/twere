import { Component } from '../core/Component.mjs'
import { NoteTemplate } from '../templates/NoteTemplate.mjs'

export class NoteComponent extends Component {

  constructor (note) {
    super()
    this.template = new NoteTemplate(this)
    this.data.note = note
    this.paint()
  }
}
