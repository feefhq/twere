import { PrettyURL } from './PrettyURL.js'

describe('PrettyURL', () => {
  describe('#getParts()', () => {
    it('should get parts', () => {
      PrettyURL.parts('https://a.b').host.should.equal('a.b')
      PrettyURL.parts('https://a.b').protocol.should.equal('https:')
      PrettyURL.parts('https://a.b').pathname.should.equal('/')
      PrettyURL.parts('https://a.b/').pathname.should.equal('/')
      PrettyURL.parts('https://a.b#c').hash.should.equal('#c')
      PrettyURL.parts('https://a.b/#c').hash.should.equal('#c')
      PrettyURL.parts('https://a.b?d=0').search.should.equal('?d=0')
      PrettyURL.parts('https://a.b/?d=0').search.should.equal('?d=0')
      PrettyURL.parts('https://a.b/?d=0#c').search.should.equal('?d=0')
    })

    it('should throw', () => {
      expect(PrettyURL.parts).to.throw(TypeError)
    })
  })

  describe('#prettyProtocol()', () => {
    PrettyURL.protocol().should.equal('')
    PrettyURL.protocol('').should.equal('')
    PrettyURL.protocol('http:').should.equal("<i class='protocol'>http:</i>")
    PrettyURL.protocol('https:').should.equal("<i class='protocol'>https:</i>")
  })

  describe('#prettySearch()', () => {
    it('should get pretty search', () => {
      PrettyURL.search().should.equal('')
      PrettyURL.search('').should.equal('')
      PrettyURL.search('?n').should.equal("<i class='search'>?n</i>")
      PrettyURL.search('?n=0').should.equal("<i class='search'>?n=0</i>")
      PrettyURL.search('?n=0&k=1').should.equal(
        "<i class='search'>?n=0&k=1</i>"
      )
      PrettyURL.search('?n=0&k').should.equal("<i class='search'>?n=0&k</i>")
    })
  })

  describe('#prettyHash()', () => {
    it('should get pretty hash', () => {
      PrettyURL.hash().should.equal('')
      PrettyURL.hash('').should.equal('')
      PrettyURL.hash('#').should.equal('#')
      PrettyURL.hash('#a').should.equal('#a')
    })
  })

  describe('#prettyHost()', () => {
    it('should get pretty host', () => {
      PrettyURL.host().should.equal('')
      PrettyURL.host('').should.equal('')
      PrettyURL.host('http:').should.equal("<i class='host'>http:</i>")
      PrettyURL.host('https:').should.equal("<i class='host'>https:</i>")
    })
  })

  describe('#prettyPathname()', () => {
    it('should get pretty pathname', () => {
      PrettyURL.pathname().should.equal('')
      PrettyURL.pathname('').should.equal('')
      PrettyURL.pathname('/').should.equal('')
      PrettyURL.pathname('/a').should.equal("<i class='split'>/</i>a")
      PrettyURL.pathname('_').should.equal("<i class='delimiter'>_</i>")
      PrettyURL.pathname('-').should.equal("<i class='delimiter'>-</i>")
      PrettyURL.pathname('a').should.equal('a')
    })
  })

  describe('#prettyURL()', () => {
    it('should return vanilla string', () => {
      expect(PrettyURL.url()).to.equal('')
      expect(PrettyURL.url('invalid')).to.equal('invalid')
    })
    it('should return valid string', () => {
      expect(PrettyURL.url('https://a')).to.equal(
        "<i class='protocol'>https:</i><i class='host'>a</i>"
      )
    })
  })
})
