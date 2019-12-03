import React from 'react'
import './App.css'
import Palette from './components/palette/Palette'
import Ledger from './components/ledger/Ledger'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <Palette />
        <Ledger />
      </div>
    )
  }
}

export default App
