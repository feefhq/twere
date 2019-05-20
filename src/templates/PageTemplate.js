import { Template } from '../core/Template.js'
import { NoteComponent } from '../components/NoteComponent.js'
import { all, no } from './../core/utils/TemplateHelpers.js'

export class PageTemplate extends Template {
  render () {
    return `
    <section>
      <dl>
      <dt>Welcome</dt><dd>
          <p>
            Welcome to <span class='brand'>twere</span>. This is an open souce
            journalling app for developers, with all of your data stored locally.
          </p>
          <p>
            It aspires to be a natural, everyday work tool which allows you to keep
            track of the things you're doing, a place to save code snippets and useful
            links, and to help you keep track of the things you want to get done.
          </p>
          <p>
            At the moment <span class='brand'>twere</span> is a very early proof of
            concept and is in a pre-alpha state. It should work in most modern desktop
            browsers, and mobile support will arrive soon.
            Do please try it out and contribute at
            <a href='https://github.com/feefhq/twere'>https://github.com/feefhq/twere</a>.
          </p>
        </dd>
        <dt>Start</dt>
        <dd>
          <p>
            The best way to use <span class='brand'>twere</span> is to keep it open in a
            tab throughout your day. Whatever you write will be saved on your device —
            your data goes nowhere. Tomorrow, just pick up where you left off.
          </p>
          <p>
            <span class='brand'>twere</span> takes it's cues from many keyboard-focused
            applications. There is no <code>submit</code> button. When you're ready to
            save a note, hit <code>CTRL + ENTER</code> or <code>CMD + ENTER</code>. You can also use
            simple Markdown including <code>_</code>, <code>**</code>, <code>\`</code> and <code>\`\`\`</code>.
          </p>
        </dd>
        ${all(this._.notes).then(note => new NoteComponent({ note }))}
        <twere-commandcomponent></twere-commandcomponent>
      </dl>
    </section>`
  }
}
