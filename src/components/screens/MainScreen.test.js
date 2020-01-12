import React from 'react'
import ReactDOM from 'react-dom'
import MainScreen from './MainScreen'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MainScreen />, div)
  ReactDOM.unmountComponentAtNode(div)
})
