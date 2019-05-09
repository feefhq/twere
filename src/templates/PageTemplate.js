import { Template } from '../core/Template.js'
import { NoteComponent } from '../components/NoteComponent.js'
import { all, no } from './../core/utils/TemplateHelpers.js'

export class PageTemplate extends Template {
  render () {
    return `
    <section>
      <dl>
        ${all(this._.notes).then(note => new NoteComponent({ note }))}
        ${no(this._.notes).then(`<dt></dt><dd>Welcome to twere</dd>`)}
        <twere-commandcomponent></twere-commandcomponent>
      </dl>
    </section>`
  }
}
