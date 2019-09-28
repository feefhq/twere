import { DB } from './storage/DB.js'
import { Router } from './Router.js'
import { ServiceWorker } from './ServiceWorker.js'

/**
 * @typedef {import('./Component.js').Component} Component
 */

/**
 * The main Application class. This is designed to be a constant with only
 * static methods, so that it can martial state, and be easily injected
 * anywhere.
 */
export class Application {
  /**
   * Add a service worker and register it.
   * @param {string} path path to a service worker prototype
   */
  static set worker (path) {
    ServiceWorker.register(path)
  }

  /**
   * A name for the application. Defaults to `default`
   * @type {string}
   */
  static get name () {
    return Application.appName || 'default'
  }

  static set name (appName) {
    Application.appName = appName
  }

  /**
   * Components which are attached to the application. Setting components will
   * automatically define the components as custom elements.
   * @type {Component[]}
   */
  static get components () {
    return Application.components
  }

  static set components (components) {
    if (components.constructor.name !== 'Array') {
      throw new Error('Components should be an array')
    }
    components.forEach(component => {
      console.debug('Registering component:', component.name)
      component.define(Application.appName)
    })
  }

  /**
   * @type {Model[]}
   */
  static set models (models = []) {
    if (models.constructor.name !== 'Array') {
      throw new Error('Modules should be passed in as an array.')
    }
    models.forEach(model => this.db.createObjectStore(model.name))
  }

  /**
   * @type {Database}
   */
  static get db () {
    return new DB(Application.name)
  }

  /**
   * @type {Router}
   */
  static get router () {
    return Router
  }
}
