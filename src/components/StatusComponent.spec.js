/* eslint-disable no-undef */
import { Application } from './../core/Application.mjs'
import { StatusComponent } from './StatusComponent.mjs'

describe('StatusComponent', () => {
  beforeEach(() => {
    Application.components = [StatusComponent]
  })
})
