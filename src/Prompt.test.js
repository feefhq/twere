import React from 'react'
import ReactDOM from 'react-dom'
import Prompt from './Prompt'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Prompt />, div)
  ReactDOM.unmountComponentAtNode(div)
})
