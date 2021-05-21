/* eslint-env jest */

import { render } from 'react-dom'
import Clock from './Clock'

describe('<Clock />', () => {
  it('should display current date', () => {
    render(<Clock />)
  })
})
