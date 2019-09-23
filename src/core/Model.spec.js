/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import { Model } from './Model.js'

describe('Model', () => {
  describe('', () => {
    it('should have a valid constructor', () => {
      const m = new Model()
      expect(m).to.be.an.instanceof(Model)
    })
  })
})
