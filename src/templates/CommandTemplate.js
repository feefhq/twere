import { Template } from '../core/Template.js'

export class CommandTemplate extends Template {
  render () {
    return `
      <dt class="prompt">--></dt>
      <dd class="prompt">
        <form method='post' action='/note'>
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
}
