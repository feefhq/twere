export class Template {

  constructor (component) {
    this.component = component
    this.data = component.data
    return this
  }

  static new (component) {
    const obj = Object.create(this.prototype)
    obj.component = component
    obj.data = component.data
    return obj
  }

  /**
   * @description
   * @static
   * @returns
   * @memberof Template
   */
  toString () {
    return this.paint()
  }

  /**
   * @description Paint the element into the DOM
   * @memberof Component
   */
  paint () {
    const content = document.createElement('template')
    content.innerHTML = this.render()
    while (this.component.firstChild) this.component.removeChild(this.component.firstChild)
    this.component.appendChild(content.content);
    return this.component.innerHTML
  }

}
