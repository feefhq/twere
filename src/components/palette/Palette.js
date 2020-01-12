import React from 'react'
import '../global/Root.module.css'
import styles from './Palette.module.css'
import TextInput from './TextInput'

class Palette extends React.Component {
  handleClick (e) {
    console.log('clicked in comp', this.props)
    this.props.onAppend(e)
  }

  render () {
    return (
      <div className={styles.Palette} onClick={() => this.handleClick()}>
        <TextInput />
      </div>
    )
  }
}

export default Palette
