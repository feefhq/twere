import { Component } from '../core/Component.mjs'
import { Note } from '../models/Note.mjs'
import { CommandTemplate } from '../templates/CommandTemplate.mjs'

export class CommandComponent extends Component {
  constructor () {
    super()
    this.template = CommandTemplate
  }

  connectedCallback () {
    super.connectedCallback()
    this.textarea = this.querySelector('textarea')
    this.textarea.focus()
    this.addEventListener('input', this.onInput)
    this.addEventListener('keyup', this.onKeyUp)
  }

  onInput (event) {
    this.textarea.style.height = 'auto'
    this.textarea.style.height = `${this.textarea.scrollHeight}px`
  }

  onKeyUp (event) {
    if (event.shiftKey && event.key === 'Enter') this.submit()
  }

  submit () {
    const event = new window.Event('submit', { bubbles: true, cancelable: true })
    this.textarea.form.dispatchEvent(event)
    this.reset()
  }

  reset () {
    this.textarea.value = ''
  }
}
