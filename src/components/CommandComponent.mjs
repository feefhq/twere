import { Component } from '../core/Component.mjs'
import { Note } from '../models/Note.mjs'
import { CommandTemplate } from '../templates/CommandTemplate.mjs'

export class CommandComponent extends Component {

  connectedCallback () {
    this.template = CommandTemplate
    this.paint()
    this.textarea = this.querySelector('textarea')
    this.textarea.focus()
    this.addEventListener('keyup', this.onKeyUp)
  }

  onKeyUp (event) {
    this.textarea.style.height = 'inherit'
    this.textarea.style.height = this.textarea.scrollHeight + 'px'
    if (event.shiftKey && event.key === 'Enter') this.submit()
  }

  submit () {
    const domEvent = document.createEvent('Event')
    domEvent.initEvent('submit', false, true)
    this.textarea.form.dispatchEvent(domEvent)

    // new Note({ content: this.textarea.value }).save()
    this.reset()
  }

  reset () {
    this.textarea.value = ''
  }
}
