import { Application } from './Application.js'

/**
 * A simple way to access a database and it's data stores. This is currently an
 * experiment in being able to wrap Promises and async/await around the standard
 * indexedDB implementation, which only uses callbacks.
 *
 * There are no tests at present.
 */
export class Database {
  /**
   * Register models which should be stored in the DB
   * @param {[]} models An array of model prototypes
   */
  static register (models) {
    console.debug('Registering models with Database:', models.join())
    this.models = models
  }

  /**
   * Wraps a promise around the standard indexedDB `open()` function.
   */
  static open () {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(Application.appName, 1)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
      request.onclose = () => {}
      request.onversionchange = () => {}
      request.onupgradeneeded = () => this.onupgradeneeded(request.result)
    })
  }

  /**
   * This is still a bit clunky, but is intended to upgrade the DB to a new
   * version whenever the schema changes. It doesn't really do that properly
   * yet.
   */
  static onupgradeneeded (db) {
    const filtered = this.models.filter(model => !db.objectStoreNames.contains(model.name))
    filtered.forEach(model => model.createObjectStore(db))
  }

  /**
   * Perform a transaction. Waits for a DB connection, and then handles the
   * transaction based on a detail function.
   * @param {string} name Object store name
   * @param {string} mode Transaction mode, e.g. `readwrite`
   * @param {function} detail function detailing activity of the transaction
   */
  static async doTransaction (name, mode, detail) {
    const db = await this.open()
    const transaction = db.transaction(name, mode)
    const store = transaction.objectStore(name)
    return detail(transaction, store)
  }

  /**
   * Returns a uniform promise for transactions.
   * @param {IDBTransaction} transaction
   */
  static transactionPromise (transaction, result) {
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve(result)
      transaction.onabort = () => reject(transaction.error)
      transaction.onerror = () => reject(transaction.error)
    })
  }

  /**
   * Returns a uniform promise for cursor-based transacrtions.
   * @param {IDBCursor} request A database cursor object
   */
  static cursorTransactionPromise (request) {
    return new Promise((resolve, reject) => {
      const list = []
      request.onsuccess = (event) => {
        const cursor = event.target.result
        if (!cursor) return resolve(list.reverse())
        list.push(cursor.value)
        cursor.continue()
      }
      request.onabort = () => reject(request.error)
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Create an object store. Dubious about this needing to be async
   * @param {string} name the name of the object store
   */
  static async createObjectStore (name, db) {
    console.log('Creating object store', name, db)
    return new Promise((resolve) => {
      const request = db.createObjectStore(name, { keyPath: 'id', autoIncrement: true })
      request.onsuccess = () => resolve(request)
    })
      .then(() => this)
  }

  /**
   * Saves an object to the DB, either inserting or updating, depending on it's
   * existence.
   * @param {string} name object store name
   * @param {object} obj the object to save
   */
  static save (name, obj) {
    return this.doTransaction(name, 'readwrite', (transaction, store) => {
      store.put(obj)
      return this.transactionPromise(transaction)
    })
  }

  /**
   * Deletes an entry from an object store
   * @param {string} name object store name
   * @param {Number} id the object to delete
   */
  static delete (name, id) {
    return this.doTransaction(name, 'readwrite', (transaction, store) => {
      store.delete(Number(id))
      return this.transactionPromise(transaction)
    })
  }

  /**
   * Get a list of entries in an object store
   * @param {string} name Name of the object store
   * @param {number} count Number of items to return
   * @param {string} order `asc` or `desc`
   */
  static async list (name, count = 1000, order = 'asc') {
    return this.doTransaction(name, 'readwrite', (transaction, store) => {
      const direction = (order === 'desc') ? 'prev' : 'next'
      return this.cursorTransactionPromise(store.openCursor(null, direction))
    })
  }
}
