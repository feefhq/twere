import { Component } from '../core/Component.mjs'
import { NoteTemplate } from '../templates/NoteTemplate.mjs'

export class NoteComponent extends Component {
  constructor (note) {
    super()
    this.template = NoteTemplate
    this.data.note = note
    console.log('New note');
  }
}
