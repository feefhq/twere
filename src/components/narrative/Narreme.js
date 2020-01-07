import React from 'react'
import Palette from '../palette/Palette'
import styles from './Narreme.module.css'

class Narreme extends React.Component {
  render () {
    return (
      <div role='listitem' className={styles.Narreme}>
        <Palette />
      </div>
    )
  }
}

export default Narreme
