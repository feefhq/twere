export class Template extends window.HTMLElement {
  constructor (component) {
    super()
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
    const template = document.createElement('template')
    template.innerHTML = this.render()
    this.component.appendChild(template.content)
    return this.component
  }
}
