/**
 * The M in MVC
 */
import Application from './Application';

export default class Model {
  /**
   * Creates a store for this model based on the name. Probably needs a better
   * name to avoid confusion with native function name. This looks as though it
   * is extra cruft at the moment, but we will want to define indexes at a later
   * stage.
   */
  static createObjectStore() {
    Application.db.createObjectStore(this.name);
  }

  /**
   * Save the entity. The DB activity probably needs to be factored out.
   * Needs lots of error handling to be added.
   */
  save() {
    return new Promise((resolve) => {
      const tx = Application.db.transaction(this.constructor.name, 'readwrite');
      tx.oncomplete = () => resolve(this);
      const store = tx.objectStore(this.constructor.name);
      store.add(this.getData());
    }).then(() => this);
  }

  /**
   * Currently obsolete. Will get all entities. Getters will want to be chainable.
   */
  static getAll() {
    return new Promise((resolve) => {
      const tx = Application.db.transaction(this.prototype.constructor.name, 'readwrite');
      const store = tx.objectStore(this.prototype.constructor.name);
      const request = store.getAll();
      request.onsuccess = (res) => {
        resolve(request);
      };
    }).then((request) => {
      return request.result;
    });
  }

  /**
   * Gets all enumerable properties and packages them in a clean object
   */
  getData() {
    return Object.assign({}, this);
  }
}
