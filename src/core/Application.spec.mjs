/* eslint-disable no-undef */
import { Application } from './Application.mjs'

describe('Application', () => {
  it('should have default appName', function () {
    Application.appName.should.equal('default')
  })

  it('should allow change of appName', function () {
    Application.appName = 'testname'
    Application.appName.should.equal('testname')
  })
})
