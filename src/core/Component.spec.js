/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import { Component } from './Component.js'
import { Application } from './Application.js'
import { Template } from './Template.js'

describe('Component', () => {
  let component

  before(() => {
    Application.components = [Component]
  })

  describe('#html', () => {
    it('should return a string', () => {
      expect(new Component().html).to.be.a('String')
    })

    it('should return a DocumentFragment', () => {
      const component = new Component()
      component.html = Template.dom``
      expect(component.html).to.be.instanceOf(DocumentFragment)
    })
  })

  describe('#connectcallback', () => {
    beforeEach(() => {
      component = new Component()
    })

    it('should do a paint', async () => {
      expect(component.innerHTML).to.equal('')
      component.html = 'test'
      component.connectedCallback()
      expect(component.innerHTML).to.equal('test')
    })
  })

  describe('#paint()', () => {
    beforeEach(() => {
      component = new Component()
    })

    it('should create tree', () => {
      expect(component.firstChild).to.be.null
      component.paint('test')
      expect(component.firstChild).to.be.instanceOf(Node)
    })

    it('should recreate tree', () => {
      expect(component.innerHTML).to.equal('')
      component.paint('test')
      expect(component.innerHTML).to.equal('test')
      component.paint('test2')
      expect(component.innerHTML).to.equal('test2')
    })
  })
})
