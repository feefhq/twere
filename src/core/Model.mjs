/**
 * The M in MVC
 */
import { Base } from './Base.mjs'
import { Application } from './Application.mjs'
import { EventMixin } from './mixins/EventMixin.mjs'

export class Model extends EventMixin(Base) {
  /**
   * Creates a store for this model based on the name. Probably needs a better
   * name to avoid confusion with native function name. This looks as though it
   * is extra cruft at the moment, but we will want to define indexes at a later
   * stage.
   */
  static createObjectStore () {
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
  delete (id) {
    Application.db.delete(this.constructor.name, id)
    // this.constructor.trigger('dirty', this)
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
    return Object.assign({}, this)
  }
}
