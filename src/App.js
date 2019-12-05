import React from 'react'
import styles from './App.module.css'
import Narrative from './components/narrative/Narrative'

class App extends React.Component {
  render () {
    return (
      <div className={styles.App}>
        <Narrative />
      </div>
    )
  }
}

export default App
