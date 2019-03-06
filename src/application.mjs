/**
 * The main Application class. This is designed to be a singleton with only
 * static methods, so that it can maintain state, and be easily injected
 * anywhere.
 */
export default class Application {
  /**
   *
   */
  constructor(db) {
    this._models = [];
    this._controllers = [];
    this._views = [];
    this._db = db;
    return this;
  }

  /**
   * Fire up the application. A connection to the DB will do any data store
   * upgrades.
   */
  static start() {
    this._db.open().then(() => {
      this._controllers.new();
    });
  }

  /**
   *
   */
  static get models() {
    return this._models;
  }

  /**
   *
   */
  static set models(models) {
    this._models = models;
    this._db.open().then();
  }

  /**
   *
   */
  static get controllers() {
    return this._controllers;
  }

  /**
   *
   */
  static set controllers(controllers) {
    this._controllers = controllers;
  }

  /**
   *
   */
  static get views() {
    return this._views;
  }

  /**
   *
   */
  static set views(views) {
    this._views = views;
  }

  /**
   *
   */
  static get db() {
    return this._db;
  }

  /**
   *
   */
  static set db(db) {
    this._db = db;
  }
}
