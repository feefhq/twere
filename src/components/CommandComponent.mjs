import { Component } from '../core/Component.mjs'
import { Note } from '../models/Note.mjs'

export class CommandComponent extends Component {
  get template () {
    return `
    <dl>
      <dt class="prompt">--></dt>
      <dd>
        <textarea name="name" rows="1" placeholder="..."></textarea>
      </dd>
    </dl>
    `
  }

  connectedCallback () {
    this.paint()
    this.textarea = this.querySelector('textarea')
    this.addEventListener('keyup', this.onKeyUp)
  }

  onKeyUp (event) {
    this.textarea.style.height = 'inherit'
    this.textarea.style.height = this.textarea.scrollHeight + 'px'
    if (event.shiftKey && event.key === 'Enter') this.submit()
  }

  submit () {
    new Note({ content: this.textarea.value }).save()
    this.reset()
  }

  reset () {
    this.textarea.value = ''
  }
}
