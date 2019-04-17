import { Template } from '../core/Template.mjs'
import { Markdown } from './../core/utils/Markdown.mjs'

export class NoteTemplate extends Template {
  render () {
    return `
    <dt>
      <a href='/note/${this._.note.id}' data-method='delete'>
        ${new Date(this._.note.createdAt).toISOString().slice(0, 10)}
      </a>
    </dt>
    <dd>
      <article>
        ${Markdown.toHTML(this._.note.content)}
      </article>
    </dd>`
  }
}
