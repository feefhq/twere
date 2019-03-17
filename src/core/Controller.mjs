import Note from './../models/Note';

export default class Controller {
  constructor(db) {
    this._db = db;
    return this;
  }

  /**
   *
   */
  static list() {
    Note.getAll();
  }

  /**
   *
   */
  static new() {
    const note = new Note();
    note.content = 'Something different';
    note.save();
  }
}
