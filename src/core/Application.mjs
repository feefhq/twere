import { Database } from './Database.mjs';

/**
 * The main Application class. This is designed to be a singleton with only
 * static methods, so that it can maintain state, and be easily injected
 * anywhere.
 */
export class Application {

  constructor () {
    this.appName = null
    this.db = null
  }

  static init () {
    this.db = Database
  }

  /**
   * @description Define the application components
   * @static
   * @memberof Application
   */
  static set components (components) {
    components.forEach((component) => {
      component.define()
    })
  }

  /**
   * @description Define object models for the application
   * @static
   * @memberof Application
   */
  static set models (models = []) {
    if (models.constructor.name !== 'Array') throw new Error(`Modules should be passed in as an array.`)
    Database.register(models)
  }
}
