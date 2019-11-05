import { Component } from '../core/Component.js'
import { Note } from '../models/Note.js'
import { NoteComponent } from '../components/NoteComponent.js'
import { Template } from '../core/Template.js'

/**
 * Page component provides the overall page layout
 */
export class PageComponent extends Component {
  constructor () {
    super()
    this._.notes = []
  }

  connectedCallback () {
    this.getNoteList()
    Note.on('dirty', () => this.getNoteList())
    this.on('paint', () => this.doScroll())
    super.connectedCallback()
  }

  get html () {
    return Template.dom`
    <section>
      <dl>
        ${this._.notes.map(note => new NoteComponent(note))}
        <twere-commandcomponent></twere-commandcomponent>
      </dl>
    </section>`
  }

  doScroll () {
    const section = this.querySelector('section')
    section.scrollTop = section.scrollHeight
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
