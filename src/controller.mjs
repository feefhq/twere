import Note from './models/note.mjs';

export default class Controller {

  constructor(db) {
    this.db = db;
    return this;
  }

  list() {
    console.log("Listing notes");
    Note.getAll(this.db);
  }

}
