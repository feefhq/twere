/* eslint-env jest */
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Toolbar from './Toolbar'

describe('<Toolbar />', () => {
  it('should render something', () => {
    render(<Toolbar />)
  })
})
