export class Template {

  constructor (component) {
    this.component = component
    this.data = component.data
    return this
  }

  /**
   * @description
   * @static
   * @returns
   * @memberof Template
   */
  static toString () {
    return 'This is a template'
  }
}
