import { Component } from '../core/Component.js'
import { Note } from '../models/Note.js'
import { PageTemplate } from '../templates/PageTemplate.js'

/**
 * Page component provides the overall page layout
 */
export class PageComponent extends Component {
  constructor () {
    super()
    this._.notes = []
    this.template = PageTemplate
    Note.on('dirty', () => this.getNoteList())
    // this.on('paint', () => this.doScroll())
    this.getNoteList()
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
