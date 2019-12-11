/* eslint-disable no-undef */
import { Application } from './Application.js'
import { DB } from './storage/DB.js'
import { Component } from './Component.js'

describe('Application', () => {
  it('should have default name', () => {
    Application.label.should.equal('default')
  })

  it('should allow change of name', () => {
    Application.setLabel('testname')
    Application.label.should.equal('testname')
  })

  it('should set a service worker', () => {})

  it('should return a DB instance', () => {
    Application.db.should.be.instanceOf(DB)
  })

  describe(':components', () => {
    it('should be an array', () => {
      expect(() => (Application.setComponents(''))).to.throw(Error)
    })
    it('should register component', () => {
      class ExtComponent extends Component {}
      Application.setComponents([ExtComponent])
      expect(window.customElements.get('testname-extcomponent').name).to.equal(
        'ExtComponent'
      )
    })
  })
})
