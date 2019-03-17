/**
 * A Note model.
 */
import Model from './../core/Model';

export default class Note extends Model {
  /**
   * Not much needs to be done here, other than defining properties. Anything
   * defined here will be magically turned into data properties in the DB.
   * Setters and getters are implied — that's the beauty of using native
   * properties, rather than building some convoluted `field` mechanism.
   */
  constructor() {
    super();
    this.createdAt = Date.now();
    this.content = '';
  }
}
