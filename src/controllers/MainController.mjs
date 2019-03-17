/**
 * Main controller. Still just a proof-of-concept.
 */
import Controller from '../core/Controller';
import Note from '../models/Note';
import { main, listItem } from '../views/main';

export default class MainController extends Controller {
  /**
   * Doesn't do anything yet
   */
  static list() {
    Note.getAll();
  }

  /**
   * This is just a proof-of-concept
   */
  static new() {
    const note = new Note();
    note.content = 'Something different';
    note.save();
  }

  /**
   * This is a rudimentary attempt at creating a builder. It's trying to realise
   * a concept of component composition.
   */
  build() {
    const items = [
      listItem('Something foo'),
      listItem('Something bar'),
      listItem('Something baz')
    ];
    const container = main('Bar', items);
    this.template = container;
    this.render();
  }
}
