import { Asset } from './Asset.js'
import { Component } from '../Component.js'

/**
 * A module to encapsulate the loading and manipulation of CSS content for a component.
 */
export class Style {
  /**
   * @param {Component} context
   * @param {Document} doc
   */
  constructor (context, doc = document) {
    /** @type {Component} */
    this.context = context
    /** @type {Document} */
    this.doc = doc
    /** @type {HTMLLinkElement} */
    this.link = this.doc.createElement('style')
  }

  /**
   * Designed to be an abstract class member, so that in future pattern validity
   * can be measured, to reduce redundant requests.
   */
  static inferPaths (base) {
    return [
      `/css/components/${base}.component.css`,
      `/src/components/${base}.component.css`
    ]
  }

  /**
   * Infer the probable path of the asset based on the given context.
   * Really basic at the moment.
   */
  inferPaths () {
    const base = this.context.replace('Component', '')
    return Style.inferPaths(base)
  }

  /**
   * Load CSS from a file and return it's contents, usually used for isnertion.
   */
  async fetch () {
    const text = await this.cycle(this.inferPaths()).next()
    this.link.textContent = text.value
  }

  /**
   * Generator function for determination of successful path inferrance.
   * A generator is more memory-efficient than other forms of iteration.
   * @param {*} paths
   */
  async * cycle (paths = []) {
    for (const path of paths) {
      const response = await Asset.fetch(path)
      const type = response.headers.get('Content-type')
      if (response.ok && RegExp(/^text\/css/).test(type)) {
        const text = await response.text()
        yield text
      }
    }
  }
}
