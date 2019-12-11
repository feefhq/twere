import { DB } from './storage/DB.js'
import { Router } from './Router.js'
import { ServiceWorker } from './ServiceWorker.js'

/**
 * @typedef {import('./Component.js').Component} Component
 * @typedef {import('./Model.js').Model} Model
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
   * Label for the app
   */
  static get label () {
    return Application.appLabel || 'default'
  }

  static set label (label) {
    Application.appLabel = label
  }

  /**
   * Set a label for the application. Defaults to `default`
   * @param {string} label
   */
  static setLabel (label) {
    Application.label = label
  }

  /**
   * Sets componentsto attach to the application. Setting components will
   * automatically define the components as custom elements.
   * @param {Component[]} components
   */
  static setComponents (components) {
    if (components.constructor.name !== 'Array') {
      throw new Error('Components should be an array')
    }
    components.forEach(component => {
      console.debug('Registering component:', component.name)
      component.define(Application.label)
    })
  }

  /**
   * Set models for the app.
   * @param {Model[]} models
   */
  static setModels (models) {
    if (models.constructor.name !== 'Array') {
      throw new Error('Modules should be passed in as an array.')
    }
    models.forEach(model => this.db.createObjectStore(model.name))
  }

  /**
   * Get the DB instance for app.
   */
  static get db () {
    return new DB(Application.label)
  }

  /**
   * Get the app Router.
   */
  static get router () {
    return Router
  }
}
