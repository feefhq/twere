/**
 * Provide common event listeneres. Includes static and instance functions. At
 * the moment, all of the member functions get routed to static functions. This
 * needs a review, as it may have adverse effects.
 */
export const EventMixin = superclass => class extends superclass {
  /**
   * Add an event listener
   * @param {string} eventName
   * @param {function} handler
   */
  static on (eventName, handler) {
    this.handlers = this.handlers || {}
    this.handlers[eventName] = this.handlers[eventName] || []
    this.handlers[eventName].push(handler)
  }

  /**
   * Add an event listener
   * @param {string} eventName
   * @param {function} handler
   */
  on (eventName, handler) {
    this.constructor.on(eventName, handler)
  }

  /**
   * Remove an event listener
   * @param {string} eventName
   * @param {function} handler
   */
  static off (eventName, handler) {
    if (!this.handlers || this.handlers[eventName]) return
    for (let i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i] === handler) {
        this.handlers.splice(i--, 1)
      }
    }
  }

  /**
   * Remove an event listener
   * @param {string} eventName
   * @param {function} handler
   */
  off (eventName, handler) {
    this.constructor.off(eventName, handler)
  }

  /**
   * Trigger an event, and propagate to relevant event handlers
   * @param {string} eventName
   * @param {*} args
   */
  static trigger (eventName, ...args) {
    if (!this.handlers || !this.handlers[eventName]) return
    this.handlers[eventName].forEach(handler => handler.apply(this, args))
  }

  /**
   * Trigger an event, and propagate to relevant event handlers
   * @param {string} eventName
   * @param {*} args
   */
  trigger (eventName, ...args) {
    this.constructor.trigger(eventName, ...args)
  }
}
