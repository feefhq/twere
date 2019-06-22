import { Application } from '../Application.js'

export class Database2 {
  static get name () {
    return Application.name
  }

  static async promise () {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.name, 1)
      request.onsuccess = () => {
        const database = request.result
        database.onclose = () => {}
        database.onversionchange = () => {}
        resolve(database)
      }
      request.onerror = () => reject(request.error)
      request.onupgradeneeded = () => {}
    })
  }

  static async promiseForRequest (request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const result = request.result
        resolve(result)
      }
      request.onerror = () => reject(request.error)
    })
  }

  static async query (mode, request) {
    this.database = this.database || await this.promise()
    const transaction = this.database.transaction('Note', mode)
    const store = transaction.objectStore('Note')
    return this.promiseForRequest(request(transaction, store))
  }

  static async get (key) {
    return this.query('readonly', (transaction, store) => {
      return store.get(key)
    })
  }

  static async set (value) {
    return this.query('readwrite', (transaction, store) => {
      return store.put(value)
    })
  }

  static async delete (key) {
    return this.query('readwrite', (transaction, store) => {
      return store.delete(Number(key))
    })
  }

  static async list (criteria) {
  }
}
