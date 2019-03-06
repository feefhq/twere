/**
 *
 */
export default class Application {

  /**
   *
   */
  constructor(db) {
    console.log("Something");
    this._models = [];
    this._controllers = [];
    this._views = [];
    this._db = db;
    return this;
  }

  /**
   *
   */
  get models() {
    return this._models;
  }

  /**
   *
   */
  set models(models) {
    this._models = models;
    this._db.models = this._models;
  }

  /**
   *
   */
  get controllers() {
    return this._controllers;
  }

  /**
   *
   */
  set controllers(controller) {
    this._controllers = controllers;
  }

  /**
   *
   */
  get views() {
    return this._views;
  }

  /**
   *
   */
  set views(views) {
    this._views = views;
  }

}
