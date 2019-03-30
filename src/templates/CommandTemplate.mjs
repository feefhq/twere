import { Template } from '../core/Template.mjs'

export class CommandTemplate extends Template {

  render () {
    return `
      <dl>
        <dt class="prompt">--></dt>
        <dd>
          <form method='post' action='/note'>
            <textarea name="name" rows="1" placeholder="..."></textarea>
          </form>
        </dd>
      </dl>
    `
  }
}
