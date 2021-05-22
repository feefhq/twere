/* eslint-env jest */

import { formatDate, formatTime } from './dateUtil'

describe('dateUtil', () => {
  describe('formatDate', () => {
    it('should format date', () => {
      const date = Date.now()
      const formattedDate = new Date(date).toDateString()
      expect(formatDate(date)).toBe(formattedDate)
    })
  })

  describe('formatTime', () => {
    it('should format date', () => {
      const date = Date.now()
      const formattedTime = new Date(date).toJSON().slice(11, 19)
      expect(formatTime(date)).toBe(formattedTime)
    })
  })
})
