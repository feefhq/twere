import React from 'react'
import styles from './Palette.module.css'
import TextInput from './TextInput'

class Palette extends React.Component {
  render () {
    return (
      <div className={styles.Palette}>
        <TextInput />
      </div>
    )
  }
}

export default Palette
