/**
 * Templates are tightly coupled with Components, for rendering.
 */
export class Template {
  /**
   * @param {*} component
   */
  constructor (component) {
    this.component = component
    this._ = component._

  }

  /**
   * Paint the element into the DOM
   */
  paint () {

    const template = document.createElement('template')
    template.innerHTML = this.render()
    while (this.component.firstChild) {
      this.component.removeChild(this.component.firstChild)
    }
    this.component.appendChild(template.content)
    return this.component.outerHTML
  }
}
