import React from 'react'
import ReactDOM from 'react-dom'
import Palette from './Palette'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Palette />, div)
  ReactDOM.unmountComponentAtNode(div)
})
