/* eslint-disable no-undef */
import { Style } from './Style.js'

describe('Style', () => {
  let style = null
  const responseText = `a {}
    b {}`

  beforeEach(() => {
    style = new Style('TestComponent')

    const mockResponse = new Response(responseText, {
      status: 200,
      headers: { 'Content-type': 'text/css' }
    })

    sinon
      .stub(window, 'fetch')
      .callThrough()
      .withArgs('/css/components/Test.component.css')
      .callsFake(() => Promise.resolve(mockResponse))
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('constructor()', () => {
    it('should have a style element', () => {
      expect(style.link).to.be.an.instanceof(HTMLStyleElement)
    })
    it('should have a context', () => {
      expect(style.context).to.equal('TestComponent')
    })
  })

  describe('.inferPaths()', () => {
    it('should return paths', () => {
      expect(Style.inferPaths('Test')).to.be.instanceOf(Array)
    })
  })

  describe('#inferPath()', () => {
    it('should return an array if inferred paths', () => {
      expect(style.inferPaths()).to.be.instanceOf(Array)
    })
  })

  describe('#fetch()', () => {
    it('should insert CSS', async () => {
      style = new Style('TestComponent')
      await style.fetch()
      expect(style.link.textContent).to.equal(responseText)
      expect(style.link.innerText).to.equal(responseText)
      expect(style.link.innerHTML).to.equal(responseText)
    })
  })
})
