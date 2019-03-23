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
    return new Promise((resolve) => {
      const tx = Application.db.transaction(this.constructor.name, 'readwrite')
      tx.oncomplete = () => resolve(this)
      const store = tx.objectStore(this.constructor.name)
      store.add(this.getData())
      this.constructor.trigger('dirty', this);
    }).then(() => this)
  }

  /**
   * Currently obsolete. Will get all entities. Getters will want to be chainable.
   */
  static async list (count = 1000) {
    await Application.db.open()
    return new Promise((resolve) => {
      const tx = Application.db.transaction(this.prototype.constructor.name, 'readwrite')
      const store = tx.objectStore(this.prototype.constructor.name)
      const cursor = store.openCursor(null, 'prev')
      const result = []
      cursor.onsuccess = (e) => {
        const cursor = e.target.result
        if (cursor && result.length < count) {
          result.push(cursor.value)
          cursor.continue()
        } else {
          resolve(result)
        }
      }
    }).then(result => result.reverse())
  }

  /**
   * Gets all enumerable properties and packages them in a clean object
   */
  getData () {
    return Object.assign({}, this)
  }
}
