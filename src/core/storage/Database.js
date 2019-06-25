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

  static async promiseForRequest (request, mutator = (result) => result) {
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(request.result)
      }
    })
  }

  static async query (mode, request, mutator) {
    this.database = this.database || await this.promise()
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
        if (!cursor.request.result) {
          resolve()
          return
        }
        callback(cursor.request.result.value)
        this.continue(cursor).then(iterate, reject)
      }
      iterate()
    })
  }
}
