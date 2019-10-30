import { Component } from '../core/Component.js'
import { Template } from '../core/Template.js'

/**
 * A web component to provides command prompt functionality.
 */
export class CommandComponent extends Component {
  get html () {
    return Template.dom`
      <dt class="prompt">--></dt>
      <dd class="prompt">
        <form method='post' action='/note'>
          <label>Submit</label>
          <textarea name="content" rows="1" placeholder="..."></textarea>
        </form>
      </dd>
      <style>
        dt.prompt {
          color: var(--caret-color);
          line-height: 2;
          font-size: 1rem;
        }
        dt.prompt.out {
          animation: 0.1s ease-in 0s prompt_out;
        }
        dt.prompt.in {
          animation: 0.1s ease-out 0s prompt_in;
        }
        @keyframes prompt_out {
          0% {
            opacity: 1;
            transform: translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: translate(0, 2em);
          }
        }
        @keyframes prompt_in {
          0% {
            opacity: 0;
            transform: translate(0, -2em);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0);
          }
        }
      </style>
    `
  }

  /**
   * Need to think about whether this can be factored out. This is a WC native
   * function which we're overriding and it feels icky.
   */
  connectedCallback () {
    super.connectedCallback()
    this.context = '--&gt;'
    this.textarea = this.querySelector('textarea')
    this.textarea.focus()
    this.scrollDown()
    this.addEventListener('input', this.onInput)
    this.addEventListener('keydown', this.onKeyUp)
  }

  /**
   * Handles things whenever the text is changed. Needs to be matured, and think
   * about whether this will handle human and compute input.
   * @param {Event} event The source event
   */
  onInput (event) {
    this.contextHelper()
    const computedStyle = getComputedStyle(this.textarea)
    this.textarea.style.height = 'auto'
    const height =
      this.textarea.scrollHeight -
      parseFloat(computedStyle.paddingTop) -
      parseFloat(computedStyle.paddingBottom)
    this.textarea.style.height = `${height}px`
    this.scrollDown()
  }

  /**
   * Handles user interaction when a key is depressed. All it does right now is
   * submit if a shortcut is used.
   * @param {Event} event The source event
   */
  onKeyUp (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
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
    const event = new window.Event('submit', {
      bubbles: true,
      cancelable: true
    })
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
    if (
      /(http|https):\/\/[a-z0-9\-.]+\.[a-z]{2,10}(\/[^<\s]*)?/g.test(
        this.textarea.value
      )
    ) {
      context = '~@'
    } else if (/^`{3}/g.test(this.textarea.value)) {
      context = '&lt;/&gt;'
    } else if (/^\?/g.test(this.textarea.value)) {
      context = '!=='
    } else if (/^[L|l]isten/g.test(this.textarea.value)) {
      context = '&#9836;'
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
    this.prompt.addEventListener('animationend', event =>
      this.onAnimationEnd(event)
    )
  }

  /**
   * Fairly rudimentary hack to make sure that when focus is on this component
   * the textarea doesn't hang from the bottom of the viewport.
   */
  scrollDown () {
    window.scrollBy(0, 5000)
  }
}
