/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import { Component } from './Component.js'
import { Template } from './Template.js'

describe('.define()', () => {
  it('should define default custom element', async () => {
    class ExtComponent extends Component {}
    await ExtComponent.define()
    expect(new ExtComponent()).to.be.an.instanceof(ExtComponent)
    expect(window.customElements.get('default-ext-component').name).to.equal(
      'ExtComponent'
    )
    expect(ExtComponent.css).to.be.true
  })

  it('should define named custom element', async () => {
    class ExtComponent extends Component {}
    await ExtComponent.define('ext')
    expect(new ExtComponent()).to.be.an.instanceof(ExtComponent)
    expect(window.customElements.get('ext-ext-component').name).to.equal(
      'ExtComponent'
    )
  })

  it('should allow CSS override', () => {
    class Ext2Component extends Component {
      static get css () {
        return false
      }
    }
    Ext2Component.define('ext2')
    expect(Ext2Component).to.have.property('css')
    expect(Ext2Component.css).to.be.false
  })
})

describe('Component', () => {
  let component

  before(async () => {
    await Component.define()
    component = new Component()
  })

  describe('constructor', () => {
    it('should have state', () => {
      expect(new Component()).to.have.property('_')
    })
  })

  describe('#html', () => {
    it('should return a string', () => {
      expect(new Component().html).to.be.a('String')
    })

    it('should return a DocumentFragment', () => {
      const component = new Component()
      component.html = Template.html``
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

  describe.skip('#inferPath()', () => {
    it('should return absolute path', () => {
      expect(component.inferPath()).to.equal(
        'http://localhost:9999/base/src/core'
      )
    })
  })

  describe.skip('#inferName()', () => {
    it('should return absolute path', () => {
      expect(component.inferName()).to.equal('Component')
    })
  })

  describe.skip('#getInferredCSS()', () => {
    it('should return CSS', () => {
      expect(component.getInferredCSS()).to.equal(
        'http://localhost:9999/base/src/core/Component.css'
      )
    })
  })
})
