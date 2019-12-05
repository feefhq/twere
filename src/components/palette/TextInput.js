import React from 'react'
import styles from './TextInput.module.css'

class TextInput extends React.Component {
  handleClick = () => {
    console.log('Clicked:', this)
  }

  render () {
    return (
      <textarea className={styles.textarea} onClick={this.handleClick} rows='1' />
    )
  }
}

export default TextInput
