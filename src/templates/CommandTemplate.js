import { Template } from '../core/Template.js'

export class CommandTemplate extends Template {
  render () {
    return `
      <dl>
        <dt class="prompt">--></dt>
        <dd class="prompt">
          <form method='post' action='/note'>
            <textarea name="content" rows="1" placeholder="..."></textarea>
          </form>
        </dd>
      </dl>
    `
  }
}
