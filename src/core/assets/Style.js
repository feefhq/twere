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
   * Infer the probable path of the asset based on the given context.
   * Really basic at the moment.
   */
  inferPath () {
    return `/css/components/${this.context.replace('Component', '')}.component.css`
  }

  /**
   * Load CSS from a file and insert it into the link element
   */
  async fetch () {
    const response = await Asset.fetch(this.inferPath())
    this.link.innerText = await response.text()
  }
}
