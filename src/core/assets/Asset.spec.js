import { Asset } from './Asset.js'

/* eslint-disable no-undef */

describe('Asset', () => {
  beforeEach(() => {
    const mockResponse = new Response('response text', {
      status: 200,
      headers: { 'Content-type': 'text/css' }
    })

    sinon
      .stub(window, 'fetch')
      .callThrough()
      .withArgs('/stub')
      .callsFake(() => Promise.resolve(mockResponse))
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('.fetch()', () => {
    it('should fetch content', async () => {
      const asset = await Asset.fetch('/stub')
      expect(await asset.text()).to.equal('response text')
    })

    it('should raise excpetion if no URL defined', () => {
      return Asset.fetch().catch((err) => {
        expect(err).to.have.property('message', 'No URL defined')
      })
    })
  })
})
