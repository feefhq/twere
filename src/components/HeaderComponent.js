import { Component } from '../core/Component.js'
import { Template } from '../core/Template.js'

/**
 * Header component provides a simple header introduction.
 */
export class HeaderComponent extends Component {
  get html () {
    return Template.html`
      <header>
        <h1>twere</h1>
        <h2>
          A simple, secure and unobtrusive journalling app.
        </h2>
        <h3>Simple</h3>
        <p>
          Capture the everyday things that you find, that you learn, that you do.
          Don't change <strong>what</strong> you do — change what you
          <strong>make</strong> of what you do.
        </p>
        <h3>
          Secure
        </h3>
        <p>
          <strong>Your</strong> data is stored on <strong>your</strong> device
          — it goes nowhere without <strong>your</strong> say-so. No cookies, and
          no need to sign up or log in. You can even use it offline.
        </p>
        <h3>Unobtrusive</h3>
        <p>
          Designed to stay out of your way, but close to hand when you need it. An
          obsessively simple UI focuses on your keyboard, rather than clicks or
          taps.
        </p>
      </header>`
  }
}
