import React from 'react'
import styles from './Narreme.module.css'

class Narreme extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: props.value }
  }

  render () {
    return (
      <div role='listitem' className={styles.Narreme}>
        {this.props.value}
      </div>
    )
  }
}

export default Narreme
