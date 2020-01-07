import React from 'react'
import styles from './TextInput.module.css'

class TextInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: props.text
    }
  }

  render () {
    return (
      <textarea className={styles.TextInput} disabled={this.props.disabled} rows='1'>{this.state.text}</textarea>
    )
  }
}

export default TextInput
