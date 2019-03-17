/**
 *
 */
import Controller from './../core/Controller';
import Note from './../models/Note';

export default class MainController extends Controller {
  constructor() {
    this.super();
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
