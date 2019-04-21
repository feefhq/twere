/* eslint-disable no-undef */
import { Application } from './Application.js'

describe('Application', () => {
  it('should have default name', () => {
    Application.name.should.equal('default')
  })

  it('should allow change of name', () => {
    Application.name = 'testname'
    Application.name.should.equal('testname')
  })
})
