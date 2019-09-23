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
   * reflected one to one to the instance
   */
  constructor (obj = {}) {
    super()
    this.method = Function
    this.reflect(obj)
  }

  /**
   * Creates a new object, sets it's next expected method, then returns it.
   * @param {Function} f Expected to be a function from this class
   */
  static getMethodConstant (f = Function) {
    const obj = Object.create(this.prototype)
    obj.method = f
    return obj
  }

  /**
   * Static constant for a DELETE method
   * @return {Function}
   */
  static get DELETE () {
    return this.getMethodConstant(this.prototype.delete)
  }

  /**
   * Static constant for a GET method
   * @return {Function}
   */
  static get GET () {
    return this.getMethodConstant(this.prototype.get)
  }

  /**
   * Static constant for a POST method
   * @return {Function}
   */
  static get POST () {
    return this.getMethodConstant(this.prototype.post)
  }

  /**
   * Static constant for a PUT method
   * @return {Function}
   */
  static get PUT () {
    return this.getMethodConstant(this.prototype.put)
  }

  /**
   * Given an object, reflects the properties to this instance. Will only apply
   * properties which are writable.
   * @param {Object} obj a key/value object
   */
  reflect (obj = {}) {
    const props = new Map(Object.entries(obj))
    props.forEach((value, key) =>
      Object.defineProperty(this, key, { value, writable: true })
    )
  }

  /**
   * A cheap, but hacky way to call a predetermined function of an instance. This is very
   * unsafe and verbose, but does the job right now
   * @param {FormData} params data to pass to the proxied function
   */
  proxy (params) {
    this.method(params)
  }

  /**
   *
   * @param {FormData} params
   */
  delete (params) {
    params.forEach((value, key) => {
      this[key] = value
    })
    this.remove(this.id)
  }

  /**
   * Not implemented.
   * @param {FormData} params
   */
  get (params) {
    console.log('GET', params)
  }

  /**
   *
   * @param {FormData} params
   */
  post (params) {
    console.log('POST', ...params)
    params.forEach((value, key) => {
      this[key] = value
    })
    this.createdAt = new Date()
    this.save()
  }

  /**
   * Not implemented.
   * @param {FormData} params
   */
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
    delete dataObj.method // This is important, but need to document why
    return dataObj
  }

  /**
   * Returns the constructor name
   */
  static toString () {
    return this.name
  }
}
