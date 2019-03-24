import { Template } from '../core/Template.mjs'

export class CommandTemplate extends Template {

  render () {
    return `
      <dl>
        <dt class="prompt">--></dt>
        <dd>
          <textarea name="name" rows="1" placeholder="..."></textarea>
        </dd>
      </dl>
    `
  }
}
