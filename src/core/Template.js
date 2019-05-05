export class Template {
  constructor (component) {
    this.component = component
    this._ = component._
  }

  /**
   * Paint the element into the DOM
   */
  paint () {
    const template = document.createElement('template')
    // try {
      template.innerHTML = this.render()
    // } catch (error) {
    //   console.warn('There was a rendering problem')
    //   return ''
    // }
    while (this.component.firstChild) {
      this.component.removeChild(this.component.firstChild)
    }
    this.component.appendChild(template.content)
    return this.component.outerHTML
  }
}
