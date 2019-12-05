import React from 'react'
import styles from './App.module.css'
import Story from './components/story/Story'

class App extends React.Component {
  render () {
    return (
      <div className={styles.App}>
        <Story />
      </div>
    )
  }
}

export default App
