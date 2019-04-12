import { Template } from '../core/Template.mjs'

export class NoteTemplate extends Template {
  render () {
    return `
    <dt>
      <a href='/note/${this.data.note.id}' data-method='delete'>
        ${new Date(this.data.note.createdAt).toISOString().slice(0, 10)}
      </a>
      <form method='post' action='/note/${this.data.note.id}'>
        <button data-method="delete">Submit</button>
      </form>
    </dt>
    <dd>
      <article>
        ${this.data.note.content}
      </article>
    </dd>`
  }
}
