import { Component } from '../core/Component.js'
import { CommandTemplate } from '../templates/CommandTemplate.js'

/**
 * A web component to provides command prompt functionality.
 */
export class CommandComponent extends Component {
  constructor () {
    super()
    this.template = CommandTemplate
    this.context = '--&gt;'
  }

  /**
   * Need to think about whether this can be factored out. This is a WC native
   * function which we're overriding and it feels icky.
   */
  connectedCallback () {
    this.paint()
    this.textarea = this.querySelector('textarea')
    this.textarea.focus()
    this.scrollDown()
    this.addEventListener('input', this.onInput)
    this.addEventListener('keyup', this.onKeyUp)
  }

  /**
   * Handles things whenever the text is changed. Needs to be matured, and think
   * about whether this will handle human and compute input.
   * @param {Event} event The source event
   */
  onInput (event) {
    this.contextHelper()
    this.textarea.style.height = 'auto'
    this.textarea.style.height = `${this.textarea.scrollHeight}px`
    this.scrollDown()
  }

  /**
   * Handles user interaction when a key is depressed. All it does right now is
   * submit if a shortcut is used.
   * @param {Event} event The source event
   */
  onKeyUp (event) {
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault()
      this.submit()
    }
  }

  /**
   * Handles events triggered by animations
   * @param {AnimationEvent} event The source event
   */
  onAnimationEnd (event) {
    switch (event.animationName) {
      case 'prompt_out':
        this.prompt.innerHTML = this.context
        event.target.classList.remove('out')
        event.target.classList.add('in')
        break
      case 'prompt_in':
        break
      default:
        break
    }
  }

  /**
   * Submit the form, dispatch an event and do a reset. Should probably
   * listen to itself for the reset rather than being hard-coded, because the
   * dispatch might fail.
   */
  submit () {
    const event = new window.Event('submit', { bubbles: true, cancelable: true })
    this.textarea.form.dispatchEvent(event)
    this.reset()
  }

  /**
   * Reset the form, usually after submission
   */
  reset () {
    this.textarea.value = ''
  }

  /**
   * Provide a means for adding UI sugar for content context. Very primitive at
   * the moment, and very much just a POC, as it doesn't really do much and
   * needs to be abstracted.
   */
  contextHelper () {
    let context = '--&gt;'
    if (/(http|https):\/\/[a-z0-9\-.]+\.[a-z]{2,10}(\/[^<\s]*)?/g.test(this.textarea.value)) {
      context = '~@'
    } else if (/^`{3}/g.test(this.textarea.value)) {
      context = '&lt;/&gt;'
    } else if (/^\?/g.test(this.textarea.value)) {
      context = '!=='
    }
    if (context !== this.context) this.changeContext(context)
  }

  /**
   * Changes the context by doing some UI animation magic.
   * @param {string} context A context string
   */
  changeContext (context) {
    this.context = context
    this.prompt = this.querySelector('dt.prompt')
    this.prompt.classList.remove('in')
    this.prompt.classList.add('out')
    this.prompt.addEventListener('animationend', event => this.onAnimationEnd(event))
  }

  /**
   * Fairly rudimentary hack to make sure that when focus is on this component
   * the textarea doesn't hang from the bottom of the viewport.
   */
  scrollDown () {
    window.scrollBy(0, 5000)
  }
}
