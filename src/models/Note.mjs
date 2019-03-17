/**
 *
 */
import Model from './Model';

export default class Note extends Model {
  constructor() {
    super();
    this.createdAt = Date.now();
    this.content = '';
  }
}
