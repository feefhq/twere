import Application from './application';

/**
 * Model object
 */
export default class Model {
  constructor() {
    return this;
  }

  /**
   * Creates a store for this model based on the name
   */
  static createObjectStore() {
    Application.db.createObjectStore(this.name);
  }
}
