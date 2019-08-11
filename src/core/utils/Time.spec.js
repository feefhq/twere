/* eslint-disable no-undef */
import { Time } from './Time.js'

describe('Relative time', () => {
  describe('#relativeTime()', () => {
    let d1 = null
    let d2 = null

    beforeEach(() => {
      d1 = new Date()
      d2 = new Date()
    })
    it('should return "a few seconds ago"', () => {
      Time.relativeTime(new Date()).should.equal('a few seconds ago')
    })

    it('should return "a minute ago"', () => {
      d1.setTime(d1.getTime() - 45 * 1000)
      d2.setTime(d2.getTime() - 89 * 1000)
      Time.relativeTime(d1).should.equal('a minute ago')
      Time.relativeTime(d2).should.equal('a minute ago')
    })

    it('should return "2 minutes ago"', () => {
      d1.setTime(d1.getTime() - 90 * 1000)
      Time.relativeTime(d1).should.equal('2 minutes ago')
    })

    it('should return "44 minutes ago"', () => {
      d1.setTime(d1.getTime() - 44 * 60 * 1000)
      Time.relativeTime(d1).should.equal('44 minutes ago')
    })

    it('should return "an hour ago"', () => {
      d1.setTime(d1.getTime() - 45 * 60 * 1000)
      d2.setTime(d2.getTime() - 89 * 60 * 1000)
      Time.relativeTime(d1).should.equal('an hour ago')
      Time.relativeTime(d2).should.equal('an hour ago')
    })

    it('should return "2 hours ago"', () => {
      d1.setTime(d1.getTime() - 90 * 60 * 1000)
      Time.relativeTime(d1).should.equal('2 hours ago')
    })

    it('should return "21 hours ago"', () => {
      d1.setTime(d1.getTime() - 21 * 60 * 60 * 1000)
      Time.relativeTime(d1).should.equal('21 hours ago')
    })

    it('should return "a day ago"', () => {
      d1.setTime(d1.getTime() - 22 * 60 * 60 * 1000)
      d2.setTime(d2.getTime() - 35 * 60 * 60 * 1000)
      Time.relativeTime(d1).should.equal('a day ago')
      Time.relativeTime(d2).should.equal('a day ago')
    })

    it('should return "2 days ago"', () => {
      d1.setTime(d1.getTime() - 36 * 60 * 60 * 1000)
      Time.relativeTime(d1).should.equal('2 days ago')
    })

    it('should return "25 days ago"', () => {
      d1.setTime(d1.getTime() - 25 * 24 * 60 * 60 * 1000)
      Time.relativeTime(d1).should.equal('25 days ago')
    })

    it('should return "a month ago"', () => {
      d1.setTime(d1.getTime() - 26 * 24 * 60 * 60 * 1000)
      d2.setTime(d2.getTime() - 45 * 24 * 60 * 60 * 1000)
      Time.relativeTime(d1).should.equal('a month ago')
      Time.relativeTime(d2).should.equal('a month ago')
    })

    it('should return "2 months ago"', () => {
      d1.setTime(d1.getTime() - 46 * 24 * 60 * 60 * 1000)
      Time.relativeTime(d1).should.equal('2 months ago')
    })

    it('should return "12 months ago"', () => {
      d1.setTime(d1.getTime() - 344 * 24 * 60 * 60 * 1000)
      Time.relativeTime(d1).should.equal('12 months ago')
    })

    it('should return "a year ago"', () => {
      d1.setTime(d1.getTime() - 345 * 24 * 60 * 60 * 1000)
      d2.setTime(d2.getTime() - 547 * 24 * 60 * 60 * 1000)
      Time.relativeTime(d1).should.equal('a year ago')
      Time.relativeTime(d2).should.equal('a year ago')
    })

    it('should return "2 years ago"', () => {
      d1.setTime(d1.getTime() - 548 * 24 * 60 * 60 * 1000)
      Time.relativeTime(d1).should.equal('2 years ago')
    })
  })
})
