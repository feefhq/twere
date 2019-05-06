/* eslint-disable no-undef */
import { Time } from './Time.js'

describe('Relative time', () => {
  it('should return relative time string', () => {
    Time.relativeTime(new Date()).should.equal('now')
  })
})
