import Note from './models/Note';

export default class Controller {
  constructor(db) {
    this._db = db;
    return this;
  }

  list() {
    Note.getAll(this._db);
  }
}
