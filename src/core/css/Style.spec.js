import { Style } from './Style.js'

describe('Style', () => {
  let style = null
  let stub = null

  beforeEach(() => {
    style = new Style()

    const mockResponse = new Response('a {}', {
      status: 200,
      headers: { 'Content-type': 'text/css' }
    })

    stub = sinon
      .stub(style, 'fetch')
      .callThrough()
      .withArgs('/stub')
      .callsFake(() => {
        return new Promise((resolve, reject) => {
          resolve(mockResponse)
        })
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

  describe('#fetch()', () => {
    it('should return a promise', () => {
      expect(style.fetch('/stub')).to.be.an.instanceof(Promise)
    })

    it('should resolve a response', async () => {
      const response = await style.fetch('/stub')
      expect(response).to.be.an.instanceof(Response)
    })
  })
})
