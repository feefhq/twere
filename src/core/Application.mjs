import { Database } from './Database.mjs';

/**
 * The main Application class. This is designed to be a singleton with only
 * static methods, so that it can maintain state, and be easily injected
 * anywhere.
 */
export class Application {

  /**
   * @description Simply gets a default Database class
   * @readonly
   * @static
   * @memberof Application
   */
  static get db () {
    return Database
  }

  /**
   * @description Define the application components
   * @static
   * @memberof Application
   */
  static set components (components) {
    if (components.constructor.name !== 'Array') throw new Error(`Components should be passed in as an array.`)
    components.forEach(component => component.define())
  }

  /**
   * @description Define object models for the application
   * @static
   * @memberof Application
   */
  static set models (models = []) {
    if (models.constructor.name !== 'Array') throw new Error(`Modules should be passed in as an array.`)
    this.db.register(models)
  }
}
