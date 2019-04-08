import { Component } from '../core/Component.mjs'
import { NoteTemplate } from '../templates/NoteTemplate.mjs'

export class NoteComponent extends Component {
  prepare () {
    this.template = NoteTemplate
  }
}
