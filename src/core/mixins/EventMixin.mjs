/**
 *
 * @param superclass
 */
export const EventMixin = superclass => class extends superclass {
  /**
   * @description Add an eventhandler
   * @static
   * @param {*} eventName
   * @param {*} handler
   */
  static on (eventName, handler) {
    this.handlers = this.handlers || {}
    this.handlers[eventName] = this.handlers[eventName] || []
    this.handlers[eventName].push(handler)
  }

  on (eventName, handler) {
    this.constructor.on(eventName, handler)
  }

  /**
   * @description
   * @static
   * @param {*} eventName
   * @param {*} handler
   */
  static off (eventName, handler) {
    if (!this.handlers || this.handlers[eventName]) return
    for (let i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i] === handler) {
        this.handlers.splice(i--, 1)
      }
    }
  }

  off (eventName, handler) {
    this.constructor.off(eventName, handler)
  }

  /**
   * @description
   * @static
   * @param {*} eventName
   * @param {*} args
   */
  static trigger (eventName, ...args) {
    if (!this.handlers || !this.handlers[eventName]) return
    this.handlers[eventName].forEach(handler => handler.apply(this, args))
  }

  trigger (eventName, ...args) {
    this.constructor.trigger(eventName, ...args)
  }
}
