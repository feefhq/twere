/**
 * The M in MVC
 */
import { Base } from './Base.js'
import { Application } from './Application.js'
import { EventMixin } from './mixins/EventMixin.js'

export class Model extends EventMixin(Base) {
  constructor (params = {}) {
    super()
    this.data = params
  }

  get (params) {
    console.log('GET', params)
  }

  delete (params) {
    console.log('DELETE', ...params)
    params.forEach((value, key) => { this[key] = value })
    this.remove(this.id)
  }

  post (params) {
    console.log('POST', ...params)
    params.forEach((value, key) => { this[key] = value })
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
  static createObjectStore () {
    console.debug('Creating model object store:', this.name)
    Application.db.createObjectStore(this.name)
  }

  /**
   * Save the entity. The DB activity probably needs to be factored out.
   * Needs lots of error handling to be added.
   */
  save () {
    Application.db.save(this.constructor.name, this.getData())
    this.constructor.trigger('dirty', this)
  }

  remove (id) {
    Application.db.delete(this.constructor.name, id)
    this.constructor.trigger('dirty', this)
  }

  /**
   * Currently obsolete. Will get all entities.
   */
  static list (count = 1000, order = 'desc') {
    return Application.db.list(this.prototype.constructor.name, count, order)
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
