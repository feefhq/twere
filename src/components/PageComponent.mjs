import { Application } from '../core/Application.mjs'
import { Component } from '../core/Component.mjs'
import { Note } from '../models/Note.mjs'
import { Template } from '../core/Template.mjs'
import { NoteComponent } from './NoteComponent.mjs'

/**
 * @description Proving that a Component can be extended
 * @export
 * @class Extended
 * @extends {Component}
 */
export class PageComponent extends Component {

  connectedCallback () {
    this.getAll()
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
        <dt class="prompt">--></dt>
        <dd>
          <textarea name="name" rows="1" placeholder="..."></textarea>
        </dd>
      </dl>
    </section>`
  }

  /**
   * @description
   * @memberof Extended
   */
  getAll () {
    Note.getAll()
      .then(result => {
        this.notes = result
        this.paint()
      })
  }
}
