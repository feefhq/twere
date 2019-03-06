import  Model from '../model.mjs';

export default class Note extends Model {

  constructor(db) {
    super(db);
  }

  static getAll(db) {
    console.log("Getting all notes", this.name);
    db.createObjectStore(this.name);
  }

}
