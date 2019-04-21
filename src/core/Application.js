import { Database } from './Database.js'
import { Router } from './Router.js'

/**
 * The main Application class. This is designed to be a singleton with only
 * static methods, so that it can maintain state, and be easily injected
 * anywhere.
 */
export class Application {
  /**
   * @description Register components for the application
   * @static
   * @memberof Application
   */
  static set components (components) {
    if (components.constructor.name !== 'Array') throw new Error(`Components should be passed in as an array.`)
    components.forEach(component => {
      console.debug('Registering component:', component.name)
      window.customElements.define(`${this.appName}-${component.name.toLowerCase()}`, component)
    })
  }

  /**
   * @description Register object models for the application
   * @static
   * @memberof Application
   */
  static set models (models = []) {
    if (models.constructor.name !== 'Array') throw new Error(`Modules should be passed in as an array.`)
    this.db.register(models)
  }

  /**
   * @description Register routes for the application
   * @static
   * @memberof Application
   */
  static get router () {
    return Router
  }
}

Application.appName = 'default'
Application.db = Database
Application.models = []
Application.components = []
