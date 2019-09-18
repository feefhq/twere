/* eslint-disable no-undef */
import { Application } from './Application.js'
import { DB } from './storage/DB.js'

describe('Application', () => {
  it('should have default name', () => {
    Application.name.should.equal('default')
  })

  it('should allow change of name', () => {
    Application.name = 'testname'
    Application.name.should.equal('testname')
  })

  it('should set a service worker', () => {
  })

  it('should return a DB instance', () => {
    Application.db.should.be.instanceOf(DB)
  })
})
