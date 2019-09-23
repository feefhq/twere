import { Application } from './Application.js'
import { EventMixin } from './mixins/EventMixin.js'

/**
 * Base class to be extended to define models.
 */
export class Model extends EventMixin(Object) {
  /**
   * Create a new instance with optional object properties applied. Still some
   * work to be done here to make instantiation cleaner, more intuitive and
   * robust
   *
   * @param {Object} obj An optional object which will have it's properties
   * mapped one to one to the instance
   */
  constructor (obj = {}) {
    super()
    this.method = ''
    const props = new Map(Object.entries(obj))
    props.forEach((value, key) =>
      Reflect.defineProperty(this, key, { value, writable: true })
    )
  }

  static get GET () {
    const obj = Object.create(this.prototype)
    obj.method = obj.get
    return obj
  }

  static get DELETE () {
    const obj = Object.create(this.prototype)
    obj.method = obj.delete
    return obj
  }

  static get PUT () {
    const obj = Object.create(this.prototype)
    obj.method = obj.put
    return obj
  }

  static get POST () {
    const obj = Object.create(this.prototype)
    obj.method = obj.post
    return obj
  }

  get (params) {
    console.log('GET', params)
  }

  delete (params) {
    console.log('DELETE', ...params)
    params.forEach((value, key) => {
      this[key] = value
    })
    this.remove(this.id)
  }

  post (params) {
    console.log('POST', ...params)
    params.forEach((value, key) => {
      this[key] = value
    })
    this.createdAt = new Date()
    this.save()
  }

  put (params) {
    console.log('PUT', params)
  }

  /**
   * Creates a store for this model based on the name. Probably needs a better
   * name to avoid confusion with native function name. This looks as though it
   * is extra cruft at the moment, but we will want to define indexes at a later
   * stage.
   */
  static createObjectStore (db) {
    console.debug('Creating model object store:', this.name, db)
    Application.db.createObjectStore(this.name, db)
  }

  /**
   * Save the entity. The DB activity probably needs to be factored out.
   * Needs lots of error handling to be added.
   */
  save () {
    Application.db.set(this.constructor.name, this.getData())
    this.constructor.trigger('dirty', this)
  }

  remove (id) {
    Application.db.delete(this.constructor.name, id)
    this.constructor.trigger('dirty', this)
  }

  /**
   * Gets a list of entities. Needs more work.
   * @returns {Promise} Promise object represents an array of model objects
   */
  static list (count = 1000, order = 'desc') {
    return new Promise(resolve => {
      Application.db
        .list(this.prototype.constructor.name, count, order)
        .then(result => {
          const instances = result.map(obj => {
            return Reflect.construct(this.prototype.constructor, [obj])
          })
          resolve(instances)
        })
    })
  }

  /**
   * Gets all enumerable properties and packages them in a clean object
   */
  getData () {
    const dataObj = Object.assign({}, this)
    delete dataObj.method
    return dataObj
  }

  /**
   * Returns the constructor name
   */
  static toString () {
    return this.name
  }
}
