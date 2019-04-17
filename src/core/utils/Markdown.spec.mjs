/* eslint-disable no-undef */
import { Markdown } from './Markdown.mjs'

describe('Markdown', () => {
  it('should return same vanilla string', () => {
    Markdown.toHTML('vanilla').should.equal('vanilla')
  })

  it('should not barf with an empty string', () => {
    Markdown.toHTML('').should.equal('')
  })

  it('should not barf if string is undefined', () => {
    Markdown.toHTML(undefined).should.equal('')
  })

  it('should convert **mighty** to <strong/>', () => {
    Markdown.toHTML('**mighty**').should.equal('<strong>mighty</strong>')
  })

  it('should convert single line break to <br>', () => {
    Markdown.toHTML('Line one\nLine two').should.equal('Line one<br>\nLine two')
  })
})
