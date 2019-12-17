/**
 * The core Router. This is designed to be a static class which acts as a
 * constant source of truth. TODO: add tests and docs.
 */
export class Router {
  constructor () {
    this.routes = new Map()
    this.createListeners()
  }

  /**
   * Add a route to the application. Is chainable, hooray!
   */
  add (route = '', ...objs) {
    if (!route) return
    if (this.routes.get(route)) {
      throw new Error(`Route '${route}' is already defined`)
    }
    console.log(`Registering route: ${route}`)
    this.routes.set(route, objs)
    return this
  }

  /**
   * Register router events. Is intended to be idempotent.
   */
  createListeners () {
    ['click', 'submit'].forEach(t =>
      document.addEventListener(t, e => this.interceptRoutableEvents(e))
    )
  }

  /**
   * Get a sorted array of route strings. This is useful for finding matches in an
   * ordered fashion
   */
  getSortedRouteArray () {
    const keys = [...this.routes.keys()]
    return keys.sort((a, b) => b.length - a.length)
  }

  /**
   * Push the next HTTP state
   */
  push (path, method, target) {
    console.log(`Pushing new state: ${path} ${method.toUpperCase()}`)
    const route = this.matchPath(path)

    if (route) {
      const finalRoute = this.routes.get(route).find(m => {
        return m.method.name === method.toLowerCase()
      })
      const params = this.buildParams(target, path, route)
      finalRoute.proxy(params)
      window.history.pushState({}, 'Updated!', path)
    }
  }

  /**
   * Find the first match of the path request. This searches route strings
   * in order of length, so that it can be greedy.
   */
  matchPath (path) {
    const url = new URL(path, window.location.origin)
    const match = this.getSortedRouteArray().find(route => {
      const match = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-_]+)'))
      return url.pathname.match(match)
    })
    if (match) {
      return match
    } else {
      throw new Error(`No match for path: ${path}`)
    }
  }

  /**
   * Adds an event listener which intercepts events for relative links.
   * Any event which is targeting an external resource will be allowed to just continue
   */
  interceptRoutableEvents (event) {
    if (!this.isRoutableEvent(event) || !this.matchesOrigin(event)) return
    event.preventDefault()

    const action = this.inferAction(event)
    const method = this.inferMethod(event)
    const target = this.inferTarget(event)

    this.push(action, method, target)
  }

  /**
   * Checks whether the event target matches the current origin. Needs more work
   * to handle events other than href's
   * @param {Event} event The event being evaluated
   */
  matchesOrigin (event) {
    const url = new URL(
      event.target.getAttribute('href'),
      window.location.origin
    )
    return url.origin === window.location.origin
  }

  isRoutableEvent (event) {
    switch (event.type) {
      case 'click':
        return event.target.getAttribute('href')
      case 'submit':
        return event.target.action
    }
  }

  inferAction (event) {
    return (
      event.target.getAttribute('href') ||
      event.target.action ||
      (event.target.form && event.target.form.action)
    )
  }

  inferMethod (event) {
    return (
      event.target.getAttribute('data-method') || event.target.method || 'GET'
    )
  }

  inferTarget (event) {
    switch (event.target.tagName.toLowerCase()) {
      case 'a':
        return
      case 'form':
        return event.target
      case 'button':
      case 'input':
        return event.target.form
    }
  }

  buildParams (target, path, route) {
    const data = new window.FormData(target)
    this.extractParamsFromPath(path, route).forEach((value, key) =>
      data.append(key, value)
    )
    return data
  }

  extractParamsFromPath (path, route) {
    const params = new window.FormData()
    const url = new URL(path, window.location.origin)
    const routeUrl = new URL(route, window.location.origin)
    const urlParts = url.pathname.split('/')
    const routeParts = routeUrl.pathname.split('/')
    urlParts.forEach((part, index) => {
      const paramName = routeParts[index].slice(1)
      if (routeParts[index].indexOf(':') > -1) params.append(paramName, part)
    })

    return params
  }
}
