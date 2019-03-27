import { GET, POST, PUT, DELETE } from './mixins/Actions.mjs'


export class Router {

  /**
   * @description Add a route to the application. Is chainable, hooray!
   * Sorts longest to shortest each time, to save energy later on.
   * @static
   * @param {*} route
   * @returns
   * @memberof Router
   */
  static add (route = null, ...objs) {
    if (!route) return
    this.init()
    this.routes = this.routes || new Map()
    this.routes.set(route, objs)
    return this
  }

  /**
   *
   */
  static getSortedRouteArray () {
    return [...this.routes.keys()].sort((a, b) => b.length - a.length)
  }

  /**
   * @description Placeholder function for moving to links
   * @static
   * @param {*} path
   * @memberof Router
   */
  static push (path, method) {
    const route = this.matchPath(path)
    if (route) {
      const finalRoute = route.find(m => m.method.name === method.toLowerCase())
      finalRoute.push()
      window.history.pushState({}, 'Updated!', path)
    }
  }

  static matchPath (path) {
    const match = this.getSortedRouteArray().find(route => {
      const match = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-_]+)'))
      return path.match(match)
    })
    if (match) {
      return this.routes.get(match)
    } else {
      throw new Error(`No match for path: ${path}`)
    }
  }

  /**
   * @description Initiates the router, registering it's events. Immutable.
   * @static
   * @memberof Router
   */
  static init () {
    if (!this.touched) document.addEventListener('click', event => this.interceptClickEvents(event))
    this.touched = true
  }

  /**
   * @description Adds an event listener which intercepts events for relative links
   * @static
   * @param {*} event
   * @memberof Router
   */
  static interceptClickEvents (event) {
    event.preventDefault() // Testing
    const href = event.target.getAttribute('href') || ''
    if (href.startsWith('http')) return

    switch (event.target.tagName.toLowerCase()) {
      case 'a':
        this.push(href, event.target.getAttribute('method'))
        break
      case 'button':
      case 'input':
        this.push(event.target.form.action, event.target.form)
        break
      default:
        return
    }

    event.preventDefault()
  }
}
