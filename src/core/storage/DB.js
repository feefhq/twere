import { Transaction } from './Transaction.js'

/**
 * A wrapper around `window.indexedDB` which uses promises.
 */
export class DB {
  /**
   * Constructs a new instance
   * @param {string} name the name of the DB
   */
  constructor (name) {
    this.name = name
    this.db = null
    this.upgradeQueries = []
    return this
  }

  /**
   * Alternative static constructor
   * @param {string} name the name of the DB
   */
  static new (name) {
    return new DB(name)
  }

  /**
   * Get the names of all stores in the DB
   */
  get storeNames () {
    return this.db.objectStoreNames
  }

  /**
   * Opens a database connection.
   * @param {number} version version of DB to open
   */
  async open (version) {
    return new Promise((resolve, reject) => {
      this.close() // Don't like this; must be a better way
      const db = window.indexedDB.open(this.name, version)
      db.onsuccess = e => {
        this.db = db.result
        this.db.onversionchange = e => e.version || this.db.close()
        resolve(this)
      }
      db.onerror = () => reject(db.error)
      db.onupgradeneeded = e => {
        this.onupgradeneeded(e)
      }
    })
  }

  /**
   * Close the DB connection if it is open.
   */
  close () {
    !this.db || this.db.close()
  }

  /**
   * Delete the database. Will only happen once all connections to the DB have been
   * closed, which should be handled by the DB's `onversionchange` event handler.
   */
  async deleteDatabase () {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.deleteDatabase(this.name)
      request.onsuccess = () => resolve(this)
      request.onblocked = e => reject(e.error)
    })
  }

  /**
   * Callback used for upgrading the database
   * @param {IDBVersionChangeEvent} e
   */
  onupgradeneeded (e) {
    this.upgradeQueries.forEach(async name => {
      e.target.result.createObjectStore(name, {
        keyPath: 'id',
        autoIncrement: true
      })
    })
    this.upgradeQueries = []
  }

  /**
   * Shortcut to trigger an upgrade.
   */
  async triggerUpgrade () {
    await this.open(this.db ? this.db.version + 1 : 1)
  }

  /**
   * Creates a new object store by triggering an upgrade
   * @param {string} name
   */
  async createObjectStore (name) {
    this.upgradeQueries.push(name)
    return new Promise(async (resolve, reject) => {
      await this.triggerUpgrade()
      resolve(this)
    })
  }

  /**
   * Very experimental interface to Transaction objects
   * @param {string} name
   */
  transaction (name) {
    try {
      return new Transaction(this.db, name)
    } catch (error) {
      throw new Error(`Oops ${error}`)
    }
  }

  /**
   * Wrapperr for simple queries. Likely to be replaced with a Transaction interface.
   * @param {*} request the DB request
   */
  async promiseForRequest (request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * Execute a DB query. Will almost certainly be coupled with Transaction interface.
   * @param {*} mode
   * @param {*} request
   */
  async query (storeName, mode, request) {
    await this.open()
    const tx = this.db.transaction(storeName, mode)
    const store = tx.objectStore(storeName)
    return request(tx, store)
  }

  /**
   * Get a single record from a datastore
   * @param {string} storeName
   * @param {number} key
   */
  async get (storeName, key) {
    return this.query(storeName, 'readonly', (tx, store) => {
      return this.promiseForRequest(store.get(key))
    })
  }

  /**
   * Add or update a value in a data store.
   * @param {string} storeName
   * @param {*} value
   * @param {number} key
   */
  async set (storeName, value, key) {
    return this.query(storeName, 'readwrite', (tx, store) => {
      return this.promiseForRequest(store.put(value))
    })
  }

  /**
   * Delete a record in a datastore
   * @param {string} storeName
   * @param {number} key
   */
  async delete (storeName, key) {
    return this.query(storeName, 'readwrite', (tx, store) => {
      return this.promiseForRequest(store.delete(Number(key)))
    })
  }

  /**
   * Get an array of records in a datastore, with criteria applied. Very basic at the
   * moment, and will likely get a separate Criteria interface.
   * @param {string} storeName
   */
  async list (storeName) {
    return new Promise((resolve, reject) => {
      const list = []
      this.query(storeName, 'readonly', (tx, store) => {
        return this.openCursor(store).then(async cursor => {
          await this.forEach(cursor, result => {
            list.push(result)
          })
          resolve(list)
        })
      })
    })
  }

  /**
   * Open an iterative cursor for a DB request. This ough to be a much more private
   * function.
   * @param {string} store
   */
  openCursor (store) {
    return new Promise((resolve, reject) => {
      const cursor = store.openCursor()
      cursor.onsuccess = () => resolve(cursor)
    })
  }

  /**
   * Progresses a cursor. Needs to be made more private.
   * @param {*} request
   */
  continue (request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
      request.result.continue()
    })
  }

  /**
   * Iterates over a cursor and returns the rows to a callback.
   * @param {*} cursor
   * @param {*} callback
   */
  forEach (cursor, callback) {
    return new Promise((resolve, reject) => {
      const iterate = () => {
        if (!cursor.result) return resolve(this)
        callback(cursor.result.value)
        this.continue(cursor).then(iterate, reject)
      }
      iterate()
    })
  }
}
