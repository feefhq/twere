import { Component } from '../core/Component.js'
import { Template } from '../core/Template.js'
import { Note } from '../models/Note.js'
import { NoteComponent } from '../components/NoteComponent.js'

export class NoteListComponent extends Component {
  constructor () {
    super()
    this._.notes = []
  }

  connectedCallback () {
    this.getNoteList()
    Note.on('dirty', () => this.getNoteList())
    super.connectedCallback()
  }

  get html () {
    return Template.html`
      ${this._.notes.map(note => new NoteComponent(note))}
    `
  }

  /**
   * @description Get a list of notes
   * @memberof PageComponent
   */
  async getNoteList () {
    this._.notes = await Note.list(100)
    this.paint()
  }
}
