import React from 'react'
import ReactDOM from 'react-dom'
import Narrame from './Narreme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Narrame />, div)
  ReactDOM.unmountComponentAtNode(div)
})
