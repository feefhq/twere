/* eslint-disable no-undef */

import { ServiceWorker } from './ServiceWorker.js'

describe('ServiceWorker', () => {
  describe(':register()', () => {
    it('should return a promise', () => {
      expect(ServiceWorker.register('sw.js')).to.be.an.instanceof(Promise)
    })
  })
})
