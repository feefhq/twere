import React from 'react'
import ReactDOM from 'react-dom'
import Narrative from './Narrative'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Narrative />, div)
  ReactDOM.unmountComponentAtNode(div)
})
