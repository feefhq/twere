/* eslint-disable no-undef */
import { Template } from './Template.js'

describe('Template', () => {
  let temp
  beforeEach(() => {
    temp = new Template()
  })

  it('should have a template', () => {
    temp.root.should.be.instanceOf(HTMLTemplateElement)
  })

  describe('#deserialize()', () => {
    it('should return parts', () => {
      const [strings, expressions] = new Template().deserialize``
      strings.should.be.instanceOf(Array)
      expressions.should.be.instanceOf(Array)
    })
  })

  describe('#orderParts()', () => {
    it('should return order array', () => {
      const template = new Template()
      const [strings, expressions] = template.deserialize`test ${1 + 1} aft`
      const ordered = template.orderParts(strings, expressions)
      ordered.should.be.instanceOf(Array)
      ordered.should.have.members(['test ', 2, ' aft'])
    })
  })

  describe('#dom', () => {
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
  })
})
