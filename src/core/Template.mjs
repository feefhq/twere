export class Template extends window.HTMLElement {
  constructor (component) {
    super()
    this.component = component
    this._ = component._
    return this
  }

  static new (component) {
    const obj = Object.create(this.prototype)
    obj.component = component
    obj._ = component._
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
    while (this.component.firstChild) {
      this.component.removeChild(this.component.firstChild)
    }
    this.component.appendChild(template.content)
    return this.component
  }
}
