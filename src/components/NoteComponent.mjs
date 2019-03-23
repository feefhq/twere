import { Component } from '../core/Component.mjs'

export class NoteComponent extends Component {

  constructor (note) {
    super()
    this.note = note
  }

  get template () {
    return `
      <dt>${new Date(this.note.createdAt).toISOString().slice(0, 10)}</dt>
      <dd>
        <article>
          ${this.note.content}
        </article>
      </dd>
    `
  }

}
