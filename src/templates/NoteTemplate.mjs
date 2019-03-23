import { Template } from '../core/Template.mjs'

export class NoteTemplate extends Template {
  render () {
    return `
    <dt>${new Date(this.data.note.createdAt).toISOString().slice(0, 10)}</dt>
    <dd>
      <article>
        ${this.data.note.content}
      </article>
    </dd>`
  }
}
