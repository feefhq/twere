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
    it('should return a promise', async () => {
      expect(Asset.fetch('/stub')).to.be.instanceOf(Promise)
    })

    it('should fetch content', async () => {
      const asset = await Asset.fetch('/stub')
      expect(await asset.text()).to.equal('response text')
    })
  })
})
