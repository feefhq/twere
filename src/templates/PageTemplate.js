import { Template } from '../core/Template.mjs'
import { NoteComponent } from '../components/NoteComponent.js'
import { all, no } from '../core/utils/TemplateHelpers.js'

export class PageTemplate extends Template {
  render () {
    return `
    <section>
      <dl>
        <dt></dt>
        <dd class='info'>
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
