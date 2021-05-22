/* eslint-env jest */
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { formatDate, formatTime } from '../../lib/utils/dateUtil'
import Clock from './Clock'

describe('<Clock />', () => {
  it('should display current date and time', () => {
    const { queryByText } = render(<Clock />)
    const formattedDate = formatDate(Date.now())
    const formattedTime = formatTime(Date.now())
    expect(queryByText(formattedDate)).toBeInTheDocument()
    expect(queryByText(formattedTime)).toBeInTheDocument()
  })

  it('should override default date', () => {
    const nextSecond = Date.now() + 1000
    const { queryByText } = render(<Clock date={nextSecond} />)
    const formattedDate = formatDate(nextSecond)
    expect(queryByText(formattedDate)).toBeInTheDocument()
  })

  it('should hide date', () => {
    const { queryByText } = render(<Clock date={false} />)
    const formattedDate = formatDate(Date.now())
    expect(queryByText(formattedDate)).not.toBeInTheDocument()
  })

  it('should hide time', () => {
    const { queryByText } = render(<Clock time={false} />)
    const formattedTime = formatTime(Date.now())
    expect(queryByText(formattedTime)).not.toBeInTheDocument()
  })

  it('should show/hide date', () => {
    const { getByLabelText, queryByText } = render(<Clock />)
    const formattedDate = formatDate(Date.now())

    userEvent.click(getByLabelText('Date'))
    expect(queryByText(formattedDate)).not.toBeInTheDocument()

    userEvent.click(getByLabelText('Date'))
    expect(queryByText(formattedDate)).toBeInTheDocument()
  })

  it('should show/hide time', () => {
    const { getByLabelText, queryByText } = render(<Clock />)
    const formattedTime = formatTime(Date.now())

    userEvent.click(getByLabelText('Time'))
    expect(queryByText(formattedTime)).not.toBeInTheDocument()

    userEvent.click(getByLabelText('Time'))
    expect(queryByText(formattedTime)).toBeInTheDocument()
  })

  it('should tick', async () => {
    const futureTime = Date.now() + 1000 * 1
    const formattedTime = formatTime(futureTime)
    const formattedDate = formatDate(futureTime)
    const { queryByText } = render(<Clock />)
    await waitFor(
      () => {
        expect(queryByText(formattedTime)).toBeInTheDocument()
        expect(queryByText(formattedDate)).toBeInTheDocument()
      },
      { timeout: 1000 * 1 + 1 }
    )
  })
})
