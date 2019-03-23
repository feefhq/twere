/**
 * A simple way to access a database and it's data stores. This is currently an
 * experiment in being able to wrap Promises and async/await around the standard
 * indexedDB implementation, which only uses callbacks.
 */
import { Application } from './Application.mjs'

export class Database {
  /**
   * Sets the name of the DB, and returns the instance.
   */
  constructor (name) {
    this._models = []
    this._name = name
    this._db = null
    return this
  }

  static init () {
    this.open()
  }

  /**
   * @description
   * @static
   * @param {*} models
   * @memberof Database
   */
  static register (models) {
    // models.forEach((model) => console.log(model))
  }

  /**
   * Get the current database version
   */
  get version () {
    return this._db.version
  }

  /**
   * Wraps a promise around the standard indexedDB API, and return `this` for
   * ability to chain.
   */
  static open () {
    return new Promise((resolve) => {
      const request = indexedDB.open(Application.appName, 1)
      request.onsuccess = () => {
        resolve(request.result)
      };
      request.onupgradeneeded = () => this.onupgradeneeded(request.result)
      request.onerror = () => {}
    })
      .then((result) => {
        this.db = result
        return this
      })
  }

  /**
   * This is still a bit clunky, but is intended to upgrade the DB to a new
   * version whenever the schema changes. It doesn't really do that properly
   * yet.
   */
  onupgradeneeded (db) {
    this._db = db
    const filtered = Application.models.filter(model => !db.objectStoreNames.contains(model.name))
    filtered.forEach((model) => {
      model.createObjectStore()
    })
  }

  /**
   * Create an object store. Dubious about this needing to be async
   */
  createObjectStore (name) {
    return new Promise((resolve) => {
      const request = this._db.createObjectStore(name, { autoIncrement: true })
      request.onsuccess = () => {
        resolve(request)
      };
    }).then(() => this)
  }

  /**
   * Wrapper around IDB transaction. Clunky, and could do with a Promise.
   */
  static transaction (name, readable) {
    return this.db.transaction(name, readable)
  }
}
