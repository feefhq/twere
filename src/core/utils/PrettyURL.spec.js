import { PrettyURL } from './PrettyURL.js'

describe('PrettyURL', () => {
  describe('#getParts()', () => {
    it('should get parts', () => {
      PrettyURL.getParts('https://a.b').host.should.equal('a.b')
      PrettyURL.getParts('https://a.b').protocol.should.equal('https:')
      PrettyURL.getParts('https://a.b').pathname.should.equal('/')
      PrettyURL.getParts('https://a.b/').pathname.should.equal('/')
      PrettyURL.getParts('https://a.b#c').hash.should.equal('#c')
      PrettyURL.getParts('https://a.b/#c').hash.should.equal('#c')
      PrettyURL.getParts('https://a.b?d=0').search.should.equal('?d=0')
      PrettyURL.getParts('https://a.b/?d=0').search.should.equal('?d=0')
      PrettyURL.getParts('https://a.b/?d=0#c').search.should.equal('?d=0')
    })
  })

  describe('#prettySearch()', () => {
    it('should get pretty search', () => {
      PrettyURL.prettySearch('').should.equal('')
      PrettyURL.prettySearch('?n').should.equal("<i class='search'>?n</i>")
      PrettyURL.prettySearch('?n=0').should.equal("<i class='search'>?n=0</i>")
      PrettyURL.prettySearch('?n=0&k=1').should.equal(
        "<i class='search'>?n=0&k=1</i>"
      )
      PrettyURL.prettySearch('?n=0&k').should.equal(
        "<i class='search'>?n=0&k</i>"
      )
    })
  })

  describe('#prettyHash()', () => {
    it('should get pretty hash', () => {
      PrettyURL.prettyHash('').should.equal('')
      PrettyURL.prettyHash('#').should.equal('#')
      PrettyURL.prettyHash('#a').should.equal('#a')
    })
  })

  describe('#prettyHost()', () => {
    it('should get pretty host', () => {
      PrettyURL.prettyHost('').should.equal('')
      PrettyURL.prettyHost('http:').should.equal("<i class='host'>http:</i>")
      PrettyURL.prettyHost('https:').should.equal("<i class='host'>https:</i>")
    })
  })

  describe('#prettyPathname()', () => {
    it('should get pretty pathname', () => {
      PrettyURL.prettyPathname('').should.equal('')
      PrettyURL.prettyPathname('/').should.equal('')
      PrettyURL.prettyPathname('/a').should.equal("<i class='split'>/</i>a")
      PrettyURL.prettyPathname('_').should.equal("<i class='delimiter'>_</i>")
      PrettyURL.prettyPathname('-').should.equal("<i class='delimiter'>-</i>")
      PrettyURL.prettyPathname('a').should.equal('a')
    })
  })
})
