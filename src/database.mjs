/**
 * A simple way to access a database and it's data stores. This is currently an
 * experiment in being able to wrap Promises and async/await around the standard
 * indexedDB implementation, which only uses callbacks.
 */
export default class Database {

  /**
   * Sets the name of the DB, and returns the instance.
   */
  constructor(name) {
    this._models = [];
    this.name = name;
    this.db;
    return this;
  }

  /**
   * Set the models for the app. This will then automagically create data stores
   * if they don't already exist.
   */
  set models(models) {
    this._models = models;
    this.open()
      .then(() => { return this.checkModels(models) })
      .then((exist) => { exist || console.log(exist) });
  }

  /**
   * Check whether all objects in the models array have a store in the database
   */
  checkModels(models) {
    return models.every(e => this.db.objectStoreNames.contains(e));
  }

  /**
   * Wraps a promise around the standard indexedDB API, and return `this` for
   * ability to chain.
   */
  open() {
    return new Promise((resolve, reject) => {
      let request = indexedDB.open(this.name, 1);
      request.onsuccess = () => {
        resolve(request);
      };
    })
    .then((result) => {
      this.db = result.result;
      return this;
    });
  }

  /**
   * Create an object store
   */
  async createObjectStore(name) {
    return await new Promise((resolve, reject) => {
      console.log("Creating store...", this.db);
      let request = this.db.createObjectStore(name);
      request.onsuccess = () => {
        resolve(request);
      };
    }).then((result) => {
      return this;
    });
  }

}
