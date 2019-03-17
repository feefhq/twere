/**
 *
 */
export default class Controller {

  /**
   *
   */
  constructor() {
    this.template = '';
  }

  /**
   * Renders HTML by creating a `DocumentFragment` and then attaching it to the
   * document body. This will definitely change in the near future, as views
   * start to become a concept.
   */
  render() {
    const fragment = document.createDocumentFragment();
    fragment.textContent = this.template;
    document.body.appendChild(fragment);
  }
}
