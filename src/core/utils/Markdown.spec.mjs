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

  it('should convert double line break to <p></p>', () => {
    Markdown.toHTML('Paragraph 1\n\nPragraph 2').should.equal('<p>Paragraph 1</p><p>Pragraph 2</p>')
  })

  it('should convert double line break to <p></p> multiple times', () => {
    Markdown.toHTML('Paragraph 1\n\nParagraph 2\n\nParagraph 3').should.equal('<p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 3</p>')
  })

  it('should convert single line break to <br>', () => {
    Markdown.toHTML('Line one\nLine two').should.equal('Line one<br>Line two')
  })

  it('should convert code to block', () => {
    Markdown.toHTML('```\nSome code\n```').should.equal('<pre>Some code</pre>')
  })
})
