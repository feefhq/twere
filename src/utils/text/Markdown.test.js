/* eslint-disable no-undef */
import Markdown from './Markdown'

describe('Markdown basic', () => {
  it('should return same vanilla string', () => {
    expect(Markdown.toHTML('vanilla')).toBe('vanilla')
  })

  it('should not barf with an empty string', () => {
    expect(Markdown.toHTML('')).toBe('')
  })

  it('should not barf if string is undefined', () => {
    expect(Markdown.toHTML(undefined)).toBe('')
  })

  it('should trim whitespace', () => {
    expect(Markdown.toHTML('\nStarts here')).toBe('Starts here')
    expect(Markdown.toHTML('\n\nStarts here')).toBe('Starts here')
    expect(Markdown.toHTML('\n\n\nStarts here')).toBe('Starts here')
    expect(Markdown.toHTML('Starts here\n')).toBe('Starts here')
    expect(Markdown.toHTML('Starts here\n\n')).toBe('Starts here')
    expect(Markdown.toHTML('Starts here\n\n\n')).toBe('Starts here')
    expect(Markdown.toHTML('\nStarts here\n')).toBe('Starts here')
    expect(Markdown.toHTML('\n\nStarts here\n\n')).toBe('Starts here')
    expect(Markdown.toHTML('\n\nStarts here\n\nNew para\n\n')).toBe('<p>Starts here</p><p>New para</p>')
  })

  it('should convert to <strong/>', () => {
    expect(Markdown.toHTML('**mighty**')).toBe('<strong>mighty</strong>')
  })

  it('should convert to <em/>', () => {
    expect(Markdown.toHTML('_emphasis')).toBe('<em>mighty</em>')
  })

  it('should convert double line break to <p></p>', () => {
    expect(Markdown.toHTML('Paragraph 1\n\nPragraph 2')).toBe('<p>Paragraph 1</p><p>Pragraph 2</p>')
  })

  it('should convert double line break to <p></p> multiple times', () => {
    expect(Markdown.toHTML('Paragraph 1\n\nParagraph 2\n\nParagraph 3')).toBe('<p>Paragraph 1</p><p>Paragraph 2</p><p>Paragraph 3</p>')
  })

  it('should convert single line break to <br>', () => {
    expect(Markdown.toHTML('Line one\nLine two')).toBe('Line one<br>Line two')
  })
})

describe('Markdown code', () => {
  it('should convert code to block', () => {
    expect(Markdown.toHTML('```\nSome code\n```')).toBe('<pre>Some code</pre>')
  })

  it('should retain line breaks in code blocks', () => {
    expect(Markdown.toHTML('```\nSome code\n\nAnother line of code\n```')).toBe('<pre>Some code\n\nAnother line of code</pre>')
  })

  it('should convert `inline code` in middle of a para', () => {
    expect(Markdown.toHTML('A para with `some code` in it')).toBe('A para with <code>some code</code> in it')
  })

  it('should convert `inline code` at start of a para', () => {
    expect(Markdown.toHTML('`some code` at start of a para')).toBe('<code>some code</code> at start of a para')
  })

  it('should convert `inline code` at end of a para', () => {
    expect(Markdown.toHTML('Para has code `at the end`')).toBe('Para has code <code>at the end</code>')
  })

  it('should convert `inline code` twice in a para', () => {
    expect(Markdown.toHTML('Para has code `here` and also `here`')).toBe('Para has code <code>here</code> and also <code>here</code>')
  })

  it('should convert `inline code` across paras', () => {
    expect(Markdown.toHTML('Para has code `here` and also `here`\n\n`And more code` in a second `para` hurrah!')).toBe('<p>Para has code <code>here</code> and also <code>here</code></p><p><code>And more code</code> in a second <code>para</code> hurrah!</p>')
  })
})

describe('Vanilla URL', () => {
  it('should convert basic vanilla URL', () => {
    // expect(Markdown.toHTML('https://test.io')).toBe("<a href='https://test.io' target='_blank' rel='noreferrer'><i class='protocol'>https:</i><i class='host'>test.io</i></a>")
    expect(Markdown.toHTML('https://test.io')).toBe("<a href='https://test.io' target='_blank' rel='noreferrer'>https://test.io</a>")
  })
})
