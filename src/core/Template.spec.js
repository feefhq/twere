/* eslint-disable no-undef */
import { Template } from './Template.js'

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

  describe('#html``', () => {
    it('should return a DocumentFragement', () => {
      const html = template.html``
      html.should.be.instanceOf(DocumentFragment)
    })
    it('should return simple string content', () => {
      const html = template.html`test`
      html.children.should.be.instanceOf(HTMLCollection)
      html.children.length.should.equal(0)
    })
  })

  describe('#Template.html``', () => {
    it('should return a DocumentFragement', () => {
      const html = Template.html``
      html.should.be.instanceOf(DocumentFragment)
    })
    it('should return simple string content', () => {
      const html = Template.html`test`
      html.should.be.instanceOf(DocumentFragment)
      html.children.should.be.instanceOf(HTMLCollection)
      html.children.length.should.equal(0)
    })

    it('should return simple string and expression', () => {
      const html = Template.html`<span>test ${1 + 1}</span>`
      html.children[0].innerHTML.should.equal('test 2')
    })

    it('should return nodes', () => {
      const node = document.createElement('div')
      const html = Template.html`${node}`
      html.children[0].should.be.instanceOf(HTMLDivElement)
    })

    it('should return arrays', () => {
      const html = Template.html`<span>arf${[1 + 1, 3]}</span>`
      html.children[0].innerHTML.should.equal('arf23')
    })

    it('should return complex arrays', () => {
      const html = Template.html`<span>arf${[1 + 1, [1, 2, 3]]}</span>`
      html.children[0].innerHTML.should.equal('arf2123')
    })
  })
})
