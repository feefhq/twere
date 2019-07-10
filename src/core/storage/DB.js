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
  async open (version) {
    return new Promise((resolve, reject) => {
      this.close() // Don't like this; must be a better way
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

  close () {
    !this.database || this.database.close()
  }

  /**
   * Delete the database. Will only happen once all connections to the DB have been
   * closed, which should be handled by the DB's `onversionchange` event handler.
   */
  async deleteDatabase () {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.deleteDatabase(this.name)
      request.onsuccess = () => resolve(this)
      request.onblocked = (e) => {
        console.log('Blocked')
      }
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

  /**
   * Shortcut to trigger an upgrade.
   */
  async triggerUpgrade () {
    await this.open(this.database.version + 1)
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
      return new Transaction(this.database, name)
    } catch (error) {
      throw new Error(`Oops ${error}`)
    }
  }

  /**
   * Wrapperr for simple queries. Likely to be replaced with a Transaction interface.
   * @param {*} request the DB request
   * @param {*} mutator optionally mutate the results
   */
  async promiseForRequest (request, mutator = result => result) {
    return new Promise((resolve, reject) => {
      request.onsuccess = event => {
        resolve(request.result)
      }
      request.onerror = event => reject(request)
    })
  }

  /**
   * Execute a DB query. Will almost certainly be coupled with Transaction interface.
   * @param {*} mode
   * @param {*} request
   * @param {*} mutator
   */
  async query (storeName, mode, request, mutator) {
    await this.open()
    const transaction = this.database.transaction(storeName, mode)
    const store = transaction.objectStore(storeName)
    return request(transaction, store)
  }

  async get (storeName, key) {
    return this.query(storeName, 'readonly', (transaction, store) => {
      return this.promiseForRequest(store.get(key))
    })
  }

  async set (storeName, value, key) {
    return this.query(storeName, 'readwrite', (transaction, store) => {
      return this.promiseForRequest(store.put(value))
    })
  }

  async delete (storeName, key) {
    return this.query(storeName, 'readwrite', (transaction, store) => {
      return this.promiseForRequest(store.delete(Number(key)))
    })
  }

  async list (storeName, criteria) {
    return new Promise((resolve, reject) => {
      const list = []
      this.query(storeName, 'readonly', (transaction, store) => {
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
