import { Component } from '../core/Component.mjs'
import { Note } from '../models/Note.mjs'
import { PageTemplate } from '../templates/PageTemplate.mjs'

/**
 * @description Proving that a Component can be extended
 * @export
 * @class Extended
 * @extends {Component}
 */
export class PageComponent extends Component {
  constructor () {
    super()
    this._.notes = []
    this.template = PageTemplate
    this.getNoteList()
    Note.on('dirty', () => this.getNoteList())
    this.on('paint', () => this.doScroll())
  }

  doScroll () {
    const section = this.querySelector('section')
    section.scrollTop = section.scrollHeight
  }

  /**
   * @description Get a list of notes
   * @memberof PageComponent
   */
  getNoteList () {
    Note.list(100)
      .then(result => {
        this._.notes = result
        this.paint()
      })
  }
}
