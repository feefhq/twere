import { Transaction } from './Transaction.js'

export class DB {

  constructor (name) {
    this.name = name
    this.db = null
    this.upgradeQueries = []
    return this
  }

  static new (name) {
    return new DB(name)
  }

  get version () {
    return this.db.version
  }

  get storeNames () {
    return this.db.objectStoreNames
  }

  /**
   * Opens a database connection.
   * @param {number} version
   */
  async open (version) {
    return new Promise((resolve, reject) => {
      this.close() // Don't like this; must be a better way
      const db = window.indexedDB.open(this.name, version)
      db.onsuccess = () => {
        this.db = db.result
        this.db.onversionchange = e => e.version || this.db.close()
        resolve(this)
      }
      db.onerror = () => reject(db.error)
      db.onupgradeneeded = e => this.onupgradeneeded(e)
    })
  }

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
      e.target.result.createObjectStore(name, { keyPath: 'id', autoIncrement: true })
    })
    this.upgradeQueries = []
  }

  /**
   * Shortcut to trigger an upgrade.
   */
  async triggerUpgrade () {
    await this.open(this.db.version + 1)
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
   * @returns {Array} something
   */
  async list (storeName) {
    return new Promise((resolve, reject) => {
      const list = []
      this.query(storeName, 'readonly', (tx, store) => {
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
        if (!cursor || !cursor.request.result) {
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
