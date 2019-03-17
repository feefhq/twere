/**
 * The C in MVC
 */
export default class Controller {

  /**
   * Simply sets up some defaults at the moment.
   */
  constructor() {
    this.template = '';
    this.fragment = null;
  }

  /**
   * Renders HTML by creating a `DocumentFragment` and then attaching it to the
   * document body. This will definitely change in the near future, as views
   * start to become a concept, and start to consider repainting, caching etc.
   */
  render() {
    if (this.fragment) this.fragment.remove();
    this.fragment = document.createDocumentFragment();
    const content = document.createElement('span');
    content.innerHTML = this.template;
    this.fragment.appendChild(content);
    this.fragment = document.body.appendChild(this.fragment);
  }
}
