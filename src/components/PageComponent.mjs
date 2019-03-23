import { Component } from '../core/Component.mjs'
import { Note } from '../models/Note.mjs'
import { NoteComponent } from './NoteComponent.mjs'

/**
 * @description Proving that a Component can be extended
 * @export
 * @class Extended
 * @extends {Component}
 */
export class PageComponent extends Component {

  connectedCallback () {
    this.getNoteList()
    Note.on('dirty', () => this.getNoteList())
  }

  get template () {
    return `
    <header>
      <h1>
        <span>&lsquo;</span>twere
      </h1>
    </header>
    <section>
      <dl>
        ${this.notes.map(note => new NoteComponent(note).template).join('')}
      </dl>
      <twere-commandcomponent></twere-commandcomponent>
    </section>`
  }

  /**
   * @description Get a list of notes
   * @memberof PageComponent
   */
  getNoteList () {
    Note.list(10)
      .then(result => {
        this.notes = result
        this.paint()
      })
  }
}
