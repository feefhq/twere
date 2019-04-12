/**
 *
 */
export class Router {
  /**
   * Add a route to the application. Is chainable, hooray!
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
  static push (path, method, target) {
    console.log(`Pushing new state: ${path} ${method.toUpperCase()}`)
    let params = {}
    if (target instanceof window.HTMLFormElement) {
      params = new window.FormData(target)
    }

    const route = this.matchPath(path)
    if (route) {
      const finalRoute = route.find(m => m.method.name === method.toLowerCase())
      finalRoute.push(params)
      window.history.pushState({}, 'Updated!', path)
    }
  }

  /**
   * Find the first match of the path request. This searches route strings
   * in order of length, so that it can be greedy.
   */
  static matchPath (path) {
    const url = new URL(path, window.location.origin)

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
   * Initiates the router, registering it's events. Is idempotent to help
   * with composition.
   */
  static init () {
    if (!this.touched) {
      document.addEventListener('click', event => this.interceptClickEvents(event))
    }
    this.touched = true
  }

  /**
   * Register a form by giving it a unique ID and adding it to a map so that it
   * can be easily found later on.
   */
  static registerForm (form) {
    if (this.handlers.has(form.getAttribute('data-uuid'))) return
    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    form.setAttribute('data-uuid', random)
    this.handlers.set(random, form)
    form.addEventListener('submit', event => this.interceptClickEvents(event))
  }

  /**
   * Adds an event listener which intercepts events for relative links.
   * Any event which is targeting an external resource will be allowed to just continue
   */
  static interceptClickEvents (event) {
    event.preventDefault()
    if (!event.target.getAttribute('href') &&
      !event.target.action &&
      !event.target.form) return

    const action = event.target.getAttribute('href') ||
      event.target.action ||
      event.target.form.action ||
      ''

    const method = event.target.getAttribute('data-method') ||
      event.target.method ||
      'GET'

    switch (event.target.tagName.toLowerCase()) {
      case 'a':
        this.push(action, method)
        break
      case 'form':
        this.push(action, method, event.target)
        break
      case 'button':
      case 'input':
        this.push(action, method, event.target.form)
        break
      default:
        return
    }

    event.preventDefault()
  }
}
