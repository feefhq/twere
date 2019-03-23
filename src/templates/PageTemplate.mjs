import { Template } from '../core/Template.mjs'
import { NoteComponent } from '../components/NoteComponent.mjs'

export class PageTemplate extends Template {
  render () {
    return `
    <header>
      <h1>
        <span>&lsquo;</span>twere
      </h1>
    </header>
    <section>
      <dl>
        ${this.data.notes.map(note => new NoteComponent(note).template.render()).join('')}
      </dl>
      <twere-commandcomponent></twere-commandcomponent>
    </section>`
  }
}
