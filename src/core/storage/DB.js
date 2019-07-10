import { Application } from '../Application.js'
import { Transaction } from './Transaction.js'

export class DB {
  constructor (name) {
    this.name = name
    this.database = null
    this.upgradeQueries = []
    return this
  }

  static new (name) {
    return new DB(name)
  }

  get version () {
    return this.database.version
  }

  get storeNames () {
    return this.database.objectStoreNames
  }

  /**
   * Opens a database connection.
   * @param {number} version
   */
  async open (version = 1) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.name, version)
      request.onsuccess = () => {
        this.database = request.result
        this.database.onversionchange = (event) => {
          if (!event.version) this.database.close()
        }
        resolve(this)
      }
      request.onerror = () => reject(request.error)
      request.onupgradeneeded = (event) => this.onupgradeneeded(event)
    })
  }

  /**
   * Delete the database. Will only happen once all connections to the DB have been
   * closed, which should be handled by the DB's `onversionchange` event handler.
   */
  async delete () {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.deleteDatabase(this.name)
      request.onsuccess = () => resolve(this)
    })
  }

  /**
   * Callback used for upgrading the database
   * @param {IDBVersionChangeEvent} event
   */
  onupgradeneeded (event) {
    this.upgradeQueries.forEach(async name => {
      await new Promise((resolve, reject) => {
        event.target.result.createObjectStore(name, { keyPath: 'id', autoIncrement: true })
      })
    })
    this.upgradeQueries = []
  }

  async triggerUpgrade () {
    await this.open(this.database.version + 1)
  }

  async createObjectStore (name) {
    this.upgradeQueries.push(name)
    return new Promise(async (resolve, reject) => {
      await this.triggerUpgrade()
      resolve(this)
    })
  }

  transaction (name) {
    try {
      return new Transaction(this.database, name)
    } catch (error) {
      throw new Error(`Oops ${error}`)
    }
  }

  static async promiseForRequest (request, mutator = (result) => result) {
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(request.result)
      }
    })
  }

  async query (mode, request, mutator) {
    await this.open()
    const transaction = this.database.transaction('Note', mode)
    const store = transaction.objectStore('Note')
    return request(transaction, store)
  }

  static async get (key) {
    return this.query('readonly', (transaction, store) => {
      return this.promiseForRequest(store.get(key))
    })
  }

  static async set (value) {
    return this.query('readwrite', (transaction, store) => {
      return this.promiseForRequest(store.put(value))
    })
  }

  static async delete (key) {
    return this.query('readwrite', (transaction, store) => {
      return this.promiseForRequest(store.delete(Number(key)))
    })
  }

  async list (criteria) {
    return new Promise((resolve, reject) => {
      const list = []
      this.query('readonly', (transaction, store) => {
        return this.openCursor(store)
          .then(async (cursor) => {
            await this.forEach(cursor, (result) => {
              list.push(result)
            })
            resolve(list)
          })
      })
    })
  }

  openCursor (store) {
    return new Promise((resolve, reject) => {
      const cursor = store.openCursor()
      cursor.onsuccess = () => {
        if (cursor.result) cursor.result.request = cursor
        resolve(cursor.result)
      }
    })
  }

  continue (cursor) {
    return new Promise((resolve, reject) => {
      cursor.request.onsuccess = () => resolve(cursor.result)
      cursor.request.onerror = () => reject(cursor.error)
      cursor.continue()
    })
  }

  forEach (cursor, callback) {
    return new Promise((resolve, reject) => {
      const iterate = () => {
        if (!cursor.request.result) {
          resolve(this)
          return
        }
        callback(cursor.request.result.value)
        this.continue(cursor).then(iterate, reject)
      }
      iterate()
    })
  }
}
