import React from 'react'
import styles from './TextInput.module.css'

class TextInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: props.value }
    this.textareaRef = React.createRef()
  }

  componentDidMount () {
    this.resize()
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
    this.resize()
  }

  render () {
    return (
      <textarea
        name='value'
        ref={this.textareaRef}
        value={this.state.value}
        onChange={e => this.handleChange(e)}
        className={styles.TextInput}
        disabled={this.props.disabled}
        rows='1'
      />
    )
  }

  resize () {
    const textarea = this.textareaRef.current
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }
}

export default TextInput
