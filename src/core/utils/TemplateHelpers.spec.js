/* eslint-disable no-undef */
import { then } from './TemplateHelpers.mjs'

describe('Tempalte Helper - then()', () => {
  it('Should execute if true', () => {
    then('truthy', true).should.equal('truthy')
  })

  it('Should not execute if false', () => {
    then('truthy', false).should.equal('')
    then('truthy').should.equal('')
  })

  it('Should not execute if no args', () => {
    then().should.equal('')
  })

  it('Should not execute if expression is undefined', () => {
    then(undefined, true).should.equal('')
    then(undefined, false).should.equal('')
    then(undefined).should.equal('')
  })
})

describe('Tempalte Helper - no()', () => {})
