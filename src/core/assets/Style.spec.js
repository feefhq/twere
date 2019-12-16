/* eslint-disable no-undef */
import { Style } from './Style.js'

describe('Style', () => {
  let style = null

  beforeEach(() => {
    style = new Style('TestComponent')

    const mockResponse = new Response('a {}', {
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

  describe('#inferPath()', () => {
    it('should infer from a component name', () => {
      expect(style.inferPath()).to.equal('/css/components/Test.component.css')
    })
  })

  describe('#fetch()', () => {
    it('should insert CSS', async () => {
      await style.fetch()
      expect(style.link.innerText).to.equal('a {}')
    })
  })
})
