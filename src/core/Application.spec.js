/* eslint-disable no-undef */
import { Application } from './Application.mjs'

describe('Application', () => {
  it('should have default appName', function () {
    expect(Application.appName).to.equal('default')
  })

  it('should allow change of appName', function () {
    Application.appName = 'testname'
    expect(Application.appName).to.equal('testname')
  })
})
