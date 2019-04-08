export class Router {
  /**
   * @description Add a route to the application. Is chainable, hooray!
   * Sorts longest to shortest each time, to save energy later on.
   */
  static add (route, ...objs) {
    if (!route) return
    console.log(`Registering route: ${route}`)
    this.init()
    this.handlers = new Map()
    this.routes = this.routes || new Map()
    this.routes.set(route, objs)
    return this
  }

  /**
   * Get a sorted array of route strings. This is useful for finding matches in an
   * ordered fashion
   */
  static getSortedRouteArray () {
    const keys = [...this.routes.keys()]
    return keys.sort((a, b) => b.length - a.length)
  }

  /**
   * Push the next HTTP state
   */
  static push (path, method) {
    console.log(`Pushing new state: ${path} ${method.toUpperCase()}`)
    const route = this.matchPath(path)
    if (route) {
      const finalRoute = route.find(m => m.method.name === method.toLowerCase())
      finalRoute.push()
      window.history.pushState({}, 'Updated!', path)
    }
  }

  /**
   * @description Find the first match of the path request. This searches route strings
   * in order of length, so that it can be greedy.
   */
  static matchPath (path) {
    const url = new URL(path)

    const match = this.getSortedRouteArray().find(route => {
      const match = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-_]+)'))
      return url.pathname.match(match)
    })
    if (match) {
      return this.routes.get(match)
    } else {
      throw new Error(`No match for path: ${path}`)
    }
  }

  /**
   * @description Initiates the router, registering it's events. Is idempotent to help
   * with composition.
   */
  static init () {
    if (!this.touched) {
      document.addEventListener('click', event => this.interceptClickEvents(event))
    }
    this.touched = true
  }

  /**
   * @description
   * @static
   * @param {HTMLElement} form
   * @memberof Router
   */
  static registerForm (form) {
    if (this.handlers.has(form.getAttribute('data-uuid'))) return
    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    form.setAttribute('data-uuid', random)
    this.handlers.set(random, form)
    form.addEventListener('submit', event => this.interceptClickEvents(event))
  }

  /**
   * @description Adds an event listener which intercepts events for relative links.
   * Any event which is targeting an external resource will be allowed to just continue
   */
  static interceptClickEvents (event) {
    if (!event.target.getAttribute('href') &&
      !event.target.action) return

    const action = event.target.getAttribute('href') ||
      event.target.action ||
      ''

    switch (event.target.tagName.toLowerCase()) {
      case 'a':
        this.push(action, event.target.getAttribute('method'))
        break
      case 'form':
        this.push(action, event.target.method, event.target)
        break
      case 'button':
      case 'input':
        this.push(action, event.target.form.method, event.target.form)
        break
      default:
        return
    }

    event.preventDefault()
  }

}
