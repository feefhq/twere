export class Router {

  /**
   * @description Add a route to the application. Is chainable, hooray!
   * Sorts longest to shortest each time, to save energy later on.
   * @static
   * @param {*} route
   * @returns
   * @memberof Router
   */
  static add (route) {
    this.init()
    this.routes = this.routes || []
    this.routes.push(route)
    this.routes.sort((a, b) => b.length - a.length)
    return this
  }

  /**
   * @description Placeholder function for moving to links
   * @static
   * @param {*} path
   * @memberof Router
   */
  static go (path) {
    const match = this.routes.find(route => {
      const match = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-_]+)'))
      return path.match(match)
    })
    if (match) {
      window.history.pushState({}, 'Updated!', path)
    } else {
      throw new Error(`No match for path: ${path}`)
    }
  }

  /**
   * @description Initiates the router, registering it's events
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
    const href = event.target.getAttribute('href') || ''

    if (event.target.tagName.toLowerCase() !== 'a') return
    if (href.startsWith('http')) return

    event.preventDefault()

    this.go(href)
  }
}
