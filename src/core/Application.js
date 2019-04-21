import { Database } from './Database.js'
import { Router } from './Router.js'

/**
 * The main Application class. This is designed to be a constant with only
 * static methods, so that it can martial state, and be easily injected
 * anywhere.
 */
export class Application {
  /**
   * @type {string}
   */
  static get name () {
    return Application.appName || 'default'
  }

  static set name (appName) {
    Application.appName = appName
  }

  /**
   * @type {Comopnent[]}
   */
  static set components (components = []) {
    if (components.constructor.name !== 'Array') throw new Error(`Components should be passed in as an array.`)
    components.forEach(component => {
      console.debug('Registering component:', component.name)
      window.customElements.define(`${Application.appName}-${component.name.toLowerCase()}`, component)
    })
  }

  /**
   * @type {Model[]}
   */
  static set models (models = []) {
    if (models.constructor.name !== 'Array') throw new Error(`Modules should be passed in as an array.`)
    Database.register(models)
  }

  /**
   * @type {Database}
   */
  static get db () {
    return Database
  }

  /**
   * @type {Router}
   */
  static get router () {
    return Router
  }
}
