import { Template } from '../core/Template.js'
import { Markdown } from './../core/utils/Markdown.js'

export class NoteTemplate extends Template {
  render () {
    return `
    <dt relative-time='${this._.note.relativeCreatedAt}'>
      <a href='/note/${this._.note.id}' data-method='delete'>
        ${this._.note.relativeCreatedAt}
      </a>
    </dt>
    <dd>
        ${Markdown.toHTML(this._.note.content)}
    </dd>`
  }
}
