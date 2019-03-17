/**
 *
 */
import Model from './../core/Model';

export default class Note extends Model {
  constructor() {
    super();
    this.createdAt = Date.now();
    this.content = '';
  }
}
