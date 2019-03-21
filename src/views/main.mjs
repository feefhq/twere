/**
 * This is very early days for how templates might work, and is intended just to
 * demonstrate comoposition and parameter parsing. Doing list reductions in the
 * view is pretty gnarly, but at the same time, it would be good not to start
 * bringing in loads of helpers if it can be avoided.
 */
import { f } from '../core/view/helpers.mjs'

/**
 * A basic view which includes some params.
 */
export const main = (testVar = 'Foo', list = []) => `
  <header>
    <h1>
      <span>&lsquo;</span>twere
    </h1>
  </header>
  <section>
    <dl>${f(list)}</dl>
  </section>
`

/**
 * This is a smaller component view, which gets included multiple times in a
 * parent component.
 */
export const listItem = (testVar = 'Foo') => `
  <dt>--</dt>
  <dd>${f(testVar)}</dd>
`
