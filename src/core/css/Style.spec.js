import { Style } from './Style.js'

/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

describe('Style', () => {
  describe('constructor()', () => {
    it('should have a css property', () => {
      const style = new Style()
      expect(style.css).to.be.an.instanceof(CSSStyleSheet)
    })
  })
})
