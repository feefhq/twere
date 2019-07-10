import { Application } from '../Application.js'
import { Transaction } from './Transaction.js'

export class DB {
  constructor (name) {
    this.name = name
    this.database = null
    return this
  }

  static new (name) {
    return new DB(name)
  }

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
      request.onupgradeneeded = () => {
        // resolve(this)
      }
    })
  }

  async deleteDatabase () {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.deleteDatabase(this.name)
      request.onsuccess = () => resolve(this)
      request.onerror = () => reject(request)
    })
  }

  onupgradeneeded (event) {
    console.log('Upgrade!', event)
  }

  createObjectStore (name) {
    this.database.createObjectStore(name)
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

  static async query (mode, request, mutator) {
    this.database = this.database || await this.open()
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

  static async list (criteria) {
    const list = []
    return this.query('readonly', (transaction, store) => {
      return this.openCursor(store)
        .then((cursor) => {
          this.forEach(cursor, (result) => {
            list.push(result)
          })
          return list
        })
    })
  }

  static openCursor (store) {
    return new Promise((resolve, reject) => {
      const cursor = store.openCursor()
      cursor.onsuccess = () => {
        if (cursor.result) cursor.result.request = cursor
        resolve(cursor.result)
      }
    })
  }

  static continue (cursor) {
    return new Promise((resolve, reject) => {
      cursor.request.onsuccess = () => resolve(cursor.result)
      cursor.request.onerror = () => reject(cursor.error)
      cursor.continue()
    })
  }

  static forEach (cursor, callback) {
    return new Promise((resolve, reject) => {
      const iterate = () => {
        if (!cursor.request.result) return
        callback(cursor.request.result.value)
        this.continue(cursor).then(iterate, reject)
      }
      iterate()
    })
  }
}
