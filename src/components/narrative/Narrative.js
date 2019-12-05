import React from 'react'
import styles from './Narrative.module.css'
import Palette from '../palette/Palette'

class Story extends React.Component {
  render () {
    return (
      <ul className={styles.Ledger}>
        <li>I'm a ledger entry</li>
        <li>
          <Palette />
        </li>
      </ul>
    )
  }
}

export default Story
