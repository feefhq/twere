/* eslint-disable no-undef */
import { Style } from './Style.js'

describe('Style', () => {
  let style = null

  beforeEach(() => {
    style = new Style()

    const mockResponse = new Response('a {}', {
      status: 200,
      headers: { 'Content-type': 'text/css' }
    })

    sinon
      .stub(window, 'fetch')
      .callThrough()
      .withArgs('/stub')
      .callsFake(() => {
        return new Promise(resolve => resolve(mockResponse))
      })
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('constructor()', () => {
    it('should have a style element', () => {
      expect(style.link).to.be.an.instanceof(HTMLStyleElement)
    })
  })

  describe('#featchCSS()', () => {
    it('should get content', async () => {
      expect(await style.fetchCSS('/stub')).to.equal('a {}')
      expect(await style.fetchCSS()).to.equal('')
    })
  })

  describe('#loadCSS()', () => {
    it('should return empty string', async () => {
      await style.loadCSS()
      expect(style.link.innerText).to.equal('')
    })

    it('should return some CSS', async () => {
      await style.loadCSS('/stub')
      expect(style.link.innerText).to.equal('a {}')
    })
  })
})
