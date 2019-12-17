/* eslint-disable no-undef */

import { Router } from './Router.js'

describe('Router', () => {
  describe('constructor()', () => {
    it('should have a map of routes', () => {
      expect(new Router()).to.haveOwnProperty('routes')
      expect(new Router().routes).to.be.instanceOf(Map)
    })
  })

  describe('#add()', () => {
    it('adds a single path', () => {
      const router = new Router()
      router.add('path', {})
      expect(router.routes.get('path')).to.eql([{}])
    })

    it('adds two paths', () => {
      const router = new Router()
      router.add('path1', 1)
      router.add('path2', 2)
      expect(router.routes.get('path1')).to.eql([1])
      expect(router.routes.get('path2')).to.eql([2])
    })

    it('should not allow two equally named paths', () => {
      const router = new Router()
      router.add('path1', 1)
      expect(() => (router.add('path1', 2))).to.throw(Error)
    })
  })

  describe('#getSortedRouteArray()', () => {})

  describe('#push()', () => {})

  describe('#matchPath()', () => {})

  describe('#interceptRoutableEvents()', () => {})

  describe('#matchesOrigin()', () => {})

  describe('#isRoutableEvent()', () => {})

  describe('#inferAction()', () => {})

  describe('#inferTarget()', () => {})

  describe('#buildParams()', () => {})

  describe('#extractParamsFromPath()', () => {})
})
