import { Template } from '../core/Template.mjs'
import { NoteComponent } from '../components/NoteComponent.mjs'

export class PageTemplate extends Template {
  render () {
    return `
    <section>
      <dl>
        ${this._.notes.map(note => new NoteComponent({ note: note })).join('')}
      </dl>
      <twere-commandcomponent></twere-commandcomponent>
    </section>`
  }
}
