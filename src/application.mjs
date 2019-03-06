/**
 * The main Application class. This is designed to be a singleton with only
 * static methods, so that it can maintain state, and be easily injected
 * anywhere.
 */
export default class Application {
  /**
   *
   */
  constructor() {
    this.models = [];
    this.controllers = [];
    this.views = [];
    this.db = null;
    return this;
  }

  /**
   * Fire up the application. A connection to the DB will do any data store
   * upgrades.
   */
  static start() {
    this.db.open().then(() => {
      this.controllers.new();
    });
  }
}
