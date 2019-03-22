/**
 * The main Application class. This is designed to be a singleton with only
 * static methods, so that it can maintain state, and be easily injected
 * anywhere.
 */
export default class Application {
  /**
   * Creates an instance of Application.
   */
  constructor () {
    this.models = []
    this.controllers = []
    this.controllerMap = new Map()
    this.views = []
    this.db = null
    this.node = null
  }

  /**
   * Controllers get passed in as object references, and this takes care of
   * doing instantiation. Everything is stored in a map, so that references can
   * be used at any time.
   *
   * Why not just instantiate and then pass in? It makes application config
   * really straightforward.
   */
  static set controllers (controllers) {
    this.controllerMap = new Map()
    controllers.forEach((controller) => {
      this.controllerMap.set(controller.name, Object.create(controller.prototype))
    })
  }

  /**
   * Fire up the application. A connection to the DB will do any data store
   * upgrades.
   */
  static start () {
    const node = document.createElement('div')
    node.setAttribute('id', `twere-${this.name}`)
    this.node = document.body.appendChild(node)

    this.db.open().then(() => {
      this.controllerMap.forEach((controller) => {
        controller.list()
      })
    })
  }
}
