/**
 * A simple way to access a database and it's data stores. This is currently an
 * experiment in being able to wrap Promises and async/await around the standard
 * indexedDB implementation, which only uses callbacks.
 */
import { Application } from './Application.js'

export class Database {
  static register (models) {
    console.debug('Registering models with Database:', models.join())
    this.models = models
  }

  /**
   * Get the current database version
   */
  get version () {
    return this.db.version
  }

  /**
   * Wraps a promise around the standard indexedDB API, and return `this` for
   * ability to chain.
   */
  static open () {
    return new Promise((resolve) => {
      const request = window.indexedDB.open(Application.appName, 1)
      request.onsuccess = () => resolve(request.result)
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
  static onupgradeneeded (db) {
    this.db = db
    const filtered = this.models.filter(model => !db.objectStoreNames.contains(model.name))
    filtered.forEach(model => model.createObjectStore())
  }

  /**
   * Create an object store. Dubious about this needing to be async
   */
  static createObjectStore (name) {
    return new Promise((resolve) => {
      const request = this.db.createObjectStore(name, { keyPath: 'id', autoIncrement: true })
      request.onsuccess = () => resolve(request)
    })
      .then(() => this)
  }

  static async save (name, obj) {
    await this.open()
    return new Promise((resolve) => {
      const tx = this.db.transaction(name, 'readwrite')
      const store = tx.objectStore(name)
      tx.oncomplete = () => resolve()
      store.add(obj)
    })
  }

  static async delete (name, id) {
    await this.open()
    return new Promise((resolve) => {
      const tx = this.db.transaction(name, 'readwrite')
      tx.oncomplete = (result) => {
        resolve()
      }
      const store = tx.objectStore(name)
      store.delete(Number(id))
    })
  }

  static async list (name, count = 1000, order = 'asc') {
    const direction = (order === 'desc') ? 'prev' : 'next'
    await this.open()
    return new Promise((resolve) => {
      const tx = this.db.transaction(name, 'readwrite')
      const store = tx.objectStore(name)
      const cursor = store.openCursor(null, direction)
      const result = []
      cursor.onsuccess = (e) => {
        const cursor = e.target.result
        if (cursor && result.length < count) {
          result.push(cursor.value)
          cursor.continue()
        } else {
          resolve(result.reverse())
        }
      }
    })
  }
}
