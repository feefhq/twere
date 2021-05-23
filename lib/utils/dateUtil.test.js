/* eslint-env jest */

import { formatDate, formatTime } from './dateUtil'

describe('dateUtil', () => {
  const { dateLocale } = Intl.DateTimeFormat().resolvedOptions()

  describe('formatDate', () => {
    it('should format date', () => {
      const date = Date.now()
      const formattedDate = Intl.DateTimeFormat(dateLocale, {
        dateStyle: 'full'
      }).format()
      expect(formatDate(date)).toBe(formattedDate)
    })
  })

  describe('formatTime', () => {
    it('should format time based on current locale', () => {
      const date = Date.now()
      const formattedTime = Intl.DateTimeFormat(dateLocale, {
        hourCycle: 'h23',
        timeStyle: 'medium'
      }).format()
      expect(formatTime(date, dateLocale)).toBe(formattedTime)
    })
  })
})
