/* eslint-disable no-undef */
import { Application } from './../core/Application.js'
import { CommandComponent } from './CommandComponent.js'

describe('CommandComponent', () => {
  beforeEach(() => {
    Application.components = [CommandComponent]
  })

  it('should have default context', () => {
    new CommandComponent().context.should.equal('--&gt;')
  })
})
