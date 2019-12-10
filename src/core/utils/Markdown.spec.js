/* eslint-disable no-undef */
import { Markdown } from './Markdown.js'

describe('Markdown basic', () => {
  it('should return same vanilla string', () => {
    Markdown.toHTML('vanilla').should.equal('vanilla')
  })

  it('should not barf with an empty string', () => {
    Markdown.toHTML('').should.equal('')
  })

  it('should not barf if string is undefined', () => {
    Markdown.toHTML(undefined).should.equal('')
  })

  it('should trim whitespace', () => {
    Markdown.toHTML('\nStarts here').should.equal('Starts here')
    Markdown.toHTML('\n\nStarts here').should.equal('Starts here')
    Markdown.toHTML('\n\n\nStarts here').should.equal('Starts here')
    Markdown.toHTML('Starts here\n').should.equal('Starts here')
    Markdown.toHTML('Starts here\n\n').should.equal('Starts here')
    Markdown.toHTML('Starts here\n\n\n').should.equal('Starts here')
    Markdown.toHTML('\nStarts here\n').should.equal('Starts here')
    Markdown.toHTML('\n\nStarts here\n\n').should.equal('Starts here')
    Markdown.toHTML('\n\nStarts here\n\nNew para\n\n').should.equal(
      '<p>Starts here</p><p>New para</p>'
    )
  })

  it('should convert **mighty** to <strong/>', () => {
    Markdown.toHTML('**mighty**').should.equal('<strong>mighty</strong>')
  })

  it('should convert double line break to <p></p>', () => {
    Markdown.toHTML('Paragraph 1\n\nPragraph 2').should.equal(
      '<p>Paragraph 1</p><p>Pragraph 2</p>'
    )
  })

  it('should convert double line break to <p></p> multiple times', () => {
    Markdown.toHTML('Paragraph 1\n\nParagraph 2\n\nParagraph 3').should.equal(
      '<p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 3</p>'
    )
  })

  it('should convert single line break to <br>', () => {
    Markdown.toHTML('Line one\nLine two').should.equal('Line one<br>Line two')
  })
})

describe('Markdown code', () => {
  it('should convert code to block', () => {
    Markdown.toHTML('```\nSome code\n```').should.equal('<pre>Some code</pre>')
  })

  it('should retain line breaks in code blocks', () => {
    Markdown.toHTML('```\nSome code\n\nAnother line of code\n```').should.equal(
      '<pre>Some code\n\nAnother line of code</pre>'
    )
  })

  it('should convert `inline code` in middle of a para', () => {
    Markdown.toHTML('A para with `some code` in it').should.equal(
      'A para with <code>some code</code> in it'
    )
  })

  it('should convert `inline code` at start of a para', () => {
    Markdown.toHTML('`some code` at start of a para').should.equal(
      '<code>some code</code> at start of a para'
    )
  })

  it('should convert `inline code` at end of a para', () => {
    Markdown.toHTML('Para has code `at the end`').should.equal(
      'Para has code <code>at the end</code>'
    )
  })

  it('should convert `inline code` twice in a para', () => {
    Markdown.toHTML('Para has code `here` and also `here`').should.equal(
      'Para has code <code>here</code> and also <code>here</code>'
    )
  })

  it('should convert `inline code` across paras', () => {
    Markdown.toHTML(
      'Para has code `here` and also `here`\n\n`And more code` in a second `para` hurrah!'
    ).should.equal(
      '<p>Para has code <code>here</code> and also <code>here</code></p><p><code>And more code</code> in a second <code>para</code> hurrah!</p>'
    )
  })
})

describe('Vanilla URL', () => {
  it('should convert basic vanilla URL', () => {
    Markdown.toHTML('https://test.io').should.equal(
      "<a href='https://test.io' target='_blank' rel='noreferrer'><i class='protocol'>https:</i><i class='host'>test.io</i></a>"
    )
  })
})
