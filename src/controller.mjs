import Note from './models/Note';

export default class Controller {
  constructor(db) {
    this._db = db;
    return this;
  }

  static list() {
    Note.getAll();
  }

  static new() {
    Note.new();
  }
}
