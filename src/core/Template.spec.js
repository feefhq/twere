/* eslint-disable no-undef */
import { Template } from './Template.mjs'

describe('Template', () => {
  let template
  beforeEach(() => {
    template = new Template()
  })
  describe('#constructor()', () => {
    it('should be properly formed', () => {
      template.should.be.instanceOf(Template)
      template.should.haveOwnProperty('placeholders')
      template.should.haveOwnProperty('element')
    })
  })

  describe('#content', () => {
    it('should return a DocumentFragment', () => {
      template.content.should.be.instanceOf(DocumentFragment)
    })
  })

  describe('#orderParts()', () => {
    it('should return order array', () => {
      const strings = ['test', 'aft']
      const expressions = [1 + 1]
      const ordered = template.orderParts(strings, expressions)
      ordered.should.be.instanceOf(Array)
      ordered.should.have.members(['test', 2, 'aft'])
    })
  })

  describe('#dom``', () => {
    it('should return a DocumentFragement', () => {
      const dom = template.dom``
      dom.should.be.instanceOf(DocumentFragment)
    })
    it('should return simple string content', () => {
      const dom = template.dom`test`
      dom.children.should.be.instanceOf(HTMLCollection)
      dom.children.length.should.equal(0)
    })
  })

  describe('#Template.dom``', () => {
    it('should return a DocumentFragement', () => {
      const dom = Template.dom``
      dom.should.be.instanceOf(DocumentFragment)
    })
    it('should return simple string content', () => {
      const dom = Template.dom`test`
      dom.should.be.instanceOf(DocumentFragment)
      dom.children.should.be.instanceOf(HTMLCollection)
      dom.children.length.should.equal(0)
    })

    it('should return simple string and expression', () => {
      const dom = Template.dom`<span>test ${1 + 1}</span>`
      dom.children[0].innerHTML.should.equal('test 2')
    })

    it('should return nodes', () => {
      const node = document.createElement('div')
      const dom = Template.dom`${node}`
      dom.children[0].should.be.instanceOf(HTMLDivElement)
    })

    it('should return arrays', () => {
      const dom = Template.dom`<span>arf${[1 + 1, 3]}</span>`
      dom.children[0].innerHTML.should.equal('arf23')
    })

    it('should return complex arrays', () => {
      const dom = Template.dom`<span>arf${[1 + 1, [1, 2, 3]]}</span>`
      dom.children[0].innerHTML.should.equal('arf2123')
    })
  })
})
