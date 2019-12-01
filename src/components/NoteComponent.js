import { Component } from '../core/Component.mjs'
import { Markdown } from '../core/utils/Markdown.mjs'
import { Template } from '../core/Template.js'

export class NoteComponent extends Component {
  constructor (note) {
    super()
    this.note = note
  }

  get html () {
    return Template.html`
    <dt relative-time='${this.note.relativeCreatedAt}'>
      <a href='/note/${this.note.id}' data-method='delete'>
        &#x2326;
      </a>
      ${this.note.relativeCreatedAt}
    </dt>
    <dd>
        ${Markdown.toHTML(this.note.content)}
    </dd>

    <style>
      twere-notecomponent {
        display: contents;
      }

      twere-notecomponent.group dt {
        opacity: 0;
      }

      twere-notecomponent dt a {
        opacity: 0;
        vertical-align: middle;
        color: var(--destructive-color);
        font-size: 1.25rem;
        line-height: 1.5;
        display: inline-block;
        padding: 0 0.25rem;
      }

      twere-notecomponent dt:hover {
        color: var(--caret-color-mute);
      }

      twere-notecomponent.group:hover dt,
      twere-notecomponent dt:hover a {
        opacity: 1;
      }

      twere-notecomponent dd {
        position: relative;
        transition: all .1s ease-in-out;
      }

      twere-notecomponent:hover dd {
        border-left-color: var(--caret-color-mute);
        background-color: hsla(0, 0%, 0%, .25);
      }
    </style>`
  }

  connectedCallback () {
    super.connectedCallback()
    if (
      this.previousSibling.querySelector &&
      this.previousSibling.querySelector('dt').getAttribute('relative-time') ===
        this.querySelector('dt').getAttribute('relative-time')
    ) {
      this.classList.add('group')
    }
  }
}
