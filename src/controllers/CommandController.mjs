/**
 * Command controller is responsible for managing command interface.
 */
import Controller from '../core/Controller.mjs'
import { main } from '../views/command.mjs'

export default class CommandController extends Controller {
  list () {
    this.build()
    return this
  }

  /**
   * This is a rudimentary attempt at creating a builder. It's trying to realise
   * a concept of component composition.
   */
  build () {
    const container = main()
    this.template = container
    this.render()
  }
}
