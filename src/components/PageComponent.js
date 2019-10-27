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
        <dt></dt>
        <dd class='info'>
          <p>
            The best way to use <span class='brand'>twere</span> is to keep it open in a
            tab throughout your day. Whatever you write will be saved on your device —
            your data goes nowhere. Tomorrow, just pick up where you left off.
          </p>
          <p>
            <span class='brand'>twere</span> takes it's cues from many keyboard-focused
            applications. There is no <code>submit</code> button. When you're ready to
            save a note, hit <code>CTRL + ENTER</code> or <code>CMD + ENTER</code>. You can also use
            simple Markdown including <code>_</code>, <code>**</code>, <code>\`</code> and <code>\`\`\`</code>.
          </p>
        </dd>
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
