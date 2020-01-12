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

  handleAppend () {
    this.setState(prev => {
      const n = prev.narremes
      n.unshift('I am new!')
      return { narremes: n }
    })
  }

  render () {
    return (
      <div className={`${styles.MainScreen} ${styles[this.props.direction] || ''}`}>
        <Palette onAppend={() => this.handleAppend()} />
        <Narrative narremes={this.state.narremes} direction={this.state.direction} />
      </div>
    )
  }
}

export default MainScreen
