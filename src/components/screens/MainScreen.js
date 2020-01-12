import React from 'react'
import Narrative from './../narrative/Narrative'
import Palette from './../palette/Palette'

class MainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = { narremes: this.props.values || [] }
  }

  render () {
    return (
      <div>
        <Narrative values={this.state.narremes} />
        <Palette />
      </div>

    )
  }
}

export default MainScreen
