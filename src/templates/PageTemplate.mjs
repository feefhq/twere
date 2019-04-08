import { Template } from '../core/Template.mjs'
import { NoteComponent } from '../components/NoteComponent.mjs'

export class PageTemplate extends Template {
  render () {
    return `
    <section>
      <dl>
        ${this.data.notes.map(note => new NoteComponent(note)).join('')}
      </dl>
      <default-commandcomponent></default-commandcomponent>
    </section>`
  }
}
