import { Component } from '../core/Component.mjs'
import { NoteTemplate } from '../templates/NoteTemplate.mjs'

export class NoteComponent extends Component {
  constructor (args) {
    super(args)
    this.template = NoteTemplate
  }
}
