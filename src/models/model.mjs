import Application from '../application';

/**
 * Model object
 */
export default class Model {
  constructor() {
    return this;
  }

  /**
   * Creates a store for this model based on the name. Probably needs a better
   * name to avoid confusion with native function name.
   */
  static createObjectStore() {
    Application.db.createObjectStore(this.name);
  }

  /**
   *
   */
  static new() {
    return new Promise(() => {
      const tx = Application.db.transaction(this.name, 'readwrite');
      const store = tx.objectStore(this.name);
      const item = {
        name: 'sample',
      };
      store.add(item);
      return tx.complete;
    }).then(() => {
    });
  }
}
