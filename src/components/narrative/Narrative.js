import React from 'react'
import styles from './Narrative.module.css'
import Narreme from './Narreme'

class Narrative extends React.Component {
  render () {
    return (
      <div role='list' className={styles.Narrative}>
        <Narreme />
        <Narreme />
      </div>
    )
  }
}

export default Narrative
