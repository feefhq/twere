import React from 'react'
import Narrative from './../narrative/Narrative'
import Palette from './../palette/Palette'
import styles from './MainScreen.module.css'

class MainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      narremes: props.values || [],
      direction: props.direction
    }
  }

  render () {
    return (
      <div className={`${styles.MainScreen} ${styles[this.props.direction] || ''}`}>
        <Palette />
        <Narrative values={this.state.narremes} direction={this.state.direction} />
      </div>

    )
  }
}

export default MainScreen
