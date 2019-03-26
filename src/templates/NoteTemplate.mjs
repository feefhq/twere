import { Template } from '../core/Template.mjs'

export class NoteTemplate extends Template {
  render () {
    return `
    <dt>
      <a href='/note/${this.data.note.id}/delete'>
        ${new Date(this.data.note.createdAt).toISOString().slice(0, 10)}
      </a>
    </dt>
    <dd>
      <article>
        ${this.data.note.content}
      </article>
    </dd>`
  }
}
