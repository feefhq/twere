import Application from './application';

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
    this._name = name;
    this._db = null;
    return this;
  }

  /**
   * Get the current database version
   */
  get version() {
    return this._db.version;
  }

  /**
   * Wraps a promise around the standard indexedDB API, and return `this` for
   * ability to chain.
   */
  open() {
    return new Promise((resolve) => {
      const request = indexedDB.open(this._name, 1);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onupgradeneeded = () => this.onupgradeneeded(request.result);
      request.onerror = () => {};
    })
      .then((result) => {
        this._db = result;
        return this;
      });
  }

  /**
   *
   */
  onupgradeneeded(db) {
    this._db = db;
    const filtered = Application.models.filter(model => !db.objectStoreNames.contains(model.name));
    filtered.forEach((model) => {
      model.createObjectStore();
    });
  }

  /**
   * Create an object store. Dubious about this needing to be async
   */
  createObjectStore(name) {
    return new Promise((resolve) => {
      const request = this._db.createObjectStore(name);
      request.onsuccess = () => {
        resolve(request);
      };
    }).then(() => this);
  }
}
